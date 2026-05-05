import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "edge";

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

  // TODO: when Supabase is configured, insert into `leads` table here.
  // For phase 1 we log the lead — replace with persistence later.
  console.info("[lead]", {
    ...parsed.data,
    receivedAt: new Date().toISOString(),
    ip: request.headers.get("x-forwarded-for") ?? "unknown",
  });

  return NextResponse.json(
    { ok: true, message: "Đã ghi nhận yêu cầu" },
    { status: 201 },
  );
}
