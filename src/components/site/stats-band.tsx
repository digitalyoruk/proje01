"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import type { Stat } from "@cms/lib/types";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!reduce && !inView) return;
    const controls = animate(0, value, {
      duration: reduce ? 0 : 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

export function StatsBand({ stats }: { stats: Stat[] }) {
  if (!stats.length) return null;
  return (
    <div className="mx-auto flex max-w-[18rem] flex-col divide-y divide-[var(--color-border-warm)] sm:max-w-none sm:grid sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="flex flex-col items-center gap-1.5 py-7 text-center first:pt-0 last:pb-0 sm:gap-2.5 sm:px-6 sm:py-0 lg:px-4"
        >
          <div className="font-display text-4xl font-medium leading-none tracking-tight text-[var(--color-ink)] md:text-5xl">
            <Counter value={s.value} suffix={s.suffix} />
          </div>
          <p className="max-w-[15rem] text-[0.8125rem] leading-snug text-[var(--color-muted-foreground)] sm:max-w-[10rem] sm:text-sm">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}
