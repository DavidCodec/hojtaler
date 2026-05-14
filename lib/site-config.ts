/** Ajusta correo y WhatsApp cuando tengas los datos oficiales. */
export const SITE = {
  name: "HOJTALER",
  contactEmail: "contacto@hojtaler.com",
  /** Solo dígitos, sin + (ej. Venezuela 58 + número). */
  whatsappE164: "584000000000",
  brands: [
    "JBL",
    "AKG",
    "Crown",
    "Soundcraft",
    "dbx",
    "Bluesound",
    "LEA",
  ] as const,
} as const;

export function whatsappHref(message?: string) {
  const base = `https://wa.me/${SITE.whatsappE164}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
