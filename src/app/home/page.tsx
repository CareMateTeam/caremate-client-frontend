"use client";

import { useI18n } from "@/libs/i18n/i18n-provider";
import LanguageSwitcher from "@/components/language-switcher";

export default function HomePage() {
  const { t } = useI18n();

  const serviceCards = [
    {
      icon: "👩‍⚕️",
      title: t.home.findCaregiver,
      desc: t.home.findCaregiverDesc,
      badge: "Popular",
    },
    {
      icon: "📅",
      title: t.home.bookService,
      desc: t.home.bookServiceDesc,
      badge: "Fast",
    },
    {
      icon: "💬",
      title: t.home.chatSupport,
      desc: t.home.chatSupportDesc,
      badge: "24/7",
    },
    {
      icon: "📝",
      title: t.home.carePlan,
      desc: t.home.carePlanDesc,
      badge: "Smart",
    },
  ];

  const stats = [
    {
      label: "Care hours",
      value: "128",
      unit: "hrs",
    },
    {
      label: "Bookings",
      value: "12",
      unit: "times",
    },
    {
      label: "Care score",
      value: "96",
      unit: "%",
    },
  ];

  const careSteps = [
    {
      title: "ประเมินความต้องการ",
      desc: "เลือกบริการที่เหมาะกับผู้ป่วยหรือคนในครอบครัว",
    },
    {
      title: "จับคู่ผู้ดูแล",
      desc: "ระบบช่วยแนะนำผู้ดูแลตามประเภทงานและช่วงเวลา",
    },
    {
      title: "ติดตามการดูแล",
      desc: "ดูสถานะการจอง แผนการดูแล และการช่วยเหลือผ่าน LINE",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-white px-5 py-6 text-slate-900">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-emerald-100 to-sky-100" />
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-200/35 blur-3xl" />
      <div className="pointer-events-none absolute top-24 right-[-80px] h-80 w-80 rounded-full bg-sky-200/35 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-80px] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-rose-100/40 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-md space-y-6">
        {/* Header */}
        <header className="overflow-hidden rounded-[2rem]  bg-white p-5 shadow-xl  backdrop-blur-xl">
          <div className="flex items-start justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                {t.home.username}
              </div>

              <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950">
                {t.common.appName}
              </h1>

              <p className="mt-2 max-w-xs text-sm leading-6 text-slate-600">
                {t.home.description}
              </p>
            </div>

            <LanguageSwitcher />
          </div>

          <div className="mt-5 rounded-[1.5rem] bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-4 text-white shadow-lg shadow-emerald-100">
            <p className="text-xs font-medium text-white">
              Today care overview
            </p>

            <div className="mt-3 grid grid-cols-3 gap-3">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl bg-white/18 p-3 backdrop-blur"
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
        </header>

        {/* Quick service cards */}
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
                className="group rounded-[1.6rem] bg-white/85 p-4 text-left shadow-lg  backdrop-blur transition hover:-translate-y-1 hover:shadow-xl"
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
                  Start
                  <span className="transition group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Upcoming booking */}
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
              <p className="font-bold text-slate-950">
                {t.home.nurseAssistant}
              </p>
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
              Care journey
            </p>
            <h2 className="mt-1 text-lg font-black text-slate-950">
              ขั้นตอนการดูแลที่ง่ายขึ้น
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

        {/* Status card */}
        <section className="overflow-hidden rounded-[2rem] bg-slate-950 p-5 text-white shadow-xl shadow-slate-200">
          {/* <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-slate-300">{t.home.careStatus}</p>
              <h2 className="mt-2 text-2xl font-black">
                {t.home.statusHeadline}
              </h2>
            </div>

            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-2xl">
              💚
            </div>
          </div>

          <p className="mt-3 text-sm leading-6 text-slate-300">
            {t.home.statusDescription}
          </p>

          <div className="mt-5 rounded-[1.4rem] bg-white/10 p-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300">Care progress</span>
              <span className="font-bold text-emerald-300">76%</span>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[76%] rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300" />
            </div>
          </div> */}
        </section>
      </div>
    </main>
  );
}
