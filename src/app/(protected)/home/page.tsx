"use client";

import { useI18n } from "@/libs/i18n/i18n-provider";
import LanguageSwitcher from "@/components/language-switcher";
import Image from "next/image";
import Link from "next/link";
import { UserInformation, UserProfileResponse } from "@/dto/user";
import { TopUserInformation } from "@/components/card/user-information";
import { useEffect, useState } from "react";
import {
  mapUserProfileToTopInformation,
  unwrapApiData,
} from "@/libs/user/map-user-profile";
import { TopUserInformationSkeleton } from "@/components/card/user-skelton";
import HomeImageCarousel from "@/components/home/image-carousel";
import HomeHeroSection from "@/components/home/home-hero-section";

const quickActionsMeta = [
  { href: "/services", icon: "🩺", color: "from-cyan-500 to-emerald-500" },
  { href: "/members", icon: "👨‍👩‍👧", color: "from-emerald-500 to-teal-500" },
  { href: "/profile/addresses", icon: "📍", color: "from-sky-500 to-cyan-500" },
  { href: "/notifications", icon: "🔔", color: "from-violet-500 to-cyan-500" },
];

export default function HomePage() {
  const { t } = useI18n();

  const [currentUser, setCurrentUser] = useState<UserInformation | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        setLoadingUser(true);

        const res = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        const data = await res.json().catch(() => null);

        if (!res.ok) {
          throw new Error(data?.message ?? "Failed to fetch user profile");
        }

        const profile = unwrapApiData<UserProfileResponse>(data);
        const mappedUser = mapUserProfileToTopInformation(profile);

        setCurrentUser(mappedUser);
      } catch (error) {
        console.error("Fetch user profile error:", error);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchMe();
  }, []);

  const quickActions = t.home.quickActions.map((item, idx) => ({
    ...item,
    ...quickActionsMeta[idx],
  }));
  const careHighlights = t.home.careHighlights;
  const healthTips = t.home.healthTips;
  const careSteps = t.home.careStepsExtended;
  const ctaLines = t.home.ctaHeadline.split("\n");

  return (
    <div className="z-10 space-y-6">
      <header className="flex items-center justify-between">
        <div>
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

      {loadingUser ? (
        <TopUserInformationSkeleton />
      ) : currentUser ? (
        <TopUserInformation user={currentUser} />
      ) : null}

      <HomeHeroSection />
      <HomeImageCarousel />
      <section className="grid grid-cols-2 gap-3">
        {quickActions.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="group rounded-xl shadow-md  border border-gray-200 bg-white/90 p-4 transition active:scale-[0.98]"
          >
            <div
              className={[
                "grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br text-2xl text-white shadow-lg",
                item.color,
              ].join(" ")}
            >
              {item.icon}
            </div>

            <h3 className="mt-4 text-sm font-black text-slate-950">
              {item.title}
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              {item.description}
            </p>

            <p className="mt-3 text-xs font-black text-cyan-600">
              {t.home.quickActionTap}
            </p>
          </Link>
        ))}
      </section>

      <section className="rounded-[2rem] border border-emerald-100 bg-white px-5 py-6 shadow-xl shadow-emerald-100 ">
        <div className="flex items-start gap-4">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-emerald-50 text-3xl">
            🌿
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-600">
              {t.home.aboutBadge}
            </p>

            <h2 className="mt-1 text-xl font-black text-slate-950">
              {t.home.aboutTitle}
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {t.home.aboutDescription}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-4">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-600">
              {t.home.careFeaturesBadge}
            </p>
            <h2 className="text-lg font-black text-slate-950">
              {t.home.careFeaturesTitle}
            </h2>
          </div>
        </div>

        <div className="space-y-3">
          {careHighlights.map((item) => (
            <div
              key={item.title}
              className="rounded-[1.5rem] border border-slate-100 bg-white p-4 shadow-lg shadow-slate-50"
            >
              <div className="flex gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-cyan-50 text-2xl">
                  {item.icon}
                </div>

                <div>
                  <h3 className="text-sm font-black text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-[2rem] border border-cyan-100 bg-white shadow-xl shadow-cyan-50">
        <div className="bg-gradient-to-r from-cyan-50 to-emerald-50 p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-600">
            {t.home.howItWorksBadge}
          </p>
          <h2 className="mt-1 text-xl font-black text-slate-950">
            {t.home.howItWorksTitle}
          </h2>
        </div>

        <div className="space-y-4 p-5">
          {careSteps.map((item, index) => (
            <div key={item.step} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-sm font-black text-white">
                  {item.step}
                </div>

                {index < careSteps.length - 1 && (
                  <div className="mt-2 h-10 w-px bg-slate-200" />
                )}
              </div>

              <div className="pb-2">
                <h3 className="text-sm font-black text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-amber-100 bg-amber-50 p-5 shadow-xl shadow-amber-50">
        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-2xl shadow-sm">
            💡
          </div>

          <div>
            <h2 className="text-lg font-black text-slate-950">
              {t.home.tipsTitle}
            </h2>

            <div className="mt-4 space-y-3">
              {healthTips.map((tip) => (
                <div key={tip} className="flex gap-3">
                  <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                  <p className="text-sm leading-6 text-slate-600">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] bg-slate-950 p-5 text-white shadow-2xl shadow-slate-200">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">
              {t.home.ctaBadge}
            </p>

            <h2 className="mt-2 text-2xl font-black leading-tight">
              {ctaLines.map((line, idx) => (
                <span key={idx}>
                  {line}
                  {idx < ctaLines.length - 1 && <br />}
                </span>
              ))}
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/70">
              {t.home.ctaDescription}
            </p>
          </div>

          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/10 text-3xl">
            🤝
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <Link
            href="/members"
            className="rounded-2xl bg-white px-4 py-3 text-center text-sm font-black text-slate-950 active:scale-[0.98]"
          >
            {t.home.ctaManageMembers}
          </Link>

          <Link
            href="/services"
            className="rounded-2xl bg-cyan-500 px-4 py-3 text-center text-sm font-black text-white active:scale-[0.98]"
          >
            {t.home.ctaSeeServices}
          </Link>
        </div>
      </section>

      <div className="h-6" />
    </div>
  );
}
