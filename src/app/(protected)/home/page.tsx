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

const quickActions = [
  {
    title: "จองบริการดูแล",
    description: "เลือกบริการดูแลที่เหมาะกับคุณและครอบครัว",
    href: "/services",
    icon: "🩺",
    color: "from-cyan-500 to-emerald-500",
  },
  {
    title: "จัดการสมาชิก",
    description: "เพิ่มข้อมูลผู้รับการดูแลและคนในครอบครัว",
    href: "/members",
    icon: "👨‍👩‍👧",
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "ตั้งค่าที่อยู่",
    description: "กำหนดตำแหน่งสำหรับให้ผู้ดูแลเดินทางไปบริการ",
    href: "/profile/addresses",
    icon: "📍",
    color: "from-sky-500 to-cyan-500",
  },
  {
    title: "แจ้งเตือน",
    description: "ติดตามข่าวสารและการแจ้งเตือนสำคัญ",
    href: "/notifications",
    icon: "🔔",
    color: "from-violet-500 to-cyan-500",
  },
];

const careHighlights = [
  {
    icon: "💚",
    title: "ดูแลด้วยความเข้าใจ",
    description:
      "CareMate ช่วยให้การดูแลคนสำคัญเป็นเรื่องง่ายขึ้น ตั้งแต่ข้อมูลสุขภาพ ที่อยู่ ไปจนถึงการประสานงานกับผู้ดูแล",
  },
  {
    icon: "🏠",
    title: "บริการถึงบ้าน",
    description:
      "เหมาะสำหรับผู้สูงอายุ ผู้ป่วย หรือสมาชิกในครอบครัวที่ต้องการความช่วยเหลือในชีวิตประจำวัน",
  },
  {
    icon: "📝",
    title: "ข้อมูลครบในที่เดียว",
    description:
      "จัดเก็บข้อมูลผู้รับการดูแล เช่น โรคประจำตัว ยาที่ใช้ ภูมิแพ้ และผู้ติดต่อฉุกเฉิน เพื่อให้บริการได้ปลอดภัยมากขึ้น",
  },
];

const healthTips = [
  "เช็กข้อมูลสุขภาพของสมาชิกให้ครบก่อนทำการจองบริการ",
  "ตั้งค่าที่อยู่และตำแหน่งแผนที่ให้ถูกต้อง เพื่อให้ผู้ดูแลเดินทางได้สะดวก",
  "เพิ่มผู้ติดต่อฉุกเฉินไว้เสมอ เพื่อความปลอดภัยของผู้รับการดูแล",
];

const careSteps = [
  {
    step: "01",
    title: "เพิ่มข้อมูลผู้รับการดูแล",
    description: "กรอกข้อมูลส่วนตัว สุขภาพ ที่อยู่ และเบอร์ติดต่อฉุกเฉิน",
  },
  {
    step: "02",
    title: "เลือกบริการที่ต้องการ",
    description: "เลือกประเภทบริการดูแลที่เหมาะกับสถานการณ์ของครอบครัว",
  },
  {
    step: "03",
    title: "ยืนยันวัน เวลา และสถานที่",
    description: "ตรวจสอบรายละเอียดก่อนส่งคำขอรับบริการ",
  },
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

  return (
    <div className="z-10 space-y-6">
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

            <p className="mt-3 text-xs font-black text-cyan-600">กดเลย</p>
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
              About CareMate
            </p>

            <h2 className="mt-1 text-xl font-black text-slate-950">
              บ้านที่ดูแลกันได้ดีขึ้น เริ่มจากข้อมูลที่พร้อม
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              CareMate ถูกออกแบบมาเพื่อช่วยให้ครอบครัวจัดการการดูแลได้ง่ายขึ้น
              โดยเชื่อมข้อมูลผู้รับการดูแล ที่อยู่ สุขภาพ และบริการไว้ในที่เดียว
              เพื่อให้การดูแลมีความต่อเนื่องและปลอดภัย
            </p>
          </div>
        </div>
      </section>

      <section className="mt-4">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-600">
              Care Features
            </p>
            <h2 className="text-lg font-black text-slate-950">
              CareMate ช่วยอะไรได้บ้าง
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
            How it works
          </p>
          <h2 className="mt-1 text-xl font-black text-slate-950">
            เริ่มใช้งานง่ายใน 3 ขั้นตอน
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
              เคล็ดลับก่อนเริ่มจองบริการ
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
              Ready to care
            </p>

            <h2 className="mt-2 text-2xl font-black leading-tight">
              เตรียมข้อมูลให้พร้อม
              <br />
              แล้วเริ่มดูแลได้ทันที
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/70">
              เพิ่มสมาชิก ตั้งค่าที่อยู่ และเลือกบริการที่เหมาะกับครอบครัวของคุณ
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
            จัดการสมาชิก
          </Link>

          <Link
            href="/services"
            className="rounded-2xl bg-cyan-500 px-4 py-3 text-center text-sm font-black text-white active:scale-[0.98]"
          >
            ดูบริการ
          </Link>
        </div>
      </section>

      <div className="h-6" />
    </div>
  );
}
