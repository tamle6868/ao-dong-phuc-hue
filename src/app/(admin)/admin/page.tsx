import type { Metadata } from "next";
import {
  ShoppingBag,
  FolderTree,
  ReceiptText,
  Inbox,
  TrendingUp,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { getAdminSupabase } from "@/lib/supabase/admin";

export const metadata: Metadata = {
  title: "Tổng quan",
};

interface Stat {
  label: string;
  value: string;
  hint?: string;
  icon: React.ComponentType<{ className?: string }>;
}

async function getStats(): Promise<Stat[]> {
  const supabase = getAdminSupabase();
  if (!supabase) {
    return [
      { label: "Sản phẩm", value: "—", icon: ShoppingBag },
      { label: "Danh mục", value: "—", icon: FolderTree },
      { label: "Đơn hàng", value: "—", icon: ReceiptText },
      { label: "Lead báo giá", value: "—", icon: Inbox },
    ];
  }

  const [products, categories, orders, leads, newLeads] = await Promise.all([
    supabase.from("products").select("id", { count: "exact", head: true }),
    supabase.from("categories").select("id", { count: "exact", head: true }),
    supabase.from("orders").select("id", { count: "exact", head: true }),
    supabase.from("leads").select("id", { count: "exact", head: true }),
    supabase
      .from("leads")
      .select("id", { count: "exact", head: true })
      .eq("status", "new"),
  ]);

  return [
    {
      label: "Sản phẩm",
      value: String(products.count ?? 0),
      icon: ShoppingBag,
    },
    {
      label: "Danh mục",
      value: String(categories.count ?? 0),
      icon: FolderTree,
    },
    {
      label: "Đơn hàng",
      value: String(orders.count ?? 0),
      icon: ReceiptText,
    },
    {
      label: "Lead báo giá",
      value: String(leads.count ?? 0),
      hint:
        newLeads.count !== null && newLeads.count > 0
          ? `${newLeads.count} lead mới`
          : undefined,
      icon: Inbox,
    },
  ];
}

export default async function AdminDashboardPage() {
  const stats = await getStats();

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <header>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Admin
        </p>
        <h1 className="mt-1 font-display text-3xl">Tổng quan</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Theo dõi nhanh sản phẩm, đơn hàng và lead báo giá.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, hint, icon: Icon }) => (
          <Card key={label} className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  {label}
                </p>
                <p className="mt-2 font-display text-3xl">{value}</p>
                {hint && (
                  <p className="mt-1 inline-flex items-center gap-1 text-xs text-primary">
                    <TrendingUp className="h-3 w-3" /> {hint}
                  </p>
                )}
              </div>
              <span className="rounded-md bg-muted p-2 text-muted-foreground">
                <Icon className="h-5 w-5" />
              </span>
            </div>
          </Card>
        ))}
      </section>

      <section className="rounded-xl border border-dashed border-border bg-card p-6">
        <h2 className="font-display text-xl">Phase 2 đang xây dựng</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          CMS sẽ được hoàn thiện ở các iteration tiếp theo: bulk upload sản
          phẩm, duyệt đơn hàng, export CSV lead. Hiện tại bạn đã có thể xem
          danh sách đầy đủ ở 4 mục bên trái.
        </p>
      </section>
    </div>
  );
}
