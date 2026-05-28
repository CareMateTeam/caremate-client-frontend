"use client";

import { useI18n } from "@/libs/i18n/i18n-provider";
import { locales, localeLabels, type Locale } from "@/libs/i18n/config";

type Variant = "pill" | "compact";

export default function LanguageSwitcher({
  variant = "pill",
  className = "",
}: {
  variant?: Variant;
  className?: string;
}) {
  const { locale, setLocale } = useI18n();

  if (variant === "compact") {
    const next: Locale = locale === "th" ? "en" : "th";
    return (
      <button
        type="button"
        onClick={() => setLocale(next)}
        aria-label={`Switch language to ${localeLabels[next]}`}
        className={
          "inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-white/80 px-3 py-1 text-[11px] font-semibold text-emerald-700 shadow-sm backdrop-blur transition hover:bg-white " +
          className
        }
      >
        <span>{locale.toUpperCase()}</span>
        <span aria-hidden="true">/</span>
        <span className="opacity-60">{next.toUpperCase()}</span>
      </button>
    );
  }

  return (
    <div
      className={
        "inline-flex items-center rounded-full border border-emerald-200 bg-white/80 p-0.5 text-[11px] font-semibold shadow-sm backdrop-blur " +
        className
      }
      role="group"
      aria-label="Language switcher"
    >
      {locales.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLocale(l)}
            aria-pressed={active}
            className={
              "rounded-full px-3 py-1 transition " +
              (active
                ? "bg-gradient-to-br from-emerald-400 to-sky-600 text-white shadow"
                : "text-sky-700 hover:bg-emerald-50")
            }
          >
            {l.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
