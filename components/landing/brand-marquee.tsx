"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SITE } from "@/lib/site-config";

export function BrandMarquee() {
  const t = useTranslations("brands");
  const labels = [...SITE.brands, ...SITE.brands];

  return (
    <section
      id="marcas"
      className="scroll-mt-24 border-y border-zinc-800/80 bg-zinc-900/40 py-10"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="mb-8 text-center text-xs font-medium uppercase tracking-[0.25em] text-zinc-500">
          {t("title")}
        </p>
      </div>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-zinc-950 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-zinc-950 to-transparent" />

        <motion.div
          className="flex w-max items-center gap-x-16 gap-y-6 pr-16"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 42,
              ease: "linear",
            },
          }}
        >
          {labels.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="shrink-0 text-xl font-semibold tracking-[0.22em] text-zinc-500 sm:text-2xl"
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>

      <p className="mx-auto mt-8 max-w-2xl px-4 text-center text-sm text-zinc-500 sm:px-6">
        {t("footnote")}
      </p>
    </section>
  );
}
