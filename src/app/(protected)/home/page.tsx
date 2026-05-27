"use client";

import { useI18n } from "@/libs/i18n/i18n-provider";
import LanguageSwitcher from "@/components/language-switcher";
import Image from "next/image";
import { UserInformation, UserProfileResponse } from "@/dto/user";
import { TopUserInformation } from "@/components/card/user-information";
import { useEffect, useState } from "react";
import {
  mapUserProfileToTopInformation,
  unwrapApiData,
} from "@/libs/user/map-user-profile";
import { TopUserInformationSkeleton } from "@/components/card/user-skelton";

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

  const serviceCards = [
    {
      icon: "👩‍⚕️",
      title: t.home.findCaregiver,
      desc: t.home.findCaregiverDesc,
      badge: t.home.findCaregiverBadge,
    },
    {
      icon: "📅",
      title: t.home.bookService,
      desc: t.home.bookServiceDesc,
      badge: t.home.bookServiceBadge,
    },
    {
      icon: "💬",
      title: t.home.chatSupport,
      desc: t.home.chatSupportDesc,
      badge: t.home.chatSupportBadge,
    },
    {
      icon: "📝",
      title: t.home.carePlan,
      desc: t.home.carePlanDesc,
      badge: t.home.carePlanBadge,
    },
  ];

  const stats = [
    {
      label: t.home.statsCareHoursLabel,
      value: "128",
      unit: t.home.statsCareHoursUnit,
    },
    {
      label: t.home.statsBookingsLabel,
      value: "12",
      unit: t.home.statsBookingsUnit,
    },
    {
      label: t.home.statsCareScoreLabel,
      value: "96",
      unit: t.home.statsCareScoreUnit,
    },
  ];

  const careSteps = t.home.careSteps;

  return (
    <div className=" z-10  space-y-6">
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

      {loadingUser ? (
        <TopUserInformationSkeleton />
      ) : currentUser ? (
        <TopUserInformation user={currentUser} />
      ) : null}

      <section className="overflow-hidden rounded-[2rem] bg-white p-5 shadow-xl shadow-emerald-100/60 backdrop-blur-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Today overview
            </div>

            <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-950">
              ดูแลคนสำคัญ
              <br />
              ได้ง่ายขึ้นในที่เดียว
            </h2>

            <p className="mt-2 max-w-xs text-sm leading-6 text-slate-600">
              {t.home.description}
            </p>
          </div>

          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-emerald-100 to-sky-100 text-2xl shadow-inner">
            💚
          </div>
        </div>

        <div className="mt-5 rounded-[1.5rem] bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-4 text-white shadow-lg shadow-emerald-100">
          <p className="text-xs font-medium text-white/90">
            Today care summary
          </p>

          <div className="mt-3 grid grid-cols-3 gap-3">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl bg-white/20 p-3 backdrop-blur"
              >
                <p className="text-xl font-black leading-none">
                  {item.value}
                  <span className="ml-1 text-[10px] font-semibold">
                    {item.unit}
                  </span>
                </p>
                <p className="mt-1 text-[10px] text-white/80">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">
              Services
            </p>
            <h2 className="text-lg font-black text-slate-950">
              เลือกบริการที่ต้องการ
            </h2>
          </div>

          <button
            type="button"
            className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-emerald-700 shadow-sm ring-1 ring-emerald-100 backdrop-blur"
          >
            View all
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {serviceCards.map((item) => (
            <button
              key={item.title}
              type="button"
              className="group rounded-[1.6rem] bg-white/90 p-4 text-left shadow-lg shadow-emerald-50 backdrop-blur transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-emerald-50 to-sky-50 text-2xl shadow-inner">
                  {item.icon}
                </div>

                <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600">
                  {item.badge}
                </span>
              </div>

              <h3 className="mt-4 text-sm font-black text-slate-950">
                {item.title}
              </h3>

              <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
                {item.desc}
              </p>

              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-emerald-600">
                {t.home.actionLabel}
                <span className="transition group-hover:translate-x-1"></span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/80 bg-white/85 p-5 shadow-xl shadow-emerald-50 backdrop-blur-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">
              Next appointment
            </p>
            <h2 className="mt-1 font-black text-slate-950">
              {t.home.upcomingBooking}
            </h2>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              {t.home.upcomingTime}
            </p>
          </div>

          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
            {t.home.confirmed}
          </span>
        </div>

        <div className="mt-5 flex items-center gap-4 rounded-[1.5rem] bg-gradient-to-br from-slate-50 to-emerald-50/70 p-4">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-2xl shadow-sm">
            👩‍⚕️
          </div>

          <div className="min-w-0 flex-1">
            <p className="font-bold text-slate-950">{t.home.nurseAssistant}</p>
            <p className="mt-1 text-xs text-slate-500">
              {t.home.nurseLocation}
            </p>
          </div>

          <button
            type="button"
            className="rounded-2xl bg-slate-950 px-3 py-2 text-xs font-bold text-white shadow-lg shadow-slate-200"
          >
            Detail
          </button>
        </div>
      </section>

      {/* Care journey */}
      <section className="rounded-[2rem] border border-white/80 bg-white/75 p-5 shadow-xl shadow-sky-50 backdrop-blur-xl">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-600">
            {t.home.careJourneyTitle}
          </p>
          <h2 className="mt-1 text-lg font-black text-slate-950">
            {t.home.careJourneyHeadline}
          </h2>
        </div>

        <div className="mt-5 space-y-4">
          {careSteps.map((step, index) => (
            <div key={step.title} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-emerald-500 text-xs font-black text-white shadow-lg shadow-emerald-100">
                  {index + 1}
                </div>

                {index !== careSteps.length - 1 && (
                  <div className="mt-2 h-full w-px bg-emerald-100" />
                )}
              </div>

              <div className="pb-2">
                <h3 className="text-sm font-bold text-slate-950">
                  {step.title}
                </h3>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
