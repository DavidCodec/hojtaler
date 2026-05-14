"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Church,
  Hotel,
  Mic2,
  Presentation,
  Store,
  Waves,
} from "lucide-react";
import { useTranslations } from "next-intl";

const itemKeys = [
  "fixed",
  "live",
  "church",
  "retail",
  "hotel",
  "conference",
  "venues",
] as const;

const icons: Record<(typeof itemKeys)[number], LucideIcon> = {
  fixed: Building2,
  live: Mic2,
  church: Church,
  retail: Store,
  hotel: Hotel,
  conference: Presentation,
  venues: Waves,
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const itemMotion = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Solutions() {
  const t = useTranslations("solutions");

  return (
    <section id="soluciones" className="scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="max-w-2xl"
        >
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
            {t("lead")}
          </p>
        </motion.div>

        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {itemKeys.map((key) => {
            const Icon = icons[key];
            return (
              <motion.li
                key={key}
                variants={itemMotion}
                className="rounded-lg border border-zinc-200 bg-white/80 p-5 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/35 dark:hover:border-zinc-700"
              >
                <div className="flex items-start gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-medium text-zinc-900 dark:text-zinc-100">
                      {t(`items.${key}.title`)}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-500">
                      {t(`items.${key}.desc`)}
                    </p>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
