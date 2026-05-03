"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import { getAdminSupabase } from "@/lib/supabase/admin";
import { uploadProductImage } from "@/lib/storage/upload";
import { categorySchema } from "./schemas";

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

async function handleImageInput(
  formData: FormData,
  fallback: string | null,
): Promise<{ url: string | null; error?: string }> {
  const file = formData.get("image_file") as File | null;
  if (file && typeof file === "object" && "size" in file && file.size > 0) {
    const result = await uploadProductImage(file);
    if (!result.ok) return { url: fallback, error: result.error };
    return { url: result.url };
  }
  const explicit = formData.get("image_url");
  if (typeof explicit === "string") {
    const trimmed = explicit.trim();
    if (trimmed.length === 0) return { url: null };
    return { url: trimmed };
  }
  return { url: fallback };
}

export async function createCategory(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const supabase = getAdminSupabase();
  if (!supabase) return { ok: false, error: "Supabase chưa cấu hình." };

  const image = await handleImageInput(formData, null);
  if (image.error) return { ok: false, error: image.error };

  const parsed = categorySchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description") ?? undefined,
    parent_id: (formData.get("parent_id") || null) as string | null,
    sort_order: formData.get("sort_order") ?? 0,
    is_featured: formData.get("is_featured") === "on",
    image_url: image.url ?? undefined,
    seo_title: formData.get("seo_title") ?? undefined,
    seo_desc: formData.get("seo_desc") ?? undefined,
  });

  if (!parsed.success) {
    return {
      ok: false,
      error: "Dữ liệu chưa hợp lệ — vui lòng kiểm tra lại form.",
      fieldErrors: flatten(parsed.error.flatten().fieldErrors),
    };
  }

  const { error } = await supabase.from("categories").insert(parsed.data);
  if (error) {
    if (error.code === "23505") {
      return { ok: false, error: "Slug đã tồn tại — chọn slug khác." };
    }
    return { ok: false, error: error.message };
  }

  revalidateTag("categories", "max");
  revalidatePath("/", "layout");
  redirect("/admin/categories");
}

export async function updateCategory(
  id: string,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const supabase = getAdminSupabase();
  if (!supabase) return { ok: false, error: "Supabase chưa cấu hình." };

  const { data: existing } = await supabase
    .from("categories")
    .select("image_url")
    .eq("id", id)
    .maybeSingle();

  const image = await handleImageInput(formData, existing?.image_url ?? null);
  if (image.error) return { ok: false, error: image.error };

  const parsed = categorySchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description") ?? undefined,
    parent_id: (formData.get("parent_id") || null) as string | null,
    sort_order: formData.get("sort_order") ?? 0,
    is_featured: formData.get("is_featured") === "on",
    image_url: image.url ?? undefined,
    seo_title: formData.get("seo_title") ?? undefined,
    seo_desc: formData.get("seo_desc") ?? undefined,
  });

  if (!parsed.success) {
    return {
      ok: false,
      error: "Dữ liệu chưa hợp lệ — vui lòng kiểm tra lại form.",
      fieldErrors: flatten(parsed.error.flatten().fieldErrors),
    };
  }

  const { error } = await supabase
    .from("categories")
    .update(parsed.data)
    .eq("id", id);

  if (error) {
    if (error.code === "23505") {
      return { ok: false, error: "Slug đã tồn tại — chọn slug khác." };
    }
    return { ok: false, error: error.message };
  }

  revalidateTag("categories", "max");
  revalidatePath("/", "layout");
  redirect("/admin/categories");
}

export async function deleteCategory(formData: FormData): Promise<void> {
  const supabase = getAdminSupabase();
  if (!supabase) return;
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await supabase.from("categories").delete().eq("id", id);
  revalidateTag("categories", "max");
  revalidateTag("products", "max");
  revalidatePath("/admin/categories");
  revalidatePath("/", "layout");
}
