import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getAdminSupabase } from "@/lib/supabase/admin";

import { PageHeader } from "../../../_components/page-header";
import { CategoryForm } from "../../_components/category-form";

export const metadata: Metadata = { title: "Chỉnh sửa danh mục" };

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = getAdminSupabase();
  if (!supabase) notFound();

  const [{ data: category }, { data: parents }] = await Promise.all([
    supabase
      .from("categories")
      .select(
        "id, name, slug, description, parent_id, sort_order, is_featured, image_url, seo_title, seo_desc",
      )
      .eq("id", id)
      .maybeSingle(),
    supabase.from("categories").select("id, name").order("name", { ascending: true }),
  ]);

  if (!category) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader
        title={`Sửa: ${category.name}`}
        description="Cập nhật thông tin danh mục. Lưu sẽ revalidate cache trang chủ."
      />
      <CategoryForm
        mode="edit"
        initial={category}
        parents={parents ?? []}
      />
    </div>
  );
}
