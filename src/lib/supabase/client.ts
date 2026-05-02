"use client";

import { createBrowserClient } from "@supabase/ssr";

import type { Database } from "@/types/database";

import {
  getSupabasePublishableKey,
  getSupabaseUrl,
} from "./env";

/**
 * Browser-side Supabase client. Uses the publishable / anon key — RLS applies.
 *
 * Returns `null` when env vars are not configured so callers can degrade
 * gracefully (e.g. fall back to mock data).
 */
export function getBrowserSupabase() {
  const url = getSupabaseUrl();
  const key = getSupabasePublishableKey();
  if (!url || !key) return null;
  return createBrowserClient<Database>(url, key);
}
