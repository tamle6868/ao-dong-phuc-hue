import Link from "next/link";
import type { Metadata } from "next";
import { getAllProducts, getProductsByCategory } from "@/lib/data/products";
import { getCategories } from "@/lib/data/categories";
import { ProductGrid } from "@/components/product/product-grid";
import { Badge } from "@/components/ui/badge";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

type SearchParamsValue = Record<string, string | string[] | undefined>;
type Props = { searchParams: Promise<SearchParamsValue> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const sp = await searchParams;
  const slug = typeof sp["danh-muc"] === "string" ? sp["danh-muc"] : undefined;
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);
  const title = category ? `${category.name}` : "Tất cả sản phẩm";
  const description = category
    ? `Bộ sưu tập ${category.name.toLowerCase()} chất lượng cao tại Áo Đồng Phục Huế. ${category.description}`
    : "Toàn bộ các dòng áo đồng phục cao cấp: bóng đá, doanh nghiệp, lớp, sự kiện. Vải xịn, in sắc nét, giao toàn quốc.";
  return buildMetadata({
    title,
    description,
    path: slug ? `/san-pham?danh-muc=${slug}` : "/san-pham",
  });
}

export default async function ProductsPage({ searchParams }: Props) {
  const sp = await searchParams;
  const activeSlug = typeof sp["danh-muc"] === "string" ? sp["danh-muc"] : undefined;
  const [list, categories] = await Promise.all([
    activeSlug ? getProductsByCategory(activeSlug) : getAllProducts(),
    getCategories(),
  ]);
  const activeCategory = categories.find((c) => c.slug === activeSlug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-10">
      <header className="space-y-2">
        <Badge variant="soft">Sản phẩm</Badge>
        <h1 className="font-display text-3xl tracking-wide md:text-5xl">
          {activeCategory ? activeCategory.name.toUpperCase() : "TẤT CẢ SẢN PHẨM"}
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
          {activeCategory?.description ??
            "Tất cả các dòng áo đồng phục cao cấp tại Áo Đồng Phục Huế."}
        </p>
      </header>

      {/* Category chips */}
      <nav
        aria-label="Lọc theo danh mục"
        className="no-scrollbar -mx-4 mt-5 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0"
      >
        <Link
          href="/san-pham"
          className={cn(
            "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
            !activeSlug
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border text-foreground hover:bg-muted",
          )}
        >
          Tất cả
        </Link>
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/san-pham?danh-muc=${c.slug}`}
            className={cn(
              "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
              activeSlug === c.slug
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-foreground hover:bg-muted",
            )}
          >
            {c.name}
          </Link>
        ))}
      </nav>

      <div className="mt-6">
        {list.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            Chưa có sản phẩm trong danh mục này. Liên hệ để được đặt thiết kế riêng.
          </p>
        ) : (
          <ProductGrid products={list} />
        )}
      </div>
    </div>
  );
}
