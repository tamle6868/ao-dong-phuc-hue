import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import type { Product } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import { formatPriceVND, cn } from "@/lib/utils";

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  return (
    <Link
      href={`/san-pham/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-background shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-pop)] tap-shrink"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority={priority}
        />
        {discount > 0 && (
          <Badge variant="primary" className="absolute left-2 top-2">
            -{discount}%
          </Badge>
        )}
        {product.badges?.[0] && (
          <Badge variant="accent" className="absolute right-2 top-2">
            {product.badges[0]}
          </Badge>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3.5">
        <h3 className="line-clamp-2 text-sm font-semibold leading-tight text-foreground">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-warning text-warning" />
          <span className="font-medium text-foreground">{product.rating}</span>
          <span>({product.reviewsCount})</span>
        </div>
        <div className="mt-auto flex items-baseline gap-2">
          <span className="text-base font-bold text-primary">
            {formatPriceVND(product.price)}
          </span>
          {product.comparePrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPriceVND(product.comparePrice)}
            </span>
          )}
        </div>
        {product.minOrder && (
          <p className={cn("text-[11px] text-muted-foreground")}>
            MOQ: {product.minOrder} áo · {product.fabric}
          </p>
        )}
      </div>
    </Link>
  );
}
