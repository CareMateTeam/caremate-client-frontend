"use client";

import type { BookingMemberOption } from "./booking-care-target-step";

type BookingAddressStepProps = {
  address: string;
  selectedCareTarget: BookingMemberOption | null;
  onEditAddress: () => void;
};

export default function BookingAddressStep({
  address,
  selectedCareTarget,
  onEditAddress,
}: BookingAddressStepProps) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-black text-slate-950">
          สถานที่รับบริการ
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          ระบบจะใช้ที่อยู่ของผู้รับการดูแลที่เลือกไว้
        </p>
      </div>

      <div className="rounded-3xl border border-cyan-100 bg-cyan-50 p-4">
        <p className="text-xs font-bold text-cyan-700">ผู้รับการดูแล</p>

        <p className="mt-1 text-lg font-black text-slate-950">
          {selectedCareTarget?.name ?? "-"}
        </p>

        <p className="mt-1 text-sm font-semibold text-slate-500">
          {selectedCareTarget?.type === "self"
            ? "ตัวฉันเอง"
            : selectedCareTarget?.subtitle}
        </p>
      </div>

      <div className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-50 text-xl">
            📍
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-black text-slate-950">
              ที่อยู่สำหรับเข้ารับบริการ
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {address || "มีตำแหน่งแล้ว แต่ยังไม่มีรายละเอียดที่อยู่"}
            </p>

            <div className="mt-3 rounded-2xl bg-slate-50 px-4 py-3">
              <p className="text-xs font-bold text-slate-500">
                Latitude: {selectedCareTarget?.latitude ?? "-"}
              </p>
              <p className="mt-1 text-xs font-bold text-slate-500">
                Longitude: {selectedCareTarget?.longitude ?? "-"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onEditAddress}
        className="h-12 w-full rounded-2xl border border-cyan-200 bg-cyan-50 text-sm font-black text-cyan-700 active:scale-[0.98]"
      >
        แก้ไขที่อยู่
      </button>
    </div>
  );
}