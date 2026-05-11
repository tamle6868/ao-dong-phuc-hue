import { NextResponse } from "next/server";
import { z } from "zod";

import { getAdminSupabase } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const LeadSchema = z.object({
  fullName: z.string().min(2, "Vui lòng nhập họ tên"),
  phone: z
    .string()
    .regex(/^(0|\+84)[0-9]{9,10}$/, "Số điện thoại không hợp lệ"),
  company: z.string().optional(),
  qty: z.string().optional(),
  message: z.string().optional(),
  source: z.enum([
    "ao-bong-da-thiet-ke",
    "dong-phuc-doanh-nghiep",
    "footer",
    "home",
  ]),
  variant: z.enum(["quote", "mockup3d"]),
});

async function hashIp(ip: string): Promise<string | null> {
  try {
    const data = new TextEncoder().encode(ip);
    const buf = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = LeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const userAgent = request.headers.get("user-agent");
  const referer = request.headers.get("referer");

  const utm: Record<string, string> = {};
  if (referer) {
    try {
      const u = new URL(referer);
      for (const k of [
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_content",
        "utm_term",
      ]) {
        const v = u.searchParams.get(k);
        if (v) utm[k] = v;
      }
    } catch {
      // ignore malformed referer
    }
  }

  const supabase = getAdminSupabase();
  if (supabase) {
    const ipHash = ip ? await hashIp(ip) : null;
    const { error } = await supabase.from("leads").insert({
      full_name: parsed.data.fullName,
      phone: parsed.data.phone,
      company: parsed.data.company ?? null,
      qty: parsed.data.qty ?? null,
      message: parsed.data.message ?? null,
      source: parsed.data.source,
      variant: parsed.data.variant,
      user_agent: userAgent,
      ip_hash: ipHash,
      utm_source: utm.utm_source ?? null,
      utm_medium: utm.utm_medium ?? null,
      utm_campaign: utm.utm_campaign ?? null,
      utm_content: utm.utm_content ?? null,
      utm_term: utm.utm_term ?? null,
    });
    if (error) {
      console.error("[lead] supabase insert failed", {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });
      return NextResponse.json(
        {
          error: "Không lưu được, thử lại sau ít phút.",
          code: error.code ?? null,
          detail: error.message ?? null,
        },
        { status: 500 },
      );
    }
  } else {
    console.error("[lead] supabase admin client is null — env vars missing", {
      hasUrl: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
      hasServiceKey: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    });
    return NextResponse.json(
      { error: "Hệ thống chưa cấu hình, liên hệ admin." },
      { status: 503 },
    );
  }

  return NextResponse.json(
    { ok: true, message: "Đã ghi nhận yêu cầu" },
    { status: 201 },
  );
}
