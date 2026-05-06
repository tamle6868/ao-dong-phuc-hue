"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

export type ProcessStep = {
  step: number;
  /** Pre-rendered icon element (e.g. `<Shirt className="..." />`). Server pages
   * pass a JSX element so we don't violate RSC's "no function props". */
  icon: React.ReactNode;
  title: string;
  time: string;
  desc: string;
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

export function ProcessTimeline({
  steps,
  className,
}: {
  steps: ProcessStep[];
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <div className={cn("relative", className)}>
      <div
        aria-hidden
        className="absolute left-[26px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/20 via-primary/60 to-primary/20 md:left-1/2 md:-translate-x-px"
      />
      <ol className="space-y-6 md:space-y-10">
        {steps.map((s, i) => {
          const isRight = i % 2 === 1;
          return (
            <motion.li
              key={s.step}
              initial={reduced ? false : "hidden"}
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={itemVariants}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={cn(
                "relative grid grid-cols-[56px_1fr] gap-4 md:grid-cols-2 md:gap-12",
                isRight && "md:[&>div:first-child]:order-2",
              )}
            >
              <div
                className={cn(
                  "relative md:flex md:items-center",
                  isRight ? "md:justify-start" : "md:justify-end",
                )}
              >
                <span className="grid h-12 w-12 place-items-center rounded-full border-2 border-primary bg-background font-display text-base text-primary shadow-[var(--shadow-soft)] md:h-14 md:w-14 md:text-lg [&_svg]:h-5 [&_svg]:w-5 md:[&_svg]:h-6 md:[&_svg]:w-6">
                  {s.icon}
                </span>
                <span className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground md:hidden">
                  {s.step}
                </span>
              </div>

              <div
                className={cn(
                  "rounded-xl border border-border bg-background p-5 shadow-[var(--shadow-soft)] md:p-6",
                  isRight ? "md:text-left" : "md:text-right",
                )}
              >
                <p className="text-[11px] font-bold uppercase tracking-widest text-primary">
                  Bước {s.step} · {s.time}
                </p>
                <h3 className="mt-1 font-display text-lg tracking-wide md:text-xl">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
