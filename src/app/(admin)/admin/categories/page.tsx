import type { Metadata } from "next";
import Link from "next/link";
import { FolderTree, Plus } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getAdminSupabase } from "@/lib/supabase/admin";
import { deleteCategory } from "@/lib/admin/categories.actions";

import { EmptyState } from "../_components/empty-state";
import { PageHeader } from "../_components/page-header";

export const metadata: Metadata = { title: "Danh mục" };

export default async function AdminCategoriesPage() {
  const supabase = getAdminSupabase();

  const { data: categories, error } = supabase
    ? await supabase
        .from("categories")
        .select("id, slug, name, is_featured, sort_order")
        .order("sort_order", { ascending: true })
    : { data: null, error: null };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageHeader
        title="Danh mục"
        description="Cấu trúc danh mục sản phẩm cho menu shop."
        actions={
          supabase ? (
            <Link
              href="/admin/categories/new"
              className={cn(buttonVariants({ variant: "primary", size: "md" }))}
            >
              <Plus className="h-4 w-4" />
              Thêm danh mục
            </Link>
          ) : null
        }
      />

      {error && (
        <p className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          Lỗi tải danh mục: {error.message}
        </p>
      )}

      {!categories || categories.length === 0 ? (
        <EmptyState
          icon={FolderTree}
          title="Chưa có danh mục nào"
          description="Click 'Thêm danh mục' để bắt đầu."
        />
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Tên
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Slug
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Featured
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Sort
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {categories.map((c) => (
                <tr key={c.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3 text-sm font-medium">{c.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {c.slug}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {c.is_featured ? "★" : "—"}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-xs">
                    {c.sort_order}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/categories/${c.id}/edit`}
                        className="rounded-md border border-border px-2.5 py-1 text-xs font-medium hover:bg-muted"
                      >
                        Sửa
                      </Link>
                      <form action={deleteCategory}>
                        <input type="hidden" name="id" value={c.id} />
                        <button
                          type="submit"
                          className="rounded-md border border-destructive/40 px-2.5 py-1 text-xs font-medium text-destructive hover:bg-destructive/10"
                        >
                          Xoá
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
