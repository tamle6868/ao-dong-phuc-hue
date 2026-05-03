import { cn } from "@/lib/utils";

/**
 * Premium shimmering skeleton — uses gradient + animation rather than the
 * default `animate-pulse`. Keep heights/widths in sync with real content
 * to prevent layout shift.
 */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-muted/70",
        "before:absolute before:inset-0 before:-translate-x-full",
        "before:animate-[shimmer_1.6s_infinite] before:bg-gradient-to-r",
        "before:from-transparent before:via-white/40 before:to-transparent",
        className,
      )}
      aria-hidden
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background">
      <Skeleton className="aspect-[4/5] rounded-none" />
      <div className="space-y-2 p-3">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function CategoryGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="aspect-[4/5] rounded-xl" />
      ))}
    </div>
  );
}

export function HomeSkeleton() {
  return (
    <div className="space-y-12">
      <section className="bg-accent/40 px-4 py-12">
        <div className="mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-12 w-full max-w-md" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-4 w-full max-w-md" />
            <div className="flex gap-3">
              <Skeleton className="h-12 w-44" />
              <Skeleton className="h-12 w-32" />
            </div>
          </div>
          <Skeleton className="aspect-square w-full max-w-lg" />
        </div>
      </section>
      <section className="mx-auto max-w-7xl space-y-6 px-4">
        <Skeleton className="h-8 w-64" />
        <CategoryGridSkeleton />
      </section>
      <section className="mx-auto max-w-7xl space-y-6 px-4 pb-12">
        <Skeleton className="h-8 w-64" />
        <ProductGridSkeleton />
      </section>
    </div>
  );
}
