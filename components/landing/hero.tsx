"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight, Radio, SlidersHorizontal } from "lucide-react";
import { Link } from "@/i18n/navigation";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-[min(88vh,920px)] overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-28">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/hero.jpg"
          alt={t("imageAlt")}
          fill
          priority
          className="object-cover object-[center_40%] sm:object-[center_35%]"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-zinc-50 via-zinc-50/92 to-zinc-50/30 sm:via-zinc-50/88 dark:from-zinc-950 dark:via-zinc-950/88 dark:to-zinc-950/25 sm:dark:via-zinc-950/82"
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-[0.07] dark:hidden"
          style={{
            backgroundImage: `linear-gradient(to right, rgb(24 24 27 / 0.12) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(24 24 27 / 0.12) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
        <div
          className="absolute inset-0 hidden opacity-[0.04] dark:block"
          style={{
            backgroundImage: `linear-gradient(to right, rgb(244 244 245) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(244 244 245) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-500"
        >
          <Radio className="size-3.5" aria-hidden />
          {t("badge")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl lg:text-[3.25rem]"
        >
          {t("title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg"
        >
          {t("lead")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <Link
            href="/#contacto"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-800 bg-zinc-900 px-6 py-3 text-sm font-semibold text-zinc-50 transition-colors hover:bg-zinc-800 dark:border-transparent dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
          >
            {t("ctaPrimary")}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link
            href="/#marcas"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-300 bg-white/60 px-6 py-3 text-sm font-medium text-zinc-800 backdrop-blur-sm transition-colors hover:border-zinc-400 hover:bg-white dark:border-zinc-700 dark:bg-transparent dark:text-zinc-200 dark:hover:border-zinc-500 dark:hover:text-white"
          >
            <SlidersHorizontal className="size-4" aria-hidden />
            {t("ctaSecondary")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
