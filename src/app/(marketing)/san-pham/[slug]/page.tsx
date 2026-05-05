import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChevronRight, Star, Truck, ShieldCheck, Award } from "lucide-react";
import { getProductBySlug, products } from "@/data/products";
import { categories } from "@/data/categories";
import { ProductGallery } from "@/components/product/product-gallery";
import { AddToCartBar } from "@/components/product/add-to-cart-bar";
import { ProductGrid } from "@/components/product/product-grid";
import { Badge } from "@/components/ui/badge";
import { ProductSchema } from "@/components/seo/product-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { buildMetadata } from "@/lib/seo";
import { formatPriceVND } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return buildMetadata({ title: "Không tìm thấy", noIndex: true });
  return buildMetadata({
    title: product.name,
    description: product.shortDescription,
    path: `/san-pham/${product.slug}`,
    image: product.images[0],
  });
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = categories.find((c) => c.slug === product.categorySlug);
  const related = products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  const breadcrumbs = [
    { name: "Trang chủ", href: "/" },
    { name: "Sản phẩm", href: "/san-pham" },
    ...(category
      ? [{ name: category.name, href: `/san-pham?danh-muc=${category.slug}` }]
      : []),
    { name: product.name, href: `/san-pham/${product.slug}` },
  ];

  return (
    <>
      <ProductSchema product={product} />
      <BreadcrumbSchema items={breadcrumbs} />

      <div className="mx-auto max-w-7xl px-4 py-4 md:px-6 md:py-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="no-scrollbar flex items-center gap-1 overflow-x-auto whitespace-nowrap text-xs text-muted-foreground"
        >
          {breadcrumbs.map((b, i) => (
            <span key={b.href} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="h-3 w-3" />}
              {i < breadcrumbs.length - 1 ? (
                <Link href={b.href} className="hover:text-foreground">
                  {b.name}
                </Link>
              ) : (
                <span className="font-medium text-foreground">{b.name}</span>
              )}
            </span>
          ))}
        </nav>

        <div
          key={product.id}
          className="mt-4 grid gap-6 md:grid-cols-2 md:gap-10"
        >
          {/* GALLERY */}
          <ProductGallery images={product.images} alt={product.name} />

          {/* DETAILS */}
          <div className="space-y-4 pb-32 md:pb-0">
            <div className="space-y-2">
              {product.badges?.map((b) => (
                <Badge key={b} variant="primary">
                  {b}
                </Badge>
              ))}
              <h1 className="font-display text-2xl tracking-wide md:text-4xl">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1 text-warning">
                  <Star className="h-4 w-4 fill-warning" />
                  <span className="font-semibold text-foreground">
                    {product.rating}
                  </span>
                </div>
                <span className="text-muted-foreground">
                  ({product.reviewsCount} đánh giá) · Đã bán {product.reviewsCount * 3}+
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-muted/40 p-4">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-3xl text-primary md:text-4xl">
                  {formatPriceVND(product.price)}
                </span>
                {product.comparePrice && (
                  <>
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPriceVND(product.comparePrice)}
                    </span>
                    <Badge variant="primary">
                      -{Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}%
                    </Badge>
                  </>
                )}
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">
                Giá đã gồm in tên + số áo. {product.minOrder ? `MOQ ${product.minOrder} áo / đội.` : ""}
              </p>
            </div>

            <p className="text-sm leading-relaxed text-foreground/85">
              {product.shortDescription}
            </p>

            <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
              <div className="rounded-md border border-border bg-background p-2.5">
                <Truck className="mx-auto h-4 w-4 text-primary" />
                <p className="mt-1 font-semibold">Giao 3-5 ngày</p>
              </div>
              <div className="rounded-md border border-border bg-background p-2.5">
                <ShieldCheck className="mx-auto h-4 w-4 text-primary" />
                <p className="mt-1 font-semibold">Bảo hành 12T</p>
              </div>
              <div className="rounded-md border border-border bg-background p-2.5">
                <Award className="mx-auto h-4 w-4 text-primary" />
                <p className="mt-1 font-semibold">Vải xuất khẩu</p>
              </div>
            </div>

            <AddToCartBar product={product} />
          </div>
        </div>

        {/* FABRIC + DESCRIPTION */}
        <section className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-background p-5 shadow-[var(--shadow-soft)]">
            <h2 className="text-base font-bold">Chất vải</h2>
            <p className="mt-2 text-sm text-muted-foreground">{product.fabric}</p>
          </div>
          <div className="rounded-xl border border-border bg-background p-5 shadow-[var(--shadow-soft)]">
            <h2 className="text-base font-bold">Mô tả chi tiết</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>
          </div>
        </section>

        {/* RELATED */}
        {related.length > 0 && (
          <section className="mt-12">
            <header className="mb-5 flex items-end justify-between gap-3">
              <h2 className="font-display text-xl tracking-wide md:text-2xl">
                CÓ THỂ BẠN QUAN TÂM
              </h2>
              <Link
                href={`/san-pham?danh-muc=${product.categorySlug}`}
                className="text-sm font-semibold text-primary hover:underline"
              >
                Xem thêm
              </Link>
            </header>
            <ProductGrid products={related} priorityCount={0} />
          </section>
        )}
      </div>
    </>
  );
}
