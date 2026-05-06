import {
  ProductGridSkeleton,
  Skeleton,
} from "@/components/marketing/skeletons";

export default function ProductListLoading() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 md:px-6">
      <header className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-8 w-64" />
      </header>
      <div className="grid gap-6 md:grid-cols-[220px_1fr]">
        <aside className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </aside>
        <ProductGridSkeleton count={8} />
      </div>
    </div>
  );
}
