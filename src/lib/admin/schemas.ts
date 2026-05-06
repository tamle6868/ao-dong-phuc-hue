import { z } from "zod";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const slugSchema = z
  .string()
  .trim()
  .min(2, "Slug phải có ít nhất 2 ký tự.")
  .max(80, "Slug tối đa 80 ký tự.")
  .regex(slugRegex, "Slug chỉ chứa chữ thường, số và dấu '-'.");

export const categorySchema = z.object({
  name: z.string().trim().min(2, "Tên tối thiểu 2 ký tự.").max(120),
  slug: slugSchema,
  description: z
    .string()
    .trim()
    .max(500, "Mô tả tối đa 500 ký tự.")
    .optional()
    .transform((v) => (v && v.length > 0 ? v : null)),
  parent_id: z
    .string()
    .uuid()
    .optional()
    .nullable()
    .transform((v) => (v === undefined ? null : v)),
  sort_order: z.coerce.number().int().min(0).max(9999).default(0),
  is_featured: z.coerce.boolean().default(false),
  image_url: z
    .string()
    .url()
    .max(500)
    .optional()
    .nullable()
    .transform((v) => (v === undefined ? null : v)),
  seo_title: z
    .string()
    .trim()
    .max(120)
    .optional()
    .transform((v) => (v && v.length > 0 ? v : null)),
  seo_desc: z
    .string()
    .trim()
    .max(300)
    .optional()
    .transform((v) => (v && v.length > 0 ? v : null)),
});

export type CategoryInput = z.infer<typeof categorySchema>;

export const productSchema = z.object({
  category_id: z.string().uuid("Chọn danh mục hợp lệ."),
  slug: slugSchema,
  name: z.string().trim().min(2, "Tên SP tối thiểu 2 ký tự.").max(160),
  short_desc: z
    .string()
    .trim()
    .max(280)
    .optional()
    .transform((v) => (v && v.length > 0 ? v : null)),
  description: z
    .string()
    .trim()
    .max(5000)
    .optional()
    .transform((v) => (v && v.length > 0 ? v : null)),
  fabric: z
    .string()
    .trim()
    .max(160)
    .optional()
    .transform((v) => (v && v.length > 0 ? v : null)),
  price: z.coerce
    .number({ message: "Giá phải là số." })
    .int("Giá là số nguyên (VND)")
    .min(0, "Giá không âm.")
    .max(1_000_000_000),
  compare_price: z
    .preprocess(
      (v) => (v === "" || v === null || v === undefined ? null : v),
      z.coerce.number().int().min(0).max(1_000_000_000).nullable(),
    )
    .default(null),
  min_order: z.coerce.number().int().min(1).max(9999).default(1),
  badges: z
    .string()
    .trim()
    .max(500)
    .optional()
    .transform((s) =>
      (s ?? "")
        .split(/[,;\n]+/)
        .map((b) => b.trim())
        .filter((b) => b.length > 0)
        .slice(0, 8),
    ),
  is_active: z.coerce.boolean().default(true),
  is_featured: z.coerce.boolean().default(false),
  is_customizable: z.coerce.boolean().default(false),
  seo_title: z
    .string()
    .trim()
    .max(120)
    .optional()
    .transform((v) => (v && v.length > 0 ? v : null)),
  seo_desc: z
    .string()
    .trim()
    .max(300)
    .optional()
    .transform((v) => (v && v.length > 0 ? v : null)),
});

export type ProductInput = z.infer<typeof productSchema>;
