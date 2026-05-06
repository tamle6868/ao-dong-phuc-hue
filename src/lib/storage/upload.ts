import "server-only";

import { randomUUID } from "node:crypto";

import { getAdminSupabase } from "@/lib/supabase/admin";

const BUCKET = "product-images";
const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);

export type UploadResult =
  | { ok: true; url: string; path: string }
  | { ok: false; error: string };

/**
 * Upload a single image to the `product-images` Supabase bucket.
 * Returns a public URL. Caller is responsible for persisting the URL on
 * the related row (e.g. `products.images`).
 */
export async function uploadProductImage(file: File): Promise<UploadResult> {
  if (file.size === 0) {
    return { ok: false, error: "File rỗng — vui lòng chọn ảnh hợp lệ." };
  }
  if (file.size > MAX_BYTES) {
    return { ok: false, error: "Ảnh vượt quá 5MB. Hãy nén / resize lại." };
  }
  if (!ALLOWED_MIME.has(file.type)) {
    return {
      ok: false,
      error: `MIME ${file.type || "không xác định"} không hỗ trợ. Dùng JPEG / PNG / WebP / AVIF.`,
    };
  }

  const supabase = getAdminSupabase();
  if (!supabase) {
    return {
      ok: false,
      error: "Supabase service-role key chưa cấu hình — không thể upload.",
    };
  }

  const ext = (file.name.split(".").pop() ?? "jpg").toLowerCase().slice(0, 8);
  const path = `${new Date().getUTCFullYear()}/${randomUUID()}.${ext}`;

  const arrayBuffer = await file.arrayBuffer();
  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(path, arrayBuffer, {
      contentType: file.type,
      cacheControl: "31536000, immutable",
      upsert: false,
    });

  if (uploadError) {
    return { ok: false, error: `Upload failed: ${uploadError.message}` };
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { ok: true, url: data.publicUrl, path };
}

/**
 * Best-effort delete of an uploaded image (used when admin removes a row).
 * Silent on missing keys.
 */
export async function deleteProductImage(url: string): Promise<void> {
  const supabase = getAdminSupabase();
  if (!supabase) return;
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return; // not a Supabase-hosted image (e.g. Unsplash mock)
  const path = url.slice(idx + marker.length);
  await supabase.storage.from(BUCKET).remove([path]);
}
