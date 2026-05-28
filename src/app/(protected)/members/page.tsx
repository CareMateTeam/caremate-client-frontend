"use client";

import Image from "next/image";
import Link from "next/link";
import LanguageSwitcher from "@/components/language-switcher";
import React, { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/libs/i18n/i18n-provider";
import { MAX_MEMBERS } from "@/constants/member";
import { GetRelativesData, RelativeMember } from "@/dto/register";
import { unwrapApiData } from "@/libs/user/map-user-profile";
import { calculateAge } from "@/libs/user/map-lib";

function getRelationshipLabel(value: string) {
  const map: Record<string, string> = {
    father: "พ่อ",
    mother: "แม่",
    grandfather: "ปู่ / ตา",
    grandmother: "ย่า / ยาย",
    sibling: "พี่น้อง",
    child: "ลูก",
    spouse: "คู่สมรส",
    other: "อื่น ๆ",
  };

  return map[value] ?? value;
}

function getInitials(member: RelativeMember) {
  const name = member.firstName || member.firstName || "?";
  return name.slice(0, 1);
}

function getGenderLabel(value?: string) {
  const map: Record<string, string> = {
    male: "ชาย",
    female: "หญิง",
    other: "อื่น ๆ",
  };

  if (!value) return "-";
  return map[value] ?? value;
}

function getDisplayName(member: RelativeMember) {

  return `${member.firstName} ${member.lastName }`.trim() || "-";
}

function getFirstName(member: RelativeMember) {

  return `${member.firstName}`.trim() || "-";
}

function getMemberNote(member: RelativeMember) {
  return member.careNote || "";
}

export default function MembersPage() {
  const { t } = useI18n();

  const [members, setMembers] = useState<RelativeMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchRelatives = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const res = await fetch("/api/relative", {
          method: "GET",
          cache: "no-store",
        });

        const json = await res.json().catch(() => null);

        if (!res.ok) {
          throw new Error(json?.message ?? "ไม่สามารถโหลดข้อมูลสมาชิกได้");
        }

        const data = unwrapApiData<GetRelativesData>(json);
        const relativesArray = data?.relatives ?? [];

        setMembers(relativesArray);
      } catch (error) {
        console.error("Fetch relatives error:", error);

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "ไม่สามารถโหลดข้อมูลสมาชิกได้",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRelatives();
  }, []);

  const activeMembers = useMemo(() => {
    return members
      .filter((member) => member.isActive)
      .sort((a, b) => a.seq - b.seq);
  }, [members]);

  const canAddMore = activeMembers.length < MAX_MEMBERS;

  const defaultMember = activeMembers.find((member) => member.isDefault);

  return (
    <main className="min-h-screen ">
      <section className="mx-auto max-w-md space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="overflow-hidden rounded-full bg-white p-1 shadow-lg">
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

        <section className="overflow-hidden rounded-xl border border-white bg-white/90 p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-lg font-bold text-cyan-600">สมาชิกที่ดูแล</p>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                เพิ่มข้อมูลญาติหรือผู้ที่ต้องการรับบริการดูแล
                สามารถเพิ่มได้สูงสุด {MAX_MEMBERS} คน
              </p>
            </div>

            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-cyan-100 text-2xl">
              👨‍👩‍👧
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-xl grid place-items-center bg-cyan-50 p-4">
              <p className="text-xs font-bold text-cyan-600">จำนวนสมาชิก</p>
              <p className="mt-1 text-2xl font-black text-cyan-800">
                {activeMembers.length}/{MAX_MEMBERS}
              </p>
            </div>

            <div className="rounded-xl grid place-items-center bg-emerald-50 p-4">
              <p className="text-xs font-bold text-emerald-600">ค่าเริ่มต้น</p>
              <p className="mt-1 truncate text-lg font-black text-emerald-800">
                {defaultMember ? getFirstName(defaultMember) : "ยังไม่มี"}
              </p>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-950">รายชื่อสมาชิก</h3>
            <p className="mt-1 text-xs text-slate-500">
              เลือกสมาชิกนี้ไปใช้ตอนสร้าง booking ได้ในขั้นถัดไป
            </p>
          </div>

          {activeMembers.length > 0 &&
            (canAddMore ? (
              <Link
                href="/members/create"
                className="rounded-xl bg-gradient-to-br border border-gray-400 from-emerald-500 to-blue-500 px-4 py-3 
                text-sm font-black text-white shadow-md shadow-gray-400 transition active:scale-[0.98]"
              >
                เพิ่ม
              </Link>
            ) : (
              <button
                type="button"
                disabled
                className="cursor-not-allowed rounded-2xl bg-slate-200 px-4 py-3 text-sm font-black text-slate-400"
              >
                เต็มแล้ว
              </button>
            ))}
        </section>

        {errorMessage && (
          <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
            {errorMessage}
          </p>
        )}

        {loading ? (
          <section className="space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-32 animate-pulse rounded-xl bg-white/80 shadow-sm"
              />
            ))}
          </section>
        ) : activeMembers.length === 0 ? (
          <section className="rounded-xl border-2 border-dashed border-cyan-200 bg-white/80 p-6 text-center ">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-cyan-50 text-3xl">
              🫶
            </div>

            <h3 className="mt-4 text-lg font-black text-slate-950">
              ยังไม่มีสมาชิก
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              เริ่มเพิ่มข้อมูลญาติหรือคนที่ต้องการดูแล เพื่อใช้ในการจองบริการ
            </p>

            <Link
              href="/members/create"
              className="mt-5 inline-flex h-12 items-center justify-center rounded-2xl bg-cyan-500 px-5 text-sm font-black text-white shadow-lg shadow-cyan-100"
            >
              เพิ่มสมาชิกคนแรก
            </Link>
          </section>
        ) : (
          <section className="space-y-3">
            {activeMembers.map((member) => {
              const note = getMemberNote(member);
              const displayName = getDisplayName(member);
              const relationshipLabel = getRelationshipLabel(
                member.relationship,
              );

              return (
                <Link
                  key={member.id}
                  href={`/members/${member.id}`}
                  className="block w-full text-inherit no-underline"
                >
                  <article className="group relative overflow-hidden rounded-xl border border-white bg-white p-4 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-100/70 active:scale-[0.99]">
                    <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-50 transition-all duration-300 group-hover:scale-125 group-hover:bg-cyan-100" />
                    <div className="absolute -bottom-12 -left-12 h-28 w-28 rounded-full bg-emerald-50/70" />

                    <div className="relative z-10">
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-gradient-to-br from-cyan-500 to-pink-200 text-2xl font-black text-white">
                            {getInitials(member)}
                          </div>

                          {member.isDefault && (
                            <div className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-emerald-500 text-xs font-black text-white shadow-sm">
                              ✓
                            </div>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0 w-full">
                              <div className="flex w-full items-center justify-between gap-2">
                                <h4 className="truncate text-lg font-black tracking-tight text-slate-950">
                                  {displayName}
                                </h4>

                                {member.isDefault && (
                                  <span className="shrink-0 rounded-full bg-emerald-100 px-4 py-1 text-xs font-black text-emerald-700 shadow-md animate-pulse">
                                    สมาชิกหลัก
                                  </span>
                                )}
                              </div>

                              <div className="mt-1 flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-700">
                                  {relationshipLabel}
                                </span>

                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
                                  ลำดับ #{member.seq}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <div className="rounded-2xl border flex items-center justify-start  border-slate-100 bg-slate-100 px-3 py-1.5">
                          <div className="flex items-center gap-4">
                            <div className="grid h-8 w-8 place-items-center rounded-xl bg-white text-sm shadow-sm">
                              🎂
                            </div>

                            <div className="min-w-0">
                              <p className="text-[10px] font-bold text-slate-400">
                                อายุ
                              </p>
                              <p className="mt-0.5 truncate text-xs font-black text-slate-800">
                                {calculateAge(member.dateOfBirth)} 
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-2xl border flex items-center justify-start border-slate-100 bg-slate-100 px-3 py-1.5">
                          <div className="flex items-center gap-4">
                            <div className="grid h-8 w-8 place-items-center rounded-xl bg-white text-sm shadow-sm">
                              👤
                            </div>

                            <div className="min-w-0">
                              <p className="text-[10px] font-bold text-slate-400">
                                เพศ
                              </p>
                              <p className="mt-0.5 truncate text-xs font-black text-slate-800">
                                {getGenderLabel(member.gender)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {note && (
                        <div className="mt-3 rounded-2xl border border-amber-100 bg-amber-50 p-3">
                          <div className="flex items-start gap-2">
                            <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white text-sm shadow-sm">
                              📝
                            </div>

                            <div className="min-w-0">
                              <p className="text-[10px] font-black text-amber-600">
                                หมายเหตุการดูแล
                              </p>
                              <p className="mt-1 line-clamp-2 text-xs leading-5 text-amber-700">
                                {note}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </article>
                </Link>
              );
            })}
          </section>
        )}

        {!canAddMore && (
          <p className="rounded-2xl bg-slate-100 px-4 py-3 text-center text-xs font-semibold text-slate-500">
            คุณเพิ่มสมาชิกครบ {MAX_MEMBERS} คนแล้ว
          </p>
        )}
      </section>
    </main>
  );
}
