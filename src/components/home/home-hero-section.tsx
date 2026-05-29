"use client";

import Link from "next/link";

export default function HomeHeroSection() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-500 via-emerald-500 to-teal-500 p-5 text-white shadow-2xl shadow-emerald-100">
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
      <div className="absolute -bottom-16 -left-14 h-44 w-44 rounded-full bg-white/15 blur-2xl" />

      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/30 px-3 py-1 text-xs font-bold text-white backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-white" />
          Digital Care Companion
        </div>

        <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight">
          ดูแลคนสำคัญ
          <br />
          ให้ง่ายและปลอดภัยขึ้น
        </h2>

        <p className="mt-3 max-w-xs text-sm leading-6 text-white/90">
          จัดการข้อมูลสุขภาพ สมาชิกในครอบครัว ที่อยู่
          และการขอรับบริการดูแลได้ครบในแอปเดียว
        </p>

        <div className="mt-5 flex gap-3">
          <Link
            href="/booking"
            className="rounded-xl bg-white px-4 py-2 text-sm font-black text-cyan-700 shadow-lg shadow-cyan-700/10 active:scale-[0.98]"
          >
            เริ่มจองบริการ
          </Link>

          <Link
            href="/members"
            className="rounded-xl bg-white/20 px-4 py-2 text-sm font-black text-white
             border border-white/30 backdrop-blur active:scale-[0.98]"
          >
            เพิ่มสมาชิก
          </Link>
        </div>
      </div>

      <div className="relative z-10 mt-6 grid grid-cols-3 gap-3">
        <div className="rounded-2xl bg-white/30 grid place-items-center p-3 backdrop-blur">
          <p className="text-2xl font-black">24/7</p>
          <p className="mt-1 text-[10px] font-semibold text-white">
            Care support
          </p>
        </div>

        <div className="rounded-2xl bg-white/30 grid place-items-center p-3 backdrop-blur">
          <p className="text-2xl font-black">1</p>
          <p className="mt-1 text-[10px] font-semibold text-white">
            Family hub
          </p>
        </div>

        <div className="rounded-2xl bg-white/30 grid place-items-center p-3 backdrop-blur">
          <p className="text-2xl font-black">Safe</p>
          <p className="mt-1 text-[10px] font-semibold text-white">
            Health data
          </p>
        </div>
      </div>
    </section>
  );
}