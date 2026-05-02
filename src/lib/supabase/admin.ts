import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/types/database";

import {
  getSupabaseServiceRoleKey,
  getSupabaseUrl,
} from "./env";

/**
 * Admin Supabase client — uses the service role / secret key. **Bypasses RLS**.
 *
 * Lazy-initialized so missing env vars don't crash the app at import time.
 * Call sites must handle `null` (Supabase not configured).
 *
 * Never import this file from a client component or any module that ends up in
 * the browser bundle. `server-only` enforces that at build time.
 */
let cached: SupabaseClient<Database> | null = null;

export function getAdminSupabase(): SupabaseClient<Database> | null {
  if (cached) return cached;
  const url = getSupabaseUrl();
  const key = getSupabaseServiceRoleKey();
  if (!url || !key) return null;
  cached = createClient<Database>(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    global: {
      headers: { "x-application": "ao-dong-phuc-hue/admin" },
    },
  });
  return cached;
}
