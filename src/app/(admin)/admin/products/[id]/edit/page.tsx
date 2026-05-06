import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getAdminSupabase } from "@/lib/supabase/admin";

import { PageHeader } from "../../../_components/page-header";
import { ProductForm } from "../../_components/product-form";

export const metadata: Metadata = { title: "Chỉnh sửa sản phẩm" };

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = getAdminSupabase();
  if (!supabase) notFound();

  const [{ data: product }, { data: categories }] = await Promise.all([
    supabase
      .from("products")
      .select(
        "id, category_id, slug, name, short_desc, description, fabric, price, compare_price, min_order, badges, is_active, is_featured, is_customizable, images, seo_title, seo_desc",
      )
      .eq("id", id)
      .maybeSingle(),
    supabase.from("categories").select("id, name").order("name", { ascending: true }),
  ]);

  if (!product) notFound();

  const images = Array.isArray(product.images)
    ? (product.images as unknown[]).filter((v): v is string => typeof v === "string")
    : [];

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageHeader
        title={`Sửa: ${product.name}`}
        description="Cập nhật sản phẩm. Lưu sẽ revalidate cache."
      />
      <ProductForm
        mode="edit"
        initial={{ ...product, images }}
        categories={categories ?? []}
      />
    </div>
  );
}
