"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { whatsappHref } from "@/lib/site-config";

export function FloatingWhatsapp() {
  const t = useTranslations("contact");

  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-40 flex size-11 items-center justify-center rounded-full bg-white/95 shadow-lg shadow-black/15 ring-1 ring-zinc-200 backdrop-blur-sm transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:bg-zinc-950/90 dark:shadow-black/50 dark:ring-zinc-800/90"
      aria-label={t("whatsapp")}
    >
      <Image
        src="/whatsapp-icon.svg"
        alt=""
        width={40}
        height={40}
        className="size-6 object-contain"
        unoptimized
      />
    </a>
  );
}
