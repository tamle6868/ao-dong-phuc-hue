import "server-only";
import { unstable_cache } from "next/cache";
import { getAnonSupabase } from "@/lib/supabase/anon";
import { categories as mockCategories } from "@/data/categories";
import type { Category } from "@/types/product";

const REVALIDATE_SECONDS = 3600;

async function fetchCategoriesFromSupabase(): Promise<Category[] | null> {
  const supabase = getAnonSupabase();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("categories")
    .select("id, slug, name, description, image_url, is_featured, sort_order")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("[categories] supabase fetch failed", error);
    return null;
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description ?? "",
    image: row.image_url ?? "",
    featured: row.is_featured,
  }));
}

export const getCategories = unstable_cache(
  async (): Promise<Category[]> => {
    const live = await fetchCategoriesFromSupabase();
    return live ?? mockCategories;
  },
  ["categories:all"],
  { revalidate: REVALIDATE_SECONDS, tags: ["categories"] },
);

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  const all = await getCategories();
  return all.find((c) => c.slug === slug);
}
