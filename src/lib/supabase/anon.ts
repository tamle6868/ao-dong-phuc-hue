import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import { getSupabasePublishableKey, getSupabaseUrl } from "./env";

let cached: SupabaseClient<Database> | null = null;

/**
 * Server-side anon client without cookies.
 *
 * Use this in build-time contexts (`generateStaticParams`, `generateMetadata`
 * before any auth logic) where Next.js does not allow `cookies()` and where
 * we still want to honour public RLS policies.
 */
export function getAnonSupabase(): SupabaseClient<Database> | null {
  if (cached) return cached;
  const url = getSupabaseUrl();
  const key = getSupabasePublishableKey();
  if (!url || !key) return null;
  cached = createClient<Database>(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    global: {
      headers: { "x-application": "ao-dong-phuc-hue/anon-server" },
    },
  });
  return cached;
}
