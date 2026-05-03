"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

export type UspItem = {
  /** Pre-rendered icon element (server callers pass `<Shirt className="..." />`)
   * so we don't violate RSC's no-function-props rule. */
  icon: React.ReactNode;
  title: string;
  desc: string;
};

const itemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1 },
};

/**
 * Grid of USP/feature cards with staggered scroll-reveal and a subtle
 * icon hover micro-interaction. Server callers can pass any number of items.
 * Honors prefers-reduced-motion.
 */
export function AnimatedUspGrid({
  items,
  columns = 4,
  className,
}: {
  items: UspItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const colClass =
    columns === 4
      ? "md:grid-cols-4"
      : columns === 3
        ? "md:grid-cols-3"
        : "md:grid-cols-2";

  return (
    <motion.ul
      initial={reduced ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ show: { transition: { staggerChildren: 0.08 } } }}
      className={cn("grid grid-cols-2 gap-3 md:gap-4", colClass, className)}
    >
      {items.map((it) => (
        <motion.li
          key={it.title}
          variants={itemVariants}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="group relative overflow-hidden rounded-xl border border-border bg-background p-5 shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-medium)]"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition group-hover:bg-primary/20"
          />
          <div className="relative">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary text-primary-foreground transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 [&_svg]:h-5 [&_svg]:w-5">
              {it.icon}
            </span>
            <h3 className="mt-3 font-display text-base tracking-wide md:text-lg">
              {it.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{it.desc}</p>
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );
}
