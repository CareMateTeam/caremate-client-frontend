"use client";
import Image from "next/image";
import LanguageSwitcher from "@/components/language-switcher";
import React from "react";
import { useI18n } from "@/libs/i18n/i18n-provider";
export default function page() {
  const { t } = useI18n();
  return (
    <div>
      <header className="flex items-center justify-between">
        <div>
          {/* <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Welcome back
          </p> */}
          <div className="flex gap-2 items-center">
            <div className="p-1 rounded-full overflow-hidden bg-white shadow-lg">
              <Image
                src="/icon/caremate-icon.png"
                alt="Caremate Icon"
                width={32}
                height={32}
              />
            </div>

            <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-950">
              {t.common.appName}
            </h1>
          </div>
        </div>

        <LanguageSwitcher />
      </header>
      page
    </div>
  );
}
