// components/profile/pdpa-policy-popup.tsx

"use client";

import React, { useEffect, useState } from "react";

import { useI18n } from "@/libs/i18n/i18n-provider";

export default function PdpaPolicyPopup() {
  const [open, setOpen] = useState(false);
  const { t } = useI18n();
  const p = t.pdpa;

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block w-full rounded-lg border border-cyan-100 bg-cyan-50/90 p-4 text-left shadow-sm transition hover:border-cyan-200 hover:bg-cyan-50 active:scale-[0.99]"
      >
        <div className="flex items-center gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl shadow-md bg-white text-2xl">
            🛡️
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-slate-950">{p.triggerTitle}</h3>
            <p className="mt-1 text-sm leading-5 text-slate-500">
              {p.triggerDesc}
            </p>
          </div>

          <span className="text-xl text-slate-500">›</span>
        </div>
      </button>

      {open ? (
        <div className="fixed inset-0 z-[9999] flex items-end justify-center bg-slate-950/45 px-4 pb-4 pt-10 backdrop-blur-sm sm:items-center">
          <div className="flex max-h-[88vh] w-full max-w-md flex-col overflow-hidden rounded-[2rem] bg-white shadow-2xl">
            <div className="border-b border-slate-100 px-5 py-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-cyan-600">
                    {p.headerSmall}
                  </p>
                  <h2 className="mt-1 text-xl font-extrabold text-slate-950">
                    {p.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {p.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-slate-100 text-xl font-bold text-slate-500 transition hover:bg-slate-200"
                  aria-label={p.closeAria}
                >
                  X
                </button>
              </div>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
              <div className="rounded-2xl bg-cyan-50 px-4 py-3 text-sm leading-6 text-cyan-800">
                {p.intro}
              </div>

              {p.sections.map((section) => (
                <section key={section.title}>
                  <h3 className="text-sm font-extrabold text-slate-950">
                    {section.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {section.content}
                  </p>
                </section>
              ))}

              <section className="rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3">
                <h3 className="text-sm font-extrabold text-amber-900">
                  {p.importantTitle}
                </h3>
                <p className="mt-2 text-sm leading-6 text-amber-800">
                  {p.importantDesc}
                </p>
              </section>
            </div>

            <div className="border-t border-slate-100 p-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="h-12 w-full rounded-2xl bg-cyan-500 text-sm font-bold text-white shadow-md shadow-cyan-100 transition hover:bg-cyan-600 active:scale-[0.99]"
              >
                {p.acknowledge}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
