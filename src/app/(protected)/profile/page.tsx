"use client";

import PdpaPolicyPopup from "@/components/card/pdpa-policy-popup";
import { TopUserInformation } from "@/components/card/user-information";
import { TopUserInformationSkeleton } from "@/components/card/user-skelton";
import { InfoRow } from "@/components/format/info-rows";
import { menuItems } from "@/constants/profile";
import { UserInformation, UserProfileResponse } from "@/dto/user";
import {
  mapUserProfileToTopInformation,
  unwrapApiData,
} from "@/libs/user/map-user-profile";
import Link from "next/link";
import { useEffect, useState } from "react";

// const profileStats = [
//   {
//     label: "การจองทั้งหมด",
//     value: "12",
//   },
//   {
//     label: "กำลังดำเนินการ",
//     value: "2",
//   },
//   {
//     label: "คะแนนรีวิว",
//     value: "4.9",
//   },
// ];

export default function ProfilePage() {
  const [currentUser, setCurrentUser] = useState<UserProfileResponse | null>(
    null,
  );
  const [userCardInfo, setUserCardInfo] = useState<UserInformation | null>(
    null,
  );
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

        setCurrentUser(profile);
        setUserCardInfo(mapUserProfileToTopInformation(profile));
      } catch (error) {
        console.error("Fetch user profile error:", error);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchMe();
  }, []);
  return (
    <div className="mx-auto max-w-md space-y-5">
      {loadingUser ? (
        <TopUserInformationSkeleton />
      ) : userCardInfo ? (
        <TopUserInformation user={userCardInfo} />
      ) : null}

      <section className="rounded-lg border border-white/80 bg-white/85 p-5 shadow-sm">
        <h2 className="text-lg font-bold text-slate-950">ข้อมูลบัญชี</h2>

        <div className="mt-4 space-y-3">
          <InfoRow
            label="อีเมล"
            value={currentUser?.information?.email ?? ""}
          />
          <InfoRow label="เบอร์โทร" value={currentUser?.phone ?? ""} />
          <InfoRow
            label="กรุ๊ปเลือด"
            value={currentUser?.information?.bloodType ?? "ยังไม่ระบุ"}
          />
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-950">เมนูของฉัน</h2>
          <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700">
            เลือกเพื่อแก้ไขข้อมูลส่วนตัว
          </span>
        </div>

        <div className="space-y-3">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="block w-full rounded-lg border border-white/80 bg-white/85 p-4 text-left shadow-sm transition hover:border-cyan-200 hover:bg-white active:scale-[0.99]"
            >
              <div className="flex items-center gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-cyan-100 text-2xl">
                  {item.icon}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-slate-950">{item.title}</h3>
                  <p className="mt-1 text-sm leading-5 text-slate-500">
                    {item.description}
                  </p>
                </div>

                <span className="text-xl text-slate-500">›</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <PdpaPolicyPopup />
      {/* <button
        type="button"
        className="h-12 w-full rounded-2xl border border-red-100 bg-red-50 text-sm font-bold text-red-600 transition hover:bg-red-100 active:scale-[0.99]"
      >
        ออกจากระบบ
      </button> */}
    </div>
  );
}
