"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useCallback, useEffect, useId, useRef, useState } from "react";

const shortLabel: Record<string, string> = {
  es: "ES",
  en: "EN",
};

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("localeSwitcher");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listboxId = useId();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        close();
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open, close]);

  function switchTo(next: string) {
    if (next === locale) {
      close();
      queueMicrotask(() => buttonRef.current?.focus());
      return;
    }
    router.replace((pathname === "" ? "/" : pathname) || "/", {
      locale: next,
    });
    close();
    queueMicrotask(() => buttonRef.current?.focus());
  }

  return (
    <div className="relative" ref={rootRef}>
      <button
        ref={buttonRef}
        type="button"
        aria-label={t("open")}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-2.5 py-2 text-xs font-medium text-zinc-800 outline-none ring-zinc-400/40 transition-colors hover:border-zinc-300 hover:bg-zinc-50 focus-visible:ring-2 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-200 dark:ring-zinc-500/40 dark:hover:border-zinc-600 dark:hover:bg-zinc-800/80 ${
          open ? "border-zinc-400 ring-2 ring-zinc-400/50 dark:border-zinc-500 dark:ring-zinc-500/40" : ""
        }`}
      >
        <Languages className="size-4 shrink-0 text-zinc-500 dark:text-zinc-400" aria-hidden />
        <span className="tabular-nums tracking-wide">
          {shortLabel[locale] ?? locale.toUpperCase()}
        </span>
        <ChevronDown
          className={`size-3.5 shrink-0 text-zinc-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.ul
            id={listboxId}
            role="listbox"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] as const }}
            className="absolute right-0 z-[60] mt-1.5 min-w-[10rem] overflow-hidden rounded-md border border-zinc-200 bg-white py-1 shadow-lg shadow-black/10 ring-1 ring-zinc-200/80 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-black/40 dark:ring-zinc-800/80"
          >
            {routing.locales.map((loc) => {
              const active = loc === locale;
              return (
                <li key={loc} role="presentation">
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    className={`flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/80 ${
                      active ? "text-zinc-900 dark:text-zinc-50" : "text-zinc-700 dark:text-zinc-300"
                    }`}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => switchTo(loc)}
                  >
                    <span>{t(loc as "es" | "en")}</span>
                    {active ? (
                      <Check className="size-4 shrink-0 text-zinc-500 dark:text-zinc-400" aria-hidden />
                    ) : (
                      <span className="size-4 shrink-0" aria-hidden />
                    )}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
