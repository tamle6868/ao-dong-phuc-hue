import "server-only";
import { unstable_cache } from "next/cache";
import { getAnonSupabase } from "@/lib/supabase/anon";
import {
  products as mockProducts,
  getProductBySlug as mockGetProductBySlug,
  getProductsByCategory as mockGetProductsByCategory,
  getFeaturedProducts as mockGetFeaturedProducts,
} from "@/data/products";
import type { Product, ProductVariant } from "@/types/product";

const REVALIDATE_SECONDS = 3600;

type SupabaseProductRow = {
  id: string;
  slug: string;
  name: string;
  short_desc: string | null;
  description: string | null;
  fabric: string | null;
  price: number;
  compare_price: number | null;
  images: unknown;
  rating: number;
  reviews_count: number;
  badges: string[] | null;
  is_featured: boolean;
  is_customizable: boolean;
  min_order: number;
  category: { slug: string } | null;
  variants: Array<{
    size: string;
    color: string;
    color_hex: string | null;
    stock: number;
    sku: string;
  }>;
};

function rowToProduct(row: SupabaseProductRow): Product {
  const images = Array.isArray(row.images)
    ? (row.images as unknown[]).filter((v): v is string => typeof v === "string")
    : [];
  const variants: ProductVariant[] = (row.variants ?? []).map((v) => ({
    size: v.size,
    color: v.color,
    colorHex: v.color_hex ?? "#000000",
    stock: v.stock,
    sku: v.sku,
  }));
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    categorySlug: row.category?.slug ?? "",
    shortDescription: row.short_desc ?? "",
    description: row.description ?? "",
    fabric: row.fabric ?? "",
    price: row.price,
    comparePrice: row.compare_price ?? undefined,
    images,
    variants,
    rating: typeof row.rating === "string" ? Number(row.rating) : row.rating,
    reviewsCount: row.reviews_count,
    badges: row.badges ?? undefined,
    featured: row.is_featured,
    customizable: row.is_customizable,
    minOrder: row.min_order,
  };
}

const PRODUCT_SELECT = `
  id, slug, name, short_desc, description, fabric,
  price, compare_price, images, rating, reviews_count, badges,
  is_featured, is_customizable, min_order,
  category:categories!inner(slug),
  variants:product_variants(size, color, color_hex, stock, sku)
`;

async function fetchAllProductsFromSupabase(): Promise<Product[] | null> {
  const supabase = getAnonSupabase();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[products] supabase fetch failed", error);
    return null;
  }

  return (data ?? []).map((row) => rowToProduct(row as unknown as SupabaseProductRow));
}

export const getAllProducts = unstable_cache(
  async (): Promise<Product[]> => {
    const live = await fetchAllProductsFromSupabase();
    return live ?? mockProducts;
  },
  ["products:all"],
  { revalidate: REVALIDATE_SECONDS, tags: ["products"] },
);

export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  const supabase = getAnonSupabase();
  if (!supabase) return mockGetFeaturedProducts(limit);

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("is_active", true)
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[featured] supabase fetch failed", error);
    return mockGetFeaturedProducts(limit);
  }
  return (data ?? []).map((row) => rowToProduct(row as unknown as SupabaseProductRow));
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const supabase = getAnonSupabase();
  if (!supabase) return mockGetProductBySlug(slug);

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    console.error("[product] supabase fetch failed", error);
    return mockGetProductBySlug(slug);
  }
  if (!data) return undefined;
  return rowToProduct(data as unknown as SupabaseProductRow);
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const supabase = getAnonSupabase();
  if (!supabase) return mockGetProductsByCategory(categorySlug);

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("is_active", true)
    .eq("categories.slug", categorySlug)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[category-products] supabase fetch failed", error);
    return mockGetProductsByCategory(categorySlug);
  }
  return (data ?? []).map((row) => rowToProduct(row as unknown as SupabaseProductRow));
}

/**
 * Used by `generateStaticParams` at build time. Cannot call `cookies()`,
 * so this uses the cookie-less anon client (RLS still applies).
 */
export async function getAllProductSlugs(): Promise<string[]> {
  const supabase = getAnonSupabase();
  if (!supabase) return mockProducts.map((p) => p.slug);

  const { data, error } = await supabase
    .from("products")
    .select("slug")
    .eq("is_active", true);

  if (error) {
    console.error("[slugs] supabase fetch failed", error);
    return mockProducts.map((p) => p.slug);
  }
  return (data ?? []).map((r) => r.slug);
}
