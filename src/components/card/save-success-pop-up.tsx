"use client";

import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

import { useI18n } from "@/libs/i18n/i18n-provider";

interface Props {
  label?: string;
  backto?: string;
  backtoHref?: string;
}

export default function SaveSuccessPopUp({ label, backto, backtoHref }: Props) {
  const router = useRouter();
  const { t } = useI18n();

  const body = label
    ? t.popups.saveSuccessBody.replace("{label}", label)
    : t.popups.saveSuccessGenericBody;

  const backLabel = backto
    ? `${t.popups.saveSuccessBackPrefix}${backto}`
    : t.popups.saveSuccessBackFallback;

  return (
    <div className="fixed inset-0 z-[9999] grid place-items-center bg-slate-950/40 px-5 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-[2rem] bg-white p-6 text-center shadow-2xl">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 rouded-full text-3xl">
          <Check className="h-8 w-8 text-emerald-500" />
        </div>

        <h2 className="mt-4 text-xl font-extrabold text-slate-950">
          {t.popups.saveSuccessTitle}
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">{body}</p>

        <button
          type="button"
          onClick={() => router.replace(backtoHref || "/home")}
          className="mt-5 h-12 w-full rounded-2xl bg-cyan-500 text-sm font-bold text-white shadow-md shadow-cyan-100 transition hover:bg-cyan-600 active:scale-[0.99]"
        >
          {backLabel}
        </button>
      </div>
    </div>
  );
}
