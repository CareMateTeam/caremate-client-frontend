"use client";

import Image from "next/image";
import LanguageSwitcher from "@/components/language-switcher";
import React, { useMemo, useState } from "react";
import { useI18n } from "@/libs/i18n/i18n-provider";

type NotificationType = "all" | "booking" | "care" | "payment" | "system";

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  time: string;
  date: string;
  type: Exclude<NotificationType, "all">;
  status: "unread" | "read";
  priority: "high" | "medium" | "low";
  icon: string;
};

const notifications: NotificationItem[] = [
  {
    id: "1",
    title: "Booking confirmed",
    message:
      "Your caregiver booking with Nurse Aom has been confirmed for tomorrow at 09:00 AM.",
    time: "2 mins ago",
    date: "Today",
    type: "booking",
    status: "unread",
    priority: "high",
    icon: "📅",
  },
  {
    id: "2",
    title: "Medicine reminder",
    message:
      "Please remind your family member to take the evening medicine after dinner.",
    time: "18 mins ago",
    date: "Today",
    type: "care",
    status: "unread",
    priority: "medium",
    icon: "💊",
  },
  {
    id: "3",
    title: "Payment completed",
    message:
      "Your payment for booking #CM-2026-0529 has been successfully completed.",
    time: "1 hr ago",
    date: "Today",
    type: "payment",
    status: "read",
    priority: "low",
    icon: "💳",
  },
  {
    id: "4",
    title: "Care note updated",
    message:
      "A new care note has been added by your caregiver. You can review it in the member profile.",
    time: "3 hrs ago",
    date: "Today",
    type: "care",
    status: "unread",
    priority: "high",
    icon: "📝",
  },
  {
    id: "5",
    title: "New security alert",
    message:
      "A new login was detected on your CareMate account. Please check if this was you.",
    time: "Yesterday",
    date: "Yesterday",
    type: "system",
    status: "read",
    priority: "high",
    icon: "🛡️",
  },
  {
    id: "6",
    title: "Upcoming appointment",
    message:
      "You have an upcoming home-care appointment scheduled this weekend.",
    time: "2 days ago",
    date: "This week",
    type: "booking",
    status: "read",
    priority: "medium",
    icon: "🏠",
  },
];

const filterTabs: { label: string; value: NotificationType }[] = [
  { label: "All", value: "all" },
  { label: "Booking", value: "booking" },
  { label: "Care", value: "care" },
  { label: "Payment", value: "payment" },
  { label: "System", value: "system" },
];

function getPriorityStyle(priority: NotificationItem["priority"]) {
  switch (priority) {
    case "high":
      return "bg-rose-50 text-rose-600 ring-rose-100";
    case "medium":
      return "bg-amber-50 text-amber-600 ring-amber-100";
    default:
      return "bg-emerald-50 text-emerald-600 ring-emerald-100";
  }
}

function getTypeStyle(type: NotificationItem["type"]) {
  switch (type) {
    case "booking":
      return "bg-cyan-50 text-cyan-700";
    case "care":
      return "bg-emerald-50 text-emerald-700";
    case "payment":
      return "bg-violet-50 text-violet-700";
    case "system":
      return "bg-slate-100 text-slate-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

export default function NotificationPage() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<NotificationType>("all");

  const filteredNotifications = useMemo(() => {
    if (activeTab === "all") {
      return notifications;
    }

    return notifications.filter((item) => item.type === activeTab);
  }, [activeTab]);

  const unreadCount = notifications.filter(
    (item) => item.status === "unread",
  ).length;

  const highPriorityCount = notifications.filter(
    (item) => item.priority === "high",
  ).length;

  return (
    <main className="min-h-screen bg-gradient-to-b from-cyan-50 via-white to-emerald-50 px-5 py-6">
      <div className="mx-auto max-w-md space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="overflow-hidden rounded-full bg-white p-1 shadow-lg shadow-cyan-100">
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

            <p className="mt-1 text-xs font-semibold text-slate-500">
              Stay updated with your care activities
            </p>
          </div>

          <LanguageSwitcher />
        </header>

        <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-cyan-500 via-emerald-500 to-teal-500 p-5 text-white shadow-2xl shadow-emerald-100">
          <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/20 blur-2xl" />
          <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-white/15 blur-2xl" />

          <div className="relative z-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-white/80">
                  Notification Center
                </p>
                <h2 className="mt-2 text-3xl font-black leading-tight">
                  You have {unreadCount} new updates
                </h2>
              </div>

              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/20 text-3xl shadow-lg backdrop-blur">
                🔔
              </div>
            </div>

            <p className="mt-4 max-w-xs text-sm leading-6 text-white/90">
              Track booking, care notes, payment status, and important security
              alerts in one place.
            </p>

            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-white/20 p-3 backdrop-blur">
                <p className="text-xl font-black">{notifications.length}</p>
                <p className="text-[11px] font-semibold text-white/80">
                  Total
                </p>
              </div>

              <div className="rounded-2xl bg-white/20 p-3 backdrop-blur">
                <p className="text-xl font-black">{unreadCount}</p>
                <p className="text-[11px] font-semibold text-white/80">
                  Unread
                </p>
              </div>

              <div className="rounded-2xl bg-white/20 p-3 backdrop-blur">
                <p className="text-xl font-black">{highPriorityCount}</p>
                <p className="text-[11px] font-semibold text-white/80">
                  Urgent
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3">
          <div className="rounded-3xl border border-cyan-100 bg-white p-4 shadow-xl shadow-cyan-50">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-50 text-2xl">
              📅
            </div>
            <p className="mt-3 text-lg font-black text-slate-950">3</p>
            <p className="text-xs font-semibold text-slate-500">
              Upcoming care tasks
            </p>
          </div>

          <div className="rounded-3xl border border-emerald-100 bg-white p-4 shadow-xl shadow-emerald-50">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-50 text-2xl">
              ✅
            </div>
            <p className="mt-3 text-lg font-black text-slate-950">12</p>
            <p className="text-xs font-semibold text-slate-500">
              Completed updates
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black text-slate-950">
                Recent notifications
              </h3>
              <p className="text-xs font-semibold text-slate-500">
                Mock data for UI preview
              </p>
            </div>

            <button
              type="button"
              className="rounded-full bg-slate-950 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-slate-200 active:scale-95"
            >
              Mark all read
            </button>
          </div>

          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
            {filterTabs.map((tab) => {
              const isActive = activeTab === tab.value;

              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setActiveTab(tab.value)}
                  className={[
                    "whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition active:scale-95",
                    isActive
                      ? "bg-slate-950 text-white shadow-lg shadow-slate-200"
                      : "bg-white text-slate-500 ring-1 ring-slate-100",
                  ].join(" ")}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="space-y-3">
            {filteredNotifications.map((item) => (
              <article
                key={item.id}
                className={[
                  "relative overflow-hidden rounded-3xl border bg-white p-4 shadow-xl transition active:scale-[0.99]",
                  item.status === "unread"
                    ? "border-cyan-100 shadow-cyan-50"
                    : "border-slate-100 shadow-slate-50",
                ].join(" ")}
              >
                {item.status === "unread" && (
                  <div className="absolute right-4 top-4 h-2.5 w-2.5 rounded-full bg-cyan-500 shadow-lg shadow-cyan-200" />
                )}

                <div className="flex gap-4">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-slate-50 to-cyan-50 text-3xl ring-1 ring-slate-100">
                    {item.icon}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 pr-5">
                      <span
                        className={[
                          "rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide",
                          getTypeStyle(item.type),
                        ].join(" ")}
                      >
                        {item.type}
                      </span>

                      <span
                        className={[
                          "rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide ring-1",
                          getPriorityStyle(item.priority),
                        ].join(" ")}
                      >
                        {item.priority}
                      </span>
                    </div>

                    <h4 className="mt-2 text-base font-black text-slate-950">
                      {item.title}
                    </h4>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      {item.message}
                    </p>

                    <div className="mt-3 flex items-center justify-between gap-3">
                      <p className="text-xs font-bold text-slate-400">
                        {item.date} • {item.time}
                      </p>

                      <button
                        type="button"
                        className="rounded-full bg-slate-50 px-3 py-1.5 text-xs font-black text-slate-700 ring-1 ring-slate-100 active:scale-95"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-emerald-100 bg-white p-5 shadow-xl shadow-emerald-50">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-50 text-3xl">
              🌿
            </div>

            <div>
              <h3 className="text-base font-black text-slate-950">
                CareMate keeps your family updated
              </h3>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                Important updates about care, bookings, and safety will appear
                here automatically.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}