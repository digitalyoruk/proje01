"use client";

import { motion, useReducedMotion } from "motion/react";
import { CmsImage } from "@/components/site/cms-image";
import type { LandingData, Social } from "@cms/lib/types";

export function Hero({
  data,
  socials,
}: {
  data: LandingData["hero"];
  socials: Social[];
}) {
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <CmsImage
          image={data.image}
          alt={data.image?.alt || data.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Scrims for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/25" />

      <div className="container-edge relative flex min-h-[100dvh] flex-col justify-end pb-16 pt-28 md:pb-20">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-white md:col-span-8 md:text-6xl lg:text-7xl"
          >
            {data.title}
          </motion.h1>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6 md:col-span-4 md:items-end"
          >
            <p className="max-w-sm text-sm leading-relaxed text-white/85 md:text-right">
              {data.intro}
            </p>
            {socials.length > 0 && (
              <ul className="flex flex-wrap gap-x-5 gap-y-1 text-xs uppercase tracking-[0.18em] text-white/70 md:justify-end">
                {socials.map((s) => (
                  <li key={s.platform}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors hover:text-white"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
