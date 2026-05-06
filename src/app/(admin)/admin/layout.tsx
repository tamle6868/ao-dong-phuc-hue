import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getServerSupabase } from "@/lib/supabase/server";

import { Sidebar } from "./_components/sidebar";

export const metadata: Metadata = {
  title: { default: "Admin Console", template: "%s · Admin" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await getServerSupabase();

  if (!supabase) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-6 text-foreground">
        <div className="max-w-md rounded-xl border border-border bg-card p-6 shadow-sm">
          <h1 className="font-display text-2xl">Admin chưa sẵn sàng</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Supabase chưa được cấu hình. Vui lòng set 3 env vars sau rồi
            redeploy:
          </p>
          <ul className="mt-3 space-y-1 text-xs font-mono">
            <li>NEXT_PUBLIC_SUPABASE_URL</li>
            <li>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</li>
            <li>SUPABASE_SERVICE_ROLE_KEY</li>
          </ul>
        </div>
      </div>
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      <Sidebar userEmail={user.email ?? "admin"} />
      <main className="flex-1 overflow-x-hidden px-8 py-8">{children}</main>
    </div>
  );
}
