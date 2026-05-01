import type { Partner } from "@/types/product";

export function TrustBar({ partners }: { partners: Partner[] }) {
  return (
    <section
      aria-label="Đối tác đã hợp tác"
      className="border-y border-border bg-muted/40 py-7"
    >
      <div className="mx-auto max-w-5xl px-4">
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Hơn 1.200 đội bóng & doanh nghiệp đã tin chọn
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-semibold uppercase tracking-wide text-foreground/60">
          {partners.map((p) => (
            <li key={p.id} className="opacity-80 transition-opacity hover:opacity-100">
              {p.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
