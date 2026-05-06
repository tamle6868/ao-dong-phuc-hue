import type { Metadata } from "next";
import Link from "next/link";
import { Plus, ShoppingBag } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn, formatPriceVND } from "@/lib/utils";
import { getAdminSupabase } from "@/lib/supabase/admin";
import {
  deleteProduct,
  toggleProductActive,
} from "@/lib/admin/products.actions";

import { EmptyState } from "../_components/empty-state";
import { PageHeader } from "../_components/page-header";

export const metadata: Metadata = { title: "Sản phẩm" };

export default async function AdminProductsPage() {
  const supabase = getAdminSupabase();

  const { data: products, error } = supabase
    ? await supabase
        .from("products")
        .select("id, slug, name, price, compare_price, is_active, is_featured")
        .order("created_at", { ascending: false })
    : { data: null, error: null };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader
        title="Sản phẩm"
        description="Quản lý toàn bộ sản phẩm. Thêm / sửa / ẩn / xoá."
        actions={
          supabase ? (
            <Link
              href="/admin/products/new"
              className={cn(buttonVariants({ variant: "primary", size: "md" }))}
            >
              <Plus className="h-4 w-4" />
              Thêm sản phẩm
            </Link>
          ) : null
        }
      />

      {error && (
        <p className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          Lỗi tải sản phẩm: {error.message}
        </p>
      )}

      {!products || products.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="Chưa có sản phẩm nào"
          description="Click 'Thêm sản phẩm' để tạo sản phẩm đầu tiên."
        />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Tên
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Slug
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Giá
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Trạng thái
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3 text-sm">
                    <p className="font-medium">{p.name}</p>
                    {p.is_featured && (
                      <span className="mt-1 inline-block rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                        Featured
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {p.slug}
                  </td>
                  <td className="px-4 py-3 text-right text-sm">
                    <p className="font-semibold">{formatPriceVND(p.price)}</p>
                    {p.compare_price && (
                      <p className="text-xs text-muted-foreground line-through">
                        {formatPriceVND(p.compare_price)}
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={
                        p.is_active
                          ? "inline-block rounded bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600"
                          : "inline-block rounded bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground"
                      }
                    >
                      {p.is_active ? "Đang bán" : "Ẩn"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${p.id}/edit`}
                        className="rounded-md border border-border px-2.5 py-1 text-xs font-medium hover:bg-muted"
                      >
                        Sửa
                      </Link>
                      <form action={toggleProductActive}>
                        <input type="hidden" name="id" value={p.id} />
                        <input
                          type="hidden"
                          name="next"
                          value={p.is_active ? "false" : "true"}
                        />
                        <button
                          type="submit"
                          className="rounded-md border border-border px-2.5 py-1 text-xs font-medium hover:bg-muted"
                        >
                          {p.is_active ? "Ẩn" : "Hiện"}
                        </button>
                      </form>
                      <form action={deleteProduct}>
                        <input type="hidden" name="id" value={p.id} />
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
