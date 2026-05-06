import type { Metadata } from "next";
import { Inbox } from "lucide-react";

import { getAdminSupabase } from "@/lib/supabase/admin";

import { EmptyState } from "../_components/empty-state";
import { PageHeader } from "../_components/page-header";

export const metadata: Metadata = { title: "Lead báo giá" };

const STATUS_LABEL: Record<string, string> = {
  new: "Mới",
  contacted: "Đã liên hệ",
  won: "Chốt",
  lost: "Mất",
};

const VARIANT_LABEL: Record<string, string> = {
  quote: "Báo giá",
  mockup3d: "Mẫu 3D",
};

export default async function AdminLeadsPage() {
  const supabase = getAdminSupabase();

  const { data: leads, error } = supabase
    ? await supabase
        .from("leads")
        .select(
          "id, full_name, phone, source, variant, status, qty, created_at",
        )
        .order("created_at", { ascending: false })
        .limit(100)
    : { data: null, error: null };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader
        title="Lead báo giá"
        description="100 lead gần nhất từ landing pages, footer và form trang chủ."
      />

      {error && (
        <p className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          Lỗi tải lead: {error.message}
        </p>
      )}

      {!leads || leads.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title="Chưa có lead nào"
          description="Lead từ form landing pages sẽ tự động ghi nhận tại đây sau khi Supabase được cấu hình."
        />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Khách
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  SĐT
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Nguồn
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Loại
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  SL
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
              {leads.map((l) => (
                <tr key={l.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3 text-sm font-medium">
                    {l.full_name}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">{l.phone}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {l.source}
                  </td>
                  <td className="px-4 py-3 text-xs">
                    {VARIANT_LABEL[l.variant] ?? l.variant}
                  </td>
                  <td className="px-4 py-3 text-right text-xs">
                    {l.qty ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={
                        l.status === "new"
                          ? "inline-block rounded bg-amber-500/10 px-2 py-0.5 text-xs font-semibold text-amber-700"
                          : l.status === "won"
                            ? "inline-block rounded bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-700"
                            : "inline-block rounded bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground"
                      }
                    >
                      {STATUS_LABEL[l.status] ?? l.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-xs text-muted-foreground">
                    {new Date(l.created_at).toLocaleString("vi-VN")}
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
