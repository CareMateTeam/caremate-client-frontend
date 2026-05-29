"use client";

import { UserRound, UsersRound } from "lucide-react";

export type BookingMemberOption = {
  id: string;
  type: "self" | "relative";
  name: string;
  subtitle: string;
  phone?: string;
  relationship?: string;
  latitude?: number | null;
  longitude?: number | null;
  addressText?: string;
};

type BookingCareTargetStepProps = {
  loadingMembers: boolean;
  memberError: string;
  memberOptions: BookingMemberOption[];
  selectedCareTargetId: string;
  onSelectCareTarget: (id: string) => void;
};

export default function BookingCareTargetStep({
  loadingMembers,
  memberError,
  memberOptions,
  selectedCareTargetId,
  onSelectCareTarget,
}: BookingCareTargetStepProps) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-black text-slate-950">
          ต้องการให้ดูแลใคร?
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          เลือกได้ว่าจะให้ดูแลตัวคุณเอง หรือสมาชิกที่เพิ่มไว้ใน Relative
        </p>
      </div>

      {loadingMembers ? (
        <div className="space-y-3">
          <div className="h-20 animate-pulse rounded-3xl bg-slate-100" />
          <div className="h-20 animate-pulse rounded-3xl bg-slate-100" />
        </div>
      ) : (
        <div className="space-y-3">
          {memberError && (
            <p className="rounded-2xl bg-amber-50 px-4 py-3 text-xs font-bold text-amber-700">
              {memberError}
            </p>
          )}

          {memberOptions.map((member) => {
            const active = selectedCareTargetId === member.id;

            return (
              <button
                key={member.id}
                type="button"
                onClick={() => onSelectCareTarget(member.id)}
                className={[
                  "w-full rounded-3xl border p-4 text-left transition active:scale-[0.99]",
                  active
                    ? "border-cyan-400 bg-cyan-50 ring-4 ring-cyan-100"
                    : "border-slate-200 bg-white",
                ].join(" ")}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={[
                      "grid h-14 w-14 place-items-center rounded-2xl",
                      member.type === "self"
                        ? "bg-cyan-100 text-cyan-700"
                        : "bg-emerald-100 text-emerald-700",
                    ].join(" ")}
                  >
                    {member.type === "self" ? (
                      <UserRound className="h-7 w-7" />
                    ) : (
                      <UsersRound className="h-7 w-7" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="truncate text-base font-black text-slate-950">
                        {member.name}
                      </p>

                      {active && (
                        <span className="rounded-full bg-cyan-500 px-3 py-1 text-[10px] font-black text-white">
                          เลือกแล้ว
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-sm font-semibold text-slate-500">
                      {member.subtitle}
                    </p>

                    {member.phone && (
                      <p className="mt-1 text-xs font-semibold text-slate-400">
                        โทร {member.phone}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}