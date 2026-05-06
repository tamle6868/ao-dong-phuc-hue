import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getServerSupabase } from "@/lib/supabase/server";

import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Đăng nhập",
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: Promise<{ next?: string }>;
}

export default async function AdminLoginPage({ searchParams }: PageProps) {
  const { next } = await searchParams;

  const supabase = await getServerSupabase();
  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      redirect(next?.startsWith("/admin") ? next : "/admin");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-foreground p-6 text-white">
      <div className="w-full max-w-sm">
        <header className="text-center">
          <p className="font-display text-2xl">ÁO ĐỒNG PHỤC HUẾ</p>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/60">
            Admin Console
          </p>
        </header>

        <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur">
          <h1 className="font-display text-xl">Đăng nhập</h1>
          <p className="mt-1 text-xs text-white/60">
            Sử dụng email + mật khẩu Supabase Auth.
          </p>

          <LoginForm next={next ?? "/admin"} />
        </div>

        {!supabase && (
          <p className="mt-4 text-center text-xs text-white/60">
            ⚠️ Supabase chưa được cấu hình — vui lòng set env vars.
          </p>
        )}
      </div>
    </div>
  );
}
