import type { Metadata } from "next";
import { ReceiptText } from "lucide-react";

import { formatPriceVND } from "@/lib/utils";
import { getAdminSupabase } from "@/lib/supabase/admin";

import { EmptyState } from "../_components/empty-state";
import { PageHeader } from "../_components/page-header";

export const metadata: Metadata = { title: "Đơn hàng" };

const STATUS_LABEL: Record<string, string> = {
  pending: "Chờ xác nhận",
  confirmed: "Đã xác nhận",
  in_production: "Đang sản xuất",
  shipping: "Đang giao",
  completed: "Hoàn tất",
  cancelled: "Đã huỷ",
};

export default async function AdminOrdersPage() {
  const supabase = getAdminSupabase();

  const { data: orders, error } = supabase
    ? await supabase
        .from("orders")
        .select("id, code, customer_name, phone, total, status, created_at")
        .order("created_at", { ascending: false })
        .limit(100)
    : { data: null, error: null };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader
        title="Đơn hàng"
        description="100 đơn hàng gần nhất. Bulk action / chỉnh sửa sẽ có ở iteration tiếp theo."
      />

      {error && (
        <p className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          Lỗi tải đơn hàng: {error.message}
        </p>
      )}

      {!orders || orders.length === 0 ? (
        <EmptyState
          icon={ReceiptText}
          title="Chưa có đơn hàng"
          description="Khi khách đặt hàng qua website, đơn sẽ ghi nhận tại đây."
        />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Mã
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Khách
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Tổng
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Trạng thái
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Tạo lúc
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3 font-mono text-xs">{o.code}</td>
                  <td className="px-4 py-3 text-sm">
                    <p className="font-medium">{o.customer_name}</p>
                    <p className="text-xs text-muted-foreground">{o.phone}</p>
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-semibold">
                    {formatPriceVND(o.total)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-block rounded bg-muted px-2 py-0.5 text-xs font-semibold">
                      {STATUS_LABEL[o.status] ?? o.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-xs text-muted-foreground">
                    {new Date(o.created_at).toLocaleString("vi-VN")}
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
