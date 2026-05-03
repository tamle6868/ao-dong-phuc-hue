import type { Metadata } from "next";

import { getAdminSupabase } from "@/lib/supabase/admin";

import { PageHeader } from "../../_components/page-header";
import { CategoryForm } from "../_components/category-form";

export const metadata: Metadata = { title: "Thêm danh mục" };

export default async function NewCategoryPage() {
  const supabase = getAdminSupabase();
  const parents = supabase
    ? ((
        await supabase
          .from("categories")
          .select("id, name")
          .order("name", { ascending: true })
      ).data ?? [])
    : [];

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader
        title="Thêm danh mục"
        description="Tạo danh mục mới cho menu shop."
      />
      <CategoryForm mode="create" parents={parents} />
    </div>
  );
}
