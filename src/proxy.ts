import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

import type { Database } from "@/types/database";

/**
 * Next.js 16 Proxy (formerly Middleware) — refreshes the Supabase Auth session
 * cookie on each request and gates `/admin/*` to authenticated users.
 *
 * The proxy runs at the edge so it must NOT do slow data fetches; the cookie
 * refresh + `getUser()` call is fast (in-memory token validation against the
 * Supabase JWKS). For optimistic redirects only — defense-in-depth happens in
 * the admin layout's server-side `getUser()` call.
 */
export async function proxy(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  // Supabase not configured — let everything through. Public routes still work
  // with mock data, and `/admin/*` will simply 404 (the route doesn't exist
  // until Phase 2 ships fully).
  if (!url || !key) return NextResponse.next();

  let response = NextResponse.next({ request });

  const supabase = createServerClient<Database>(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(toSet) {
        for (const { name, value } of toSet) {
          request.cookies.set(name, value);
        }
        response = NextResponse.next({ request });
        for (const { name, value, options } of toSet) {
          response.cookies.set(name, value, options);
        }
      },
    },
  });

  // Refresh expired access tokens. Required for Server Components.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isAdminRoute = path.startsWith("/admin");
  const isAdminLogin = path === "/admin/login";

  if (isAdminRoute && !isAdminLogin && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    loginUrl.searchParams.set("next", path);
    return NextResponse.redirect(loginUrl);
  }

  if (isAdminLogin && user) {
    const dashUrl = request.nextUrl.clone();
    dashUrl.pathname = "/admin";
    dashUrl.searchParams.delete("next");
    return NextResponse.redirect(dashUrl);
  }

  return response;
}

export const config = {
  // Run on everything except static assets + image optimizer.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
