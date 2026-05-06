/**
 * Centralized Supabase env-var access.
 *
 * Every getter returns `null` when the corresponding env var is missing or
 * empty so callers can gracefully degrade — the rest of the app works on mock
 * data when Supabase is not configured.
 */

function trim(value: string | undefined): string | null {
  if (!value) return null;
  const t = value.trim();
  return t.length > 0 ? t : null;
}

export function getSupabaseUrl(): string | null {
  return trim(process.env.NEXT_PUBLIC_SUPABASE_URL);
}

export function getSupabasePublishableKey(): string | null {
  // Support both new naming (NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)
  // and legacy naming (NEXT_PUBLIC_SUPABASE_ANON_KEY) — Supabase shipped the
  // rename in 2025 but lots of docs/guides still use the old name.
  return (
    trim(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) ??
    trim(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  );
}

export function getSupabaseServiceRoleKey(): string | null {
  return trim(process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function isSupabaseConfigured(): boolean {
  return getSupabaseUrl() !== null && getSupabasePublishableKey() !== null;
}
