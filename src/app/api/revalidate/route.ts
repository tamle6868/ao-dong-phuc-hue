import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const KNOWN_TAGS = new Set(["products", "categories", "all"]);

/**
 * POST /api/revalidate
 *
 * Authentication: shared secret via `Authorization: Bearer <REVALIDATE_SECRET>`
 * (or `?secret=...` for Supabase database webhooks that can't set headers).
 *
 * Body (optional JSON):
 *   { "tags": ["products"], "paths": ["/san-pham/foo"] }
 *
 * If neither tags nor paths are provided, defaults to revalidating both
 * `products` and `categories` tags + the root layout.
 */
export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "REVALIDATE_SECRET not configured" },
      { status: 503 },
    );
  }

  const url = new URL(req.url);
  const provided =
    req.headers.get("authorization")?.replace(/^Bearer\s+/i, "").trim() ||
    url.searchParams.get("secret") ||
    "";

  if (provided !== secret) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let body: { tags?: unknown; paths?: unknown } = {};
  try {
    if (req.headers.get("content-type")?.includes("application/json")) {
      body = await req.json();
    }
  } catch {
    /* fall through with empty body */
  }

  const requestedTags = Array.isArray(body.tags)
    ? body.tags.filter((t): t is string => typeof t === "string")
    : [];
  const requestedPaths = Array.isArray(body.paths)
    ? body.paths.filter((p): p is string => typeof p === "string")
    : [];

  const tags =
    requestedTags.length > 0
      ? requestedTags.filter((t) => KNOWN_TAGS.has(t))
      : ["products", "categories"];

  const paths = requestedPaths.length > 0 ? requestedPaths : ["/"];

  for (const tag of tags) {
    if (tag === "all") {
      revalidateTag("products", "max");
      revalidateTag("categories", "max");
    } else {
      revalidateTag(tag, "max");
    }
  }
  for (const p of paths) {
    revalidatePath(p, p === "/" ? "layout" : "page");
  }

  return NextResponse.json({
    ok: true,
    revalidated: { tags, paths },
    at: new Date().toISOString(),
  });
}

export async function GET() {
  return NextResponse.json({ ok: true, info: "POST with bearer to revalidate" });
}
