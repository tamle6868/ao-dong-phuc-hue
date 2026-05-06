"use client";

import { useActionState } from "react";

import { signInWithPassword, type AuthFormState } from "@/lib/auth/actions";

const INITIAL: AuthFormState = null;

export function LoginForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState(
    signInWithPassword,
    INITIAL,
  );

  return (
    <form action={formAction} className="mt-5 space-y-4">
      <input type="hidden" name="next" value={next} />

      <div className="space-y-1.5">
        <label
          htmlFor="email"
          className="text-xs uppercase tracking-wider text-white/70"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="block h-11 w-full rounded-md border border-white/15 bg-black/30 px-3 text-sm text-white placeholder:text-white/30 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="password"
          className="text-xs uppercase tracking-wider text-white/70"
        >
          Mật khẩu
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="block h-11 w-full rounded-md border border-white/15 bg-black/30 px-3 text-sm text-white placeholder:text-white/30 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      {state && state.ok === false && (
        <p
          role="alert"
          className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-xs text-destructive"
        >
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="block h-11 w-full rounded-md bg-primary text-sm font-semibold text-primary-foreground shadow-md transition hover:bg-primary-900 disabled:opacity-60"
      >
        {pending ? "Đang đăng nhập…" : "Đăng nhập"}
      </button>
    </form>
  );
}
