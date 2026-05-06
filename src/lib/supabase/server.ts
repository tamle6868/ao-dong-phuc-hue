import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

import type { Database } from "@/types/database";

import {
  getSupabasePublishableKey,
  getSupabaseUrl,
} from "./env";

/**
 * Server-side Supabase client (RSC, Route Handlers, Server Actions).
 *
 * Uses the publishable / anon key — RLS applies. Cookies are read/written via
 * `next/headers` so Supabase Auth sessions persist across requests.
 *
 * In Next.js 16 `cookies()` returns a Promise and must be awaited.
 */
export async function getServerSupabase() {
  const url = getSupabaseUrl();
  const key = getSupabasePublishableKey();
  if (!url || !key) return null;

  const cookieStore = await cookies();

  return createServerClient<Database>(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(toSet) {
        try {
          for (const { name, value, options } of toSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // `setAll` from a Server Component throws — ignore. Cookies will be
          // refreshed by the proxy on the next request.
        }
      },
    },
  });
}
