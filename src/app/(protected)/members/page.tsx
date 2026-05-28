"use client";

import Image from "next/image";
import Link from "next/link";
import LanguageSwitcher from "@/components/language-switcher";
import React, { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/libs/i18n/i18n-provider";
import { MAX_MEMBERS } from "@/constants/member";
import { GetRelativesData, RelativeMember } from "@/dto/register";
import { unwrapApiData } from "@/libs/user/map-user-profile";

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

function getDisplayName(member: RelativeMember) {
  if (member.firstName) return member.firstName;

  return `${member.firstName ?? ""} ${member.lastName ?? ""}`.trim() || "-";
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
                {defaultMember ? getDisplayName(defaultMember) : "ยังไม่มี"}
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
                className="rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-black text-white shadow-lg shadow-cyan-100 transition active:scale-[0.98]"
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

              return (
                <article
                  key={member.id}
                  className="rounded-xl border border-white bg-white/90 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex gap-4">
                    <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-gradient-to-br from-cyan-100 to-sky-100 text-2xl font-black text-cyan-700">
                      {getInitials(member)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="truncate text-base font-black text-slate-950">
                              {getDisplayName(member)}
                            </h4>

                            {member.isDefault && (
                              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-black text-emerald-700">
                                หลัก
                              </span>
                            )}
                          </div>

                          <p className="mt-1 text-sm font-semibold text-cyan-700">
                            {getRelationshipLabel(member.relationship)}
                          </p>
                        </div>

                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
                          #{member.seq}
                        </span>
                      </div>

                      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                        <div className="rounded-2xl bg-slate-50 px-3 py-2">
                          <p className="font-bold text-slate-400">เบอร์โทร</p>
                          <p className="mt-1 truncate font-black text-slate-700">
                            {member.phone || "-"}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-slate-50 px-3 py-2">
                          <p className="font-bold text-slate-400">เพศ</p>
                          <p className="mt-1 truncate font-black text-slate-700">
                            {member.gender || "-"}
                          </p>
                        </div>
                      </div>

                      {member.addressLine && (
                        <p className="mt-3 line-clamp-2 rounded-2xl bg-slate-50 px-3 py-2 text-xs leading-5 text-slate-600">
                          {member.addressLine}
                        </p>
                      )}

                      {note && (
                        <p className="mt-3 line-clamp-2 rounded-2xl bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-700">
                          {note}
                        </p>
                      )}
                    </div>
                  </div>
                </article>
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
