"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/landing/locale-switcher";
import { SITE } from "@/lib/site-config";

export function Header() {
  const tNav = useTranslations("nav");
  const tHeader = useTranslations("header");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
  });

  const nav = [
    { href: "/#marcas" as const, label: tNav("brands") },
    { href: "/#soluciones" as const, label: tNav("solutions") },
    { href: "/#contacto" as const, label: tNav("contact") },
  ];

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-zinc-800/90 bg-zinc-950/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <Image
            src="/LOGO%20HOJTALER.jpg"
            alt={SITE.name}
            width={40}
            height={40}
            className="h-9 w-9 shrink-0 rounded-md object-contain"
            priority
          />
          <span className="hidden truncate text-sm font-medium tracking-[0.18em] text-zinc-400 sm:inline">
            {SITE.name}
          </span>
        </Link>

      <div className="flex items-center gap-2 sm:gap-3">
        <nav className="hidden items-center gap-8 lg:gap-10 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#contacto"
            className="rounded-md border border-zinc-600 bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-950 transition-colors hover:bg-white"
          >
            {tHeader("ctaAdvisor")}
          </Link>
        </nav>

        <LocaleSwitcher />

        <button
          type="button"
          className="inline-flex rounded-md border border-zinc-700 p-2 text-zinc-200 md:hidden"
          aria-expanded={open}
          aria-label={open ? tHeader("menuClose") : tHeader("menuOpen")}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-zinc-800 bg-zinc-950/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-900"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/#contacto"
                className="mt-2 rounded-md bg-zinc-100 px-3 py-2 text-center text-sm font-medium text-zinc-950"
                onClick={() => setOpen(false)}
              >
                {tHeader("ctaAdvisor")}
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
