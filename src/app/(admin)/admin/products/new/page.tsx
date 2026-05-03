import type { Metadata } from "next";

import { getAdminSupabase } from "@/lib/supabase/admin";

import { PageHeader } from "../../_components/page-header";
import { ProductForm } from "../_components/product-form";

export const metadata: Metadata = { title: "Thêm sản phẩm" };

export default async function NewProductPage() {
  const supabase = getAdminSupabase();
  const categories = supabase
    ? ((
        await supabase
          .from("categories")
          .select("id, name")
          .order("name", { ascending: true })
      ).data ?? [])
    : [];

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageHeader
        title="Thêm sản phẩm"
        description="Upload ảnh, đặt giá, gắn danh mục. Tự động revalidate cache khi lưu."
      />
      <ProductForm mode="create" categories={categories} />
    </div>
  );
}
