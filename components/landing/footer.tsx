"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SITE, whatsappHref } from "@/lib/site-config";

export function Footer() {
  const t = useTranslations("footer");
  const tc = useTranslations("contact");
  const year = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border-t border-zinc-200 py-12 dark:border-zinc-800"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div>
          <p className="text-sm font-semibold tracking-[0.18em] text-zinc-700 dark:text-zinc-300">
            {SITE.name}
          </p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-zinc-600 dark:text-zinc-500">
            {t("tagline")}
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm text-zinc-600 dark:text-zinc-400">
          <p>
            <span className="text-zinc-500 dark:text-zinc-500">{tc("emailLabel")} </span>
            <a
              href={`mailto:${SITE.contactEmail}`}
              className="text-zinc-900 underline-offset-4 hover:text-zinc-700 hover:underline dark:text-zinc-200 dark:hover:text-white"
            >
              {SITE.contactEmail}
            </a>
          </p>
          <p>
            <span className="text-zinc-500 dark:text-zinc-500">{tc("whatsappLabel")} </span>
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-900 underline-offset-4 hover:text-zinc-700 hover:underline dark:text-zinc-200 dark:hover:text-white"
            >
              {SITE.whatsappDisplay}
            </a>
          </p>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl px-4 text-xs text-zinc-500 dark:text-zinc-600 sm:px-6">
        {t("rights", { year, name: SITE.name })}
      </p>
    </motion.footer>
  );
}
