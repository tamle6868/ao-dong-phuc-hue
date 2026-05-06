"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getServerSupabase } from "@/lib/supabase/server";

export type AuthFormState =
  | { ok: true; message?: string }
  | { ok: false; error: string }
  | null;

export async function signInWithPassword(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin") || "/admin";

  if (!email || !password) {
    return { ok: false, error: "Vui lòng nhập email và mật khẩu." };
  }

  const supabase = await getServerSupabase();
  if (!supabase) {
    return {
      ok: false,
      error: "Supabase chưa được cấu hình. Vui lòng cấu hình env vars.",
    };
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { ok: false, error: error.message };
  }

  revalidatePath("/admin", "layout");
  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function signOut() {
  const supabase = await getServerSupabase();
  if (supabase) {
    await supabase.auth.signOut();
  }
  revalidatePath("/admin", "layout");
  redirect("/admin/login");
}
