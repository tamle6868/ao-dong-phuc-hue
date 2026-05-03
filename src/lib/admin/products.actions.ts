"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import { getAdminSupabase } from "@/lib/supabase/admin";
import { deleteProductImage, uploadProductImage } from "@/lib/storage/upload";
import { productSchema } from "./schemas";

export type ActionState =
  | { ok: true; message?: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> }
  | null;

function flatten(zodErrors: Record<string, string[] | undefined>) {
  const out: Record<string, string[]> = {};
  for (const [k, v] of Object.entries(zodErrors)) {
    if (v && v.length) out[k] = v;
  }
  return out;
}

function existingImagesFromForm(formData: FormData): string[] {
  return formData
    .getAll("existing_images")
    .map((v) => String(v).trim())
    .filter((v) => v.length > 0);
}

async function uploadAllNewImages(
  formData: FormData,
): Promise<{ urls: string[]; error?: string }> {
  const files = formData
    .getAll("image_files")
    .filter(
      (v): v is File =>
        typeof v === "object" && v !== null && "size" in (v as object) && (v as File).size > 0,
    );
  if (files.length === 0) return { urls: [] };

  const urls: string[] = [];
  for (const f of files) {
    const result = await uploadProductImage(f);
    if (!result.ok) return { urls, error: result.error };
    urls.push(result.url);
  }
  return { urls };
}

function parseProduct(formData: FormData) {
  return productSchema.safeParse({
    category_id: formData.get("category_id"),
    slug: formData.get("slug"),
    name: formData.get("name"),
    short_desc: formData.get("short_desc") ?? undefined,
    description: formData.get("description") ?? undefined,
    fabric: formData.get("fabric") ?? undefined,
    price: formData.get("price"),
    compare_price: formData.get("compare_price"),
    min_order: formData.get("min_order") ?? 1,
    badges: formData.get("badges") ?? "",
    is_active: formData.get("is_active") === "on",
    is_featured: formData.get("is_featured") === "on",
    is_customizable: formData.get("is_customizable") === "on",
    seo_title: formData.get("seo_title") ?? undefined,
    seo_desc: formData.get("seo_desc") ?? undefined,
  });
}

export async function createProduct(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const supabase = getAdminSupabase();
  if (!supabase) return { ok: false, error: "Supabase chưa cấu hình." };

  const upload = await uploadAllNewImages(formData);
  if (upload.error) return { ok: false, error: upload.error };

  const images = [...existingImagesFromForm(formData), ...upload.urls];
  if (images.length === 0) {
    return {
      ok: false,
      error: "Sản phẩm phải có ít nhất 1 ảnh — upload hoặc paste URL.",
    };
  }

  const parsed = parseProduct(formData);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Dữ liệu chưa hợp lệ — kiểm tra các trường gạch đỏ.",
      fieldErrors: flatten(parsed.error.flatten().fieldErrors),
    };
  }

  const { error } = await supabase.from("products").insert({
    ...parsed.data,
    images,
  });

  if (error) {
    if (error.code === "23505") {
      return { ok: false, error: "Slug đã tồn tại — chọn slug khác." };
    }
    return { ok: false, error: error.message };
  }

  revalidateTag("products", "max");
  revalidatePath("/", "layout");
  redirect("/admin/products");
}

export async function updateProduct(
  id: string,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const supabase = getAdminSupabase();
  if (!supabase) return { ok: false, error: "Supabase chưa cấu hình." };

  const { data: existing } = await supabase
    .from("products")
    .select("images")
    .eq("id", id)
    .maybeSingle();

  const upload = await uploadAllNewImages(formData);
  if (upload.error) return { ok: false, error: upload.error };

  const keptImages = existingImagesFromForm(formData);
  const images = [...keptImages, ...upload.urls];
  if (images.length === 0) {
    return {
      ok: false,
      error: "Sản phẩm phải có ít nhất 1 ảnh.",
    };
  }

  const parsed = parseProduct(formData);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Dữ liệu chưa hợp lệ — kiểm tra các trường gạch đỏ.",
      fieldErrors: flatten(parsed.error.flatten().fieldErrors),
    };
  }

  const { error } = await supabase
    .from("products")
    .update({ ...parsed.data, images })
    .eq("id", id);

  if (error) {
    if (error.code === "23505") {
      return { ok: false, error: "Slug đã tồn tại — chọn slug khác." };
    }
    return { ok: false, error: error.message };
  }

  // Best-effort cleanup of orphaned uploaded images.
  const previousImages = Array.isArray(existing?.images)
    ? (existing.images as unknown[]).filter(
        (v): v is string => typeof v === "string",
      )
    : [];
  const removed = previousImages.filter((u) => !images.includes(u));
  for (const url of removed) await deleteProductImage(url);

  revalidateTag("products", "max");
  revalidatePath("/", "layout");
  redirect("/admin/products");
}

export async function toggleProductActive(formData: FormData): Promise<void> {
  const supabase = getAdminSupabase();
  if (!supabase) return;
  const id = String(formData.get("id") ?? "");
  const next = formData.get("next") === "true";
  if (!id) return;
  await supabase.from("products").update({ is_active: next }).eq("id", id);
  revalidateTag("products", "max");
  revalidatePath("/admin/products");
  revalidatePath("/", "layout");
}

export async function deleteProduct(formData: FormData): Promise<void> {
  const supabase = getAdminSupabase();
  if (!supabase) return;
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const { data: existing } = await supabase
    .from("products")
    .select("images")
    .eq("id", id)
    .maybeSingle();

  await supabase.from("products").delete().eq("id", id);

  const previousImages = Array.isArray(existing?.images)
    ? (existing.images as unknown[]).filter(
        (v): v is string => typeof v === "string",
      )
    : [];
  for (const url of previousImages) await deleteProductImage(url);

  revalidateTag("products", "max");
  revalidatePath("/admin/products");
  revalidatePath("/", "layout");
}
