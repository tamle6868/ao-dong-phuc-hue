import type { Metadata } from "next";
import { ShoppingBag } from "lucide-react";

import { formatPriceVND } from "@/lib/utils";
import { getAdminSupabase } from "@/lib/supabase/admin";

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
        description="Toàn bộ sản phẩm trong shop. Click để chỉnh sửa (sắp ra mắt)."
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
          description="Apply Supabase migrations + seed dữ liệu để hiển thị tại đây. CMS thêm/sửa sản phẩm sẽ có ở iteration tiếp theo."
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
