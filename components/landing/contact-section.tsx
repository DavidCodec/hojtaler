"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { FormEvent, useId, useMemo, useState } from "react";
import {
  CustomSelect,
  type CustomSelectOption,
} from "@/components/landing/custom-select";
import { SITE, whatsappHref } from "@/lib/site-config";

const initial = {
  nombre: "",
  empresa: "",
  correo: "",
  telefono: "",
  ubicacion: "",
  marca: "",
  mensaje: "",
};

export function ContactSection() {
  const t = useTranslations("contact");
  const tm = useTranslations("contact.form.mail");
  const [values, setValues] = useState(initial);
  const [submitted, setSubmitted] = useState(false);
  const marcaFieldLabelId = useId();

  const marcaOptions: CustomSelectOption[] = useMemo(
    () => [
      { value: "", label: t("form.marcaPlaceholder") },
      ...SITE.brands.map((b) => ({ value: b, label: b })),
      { value: "__varias", label: t("form.marcaVarias") },
    ],
    [t],
  );

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  }

  function resolveMarcaLabel(value: string) {
    return marcaOptions.find((o) => o.value === value)?.label ?? value;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const body = [
      `${tm("name")}: ${values.nombre}`,
      `${tm("company")}: ${values.empresa}`,
      `${tm("email")}: ${values.correo}`,
      `${tm("phone")}: ${values.telefono}`,
      `${tm("location")}: ${values.ubicacion}`,
      `${tm("brand")}: ${resolveMarcaLabel(values.marca)}`,
      "",
      values.mensaje,
    ].join("\n");

    const company = values.empresa || values.nombre || SITE.name;
    const mailto = `mailto:${SITE.contactEmail}?subject=${encodeURIComponent(
      tm("subject", { company }),
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setSubmitted(true);
  }

  return (
    <section
      id="contacto"
      className="scroll-mt-24 border-t border-zinc-800 bg-zinc-900/25 py-20 sm:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
        >
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
            {t("intro")}
          </p>

          <div className="mt-8 space-y-4 text-sm text-zinc-400">
            <p>
              <span className="text-zinc-500">{t("emailLabel")} </span>
              <a
                href={`mailto:${SITE.contactEmail}`}
                className="text-zinc-200 underline-offset-4 hover:text-white hover:underline"
              >
                {SITE.contactEmail}
              </a>
            </p>
            <p>
              <span className="text-zinc-500">{t("whatsappLabel")} </span>
              <a
                href={whatsappHref(t("whatsappPrefill"))}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-200 underline-offset-4 hover:text-white hover:underline"
              >
                {SITE.whatsappDisplay}
              </a>
            </p>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, delay: 0.05 }}
          onSubmit={handleSubmit}
          className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-6 shadow-sm sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="sm:col-span-1">
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-500">
                {t("form.name")}
              </span>
              <input
                required
                name="nombre"
                value={values.nombre}
                onChange={handleChange}
                placeholder={t("form.placeholders.name")}
                className="w-full rounded-md border border-zinc-800 bg-zinc-900/80 px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none ring-zinc-500/40 transition-shadow focus:ring-2"
                autoComplete="name"
              />
            </label>
            <label className="sm:col-span-1">
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-500">
                {t("form.company")}
              </span>
              <input
                required
                name="empresa"
                value={values.empresa}
                onChange={handleChange}
                placeholder={t("form.placeholders.company")}
                className="w-full rounded-md border border-zinc-800 bg-zinc-900/80 px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none ring-zinc-500/40 transition-shadow focus:ring-2"
                autoComplete="organization"
              />
            </label>
            <label className="sm:col-span-1">
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-500">
                {t("form.email")}
              </span>
              <input
                required
                type="email"
                name="correo"
                value={values.correo}
                onChange={handleChange}
                placeholder={t("form.placeholders.email")}
                className="w-full rounded-md border border-zinc-800 bg-zinc-900/80 px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none ring-zinc-500/40 transition-shadow focus:ring-2"
                autoComplete="email"
              />
            </label>
            <label className="sm:col-span-1">
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-500">
                {t("form.phone")}
              </span>
              <input
                required
                name="telefono"
                value={values.telefono}
                onChange={handleChange}
                placeholder={t("form.placeholders.phone")}
                className="w-full rounded-md border border-zinc-800 bg-zinc-900/80 px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none ring-zinc-500/40 transition-shadow focus:ring-2"
                autoComplete="tel"
              />
            </label>
            <label className="sm:col-span-2">
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-500">
                {t("form.location")}
              </span>
              <input
                required
                name="ubicacion"
                value={values.ubicacion}
                onChange={handleChange}
                placeholder={t("form.placeholders.location")}
                className="w-full rounded-md border border-zinc-800 bg-zinc-900/80 px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none ring-zinc-500/40 transition-shadow focus:ring-2"
              />
            </label>
            <div className="sm:col-span-2">
              <span
                id={marcaFieldLabelId}
                className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-500"
              >
                {t("form.brand")}
              </span>
              <CustomSelect
                aria-labelledby={marcaFieldLabelId}
                value={values.marca}
                onChange={(marca) => setValues((v) => ({ ...v, marca }))}
                options={marcaOptions}
                placeholder={t("form.marcaPlaceholder")}
              />
            </div>
            <label className="sm:col-span-2">
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-500">
                {t("form.message")}
              </span>
              <textarea
                required
                name="mensaje"
                value={values.mensaje}
                onChange={handleChange}
                rows={4}
                placeholder={t("form.placeholders.message")}
                className="w-full resize-y rounded-md border border-zinc-800 bg-zinc-900/80 px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none ring-zinc-500/40 transition-shadow focus:ring-2"
              />
            </label>
          </div>

          <div className="mt-6 flex flex-col items-center gap-3 sm:justify-between">
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-zinc-100 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-white"
            >
              <Send className="size-4" aria-hidden />
              {t("form.submit")}
            </button>
            {submitted ? (
              <p className="text-xs text-zinc-500">{t("form.hintAfter")}</p>
            ) : (
              <p className="text-xs text-zinc-600">{t("form.hintBefore")}</p>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}
