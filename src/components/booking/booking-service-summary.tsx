"use client";

import type { BackendCareService } from "@/dto/service";
import { formatMoney } from "@/libs/general/currency-format";

type BookingServiceSummaryProps = {
  loadingService: boolean;
  serviceError: string;
  selectedService: BackendCareService | null;
};

export default function BookingServiceSummary({
  loadingService,
  serviceError,
  selectedService,
}: BookingServiceSummaryProps) {
  return (
    <section className="rounded-lg border border-white bg-white/90 p-3 shadow-sm">
      {loadingService ? (
        <div className="animate-pulse space-y-3">
          <div className="h-5 w-36 rounded-full bg-slate-100" />
          <div className="h-4 w-24 rounded-full bg-slate-100" />
          <div className="h-8 w-full rounded-full bg-slate-100" />
        </div>
      ) : serviceError ? (
        <p className="text-sm font-semibold text-red-500">{serviceError}</p>
      ) : selectedService ? (
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xl font-bold text-black">รายละเอียดการจอง</p>

            <div className="mt-2 flex items-start justify-between gap-3">
              <div>
                <h2 className="w-fit rounded-3xl bg-emerald-500 px-4 py-0.5 text-sm font-semibold text-white">
                  แพ็คเกจ : {selectedService.name_th}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  บริการดูแลที่ออกแบบมาเพื่อช่วยเหลือคุณในทุกช่วงวัย
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-cyan-100 px-3 py-2 text-right">
            <p className="text-[10px] font-semibold text-cyan-600">
              ราคาเริ่มต้น
            </p>

            <p className="text-base font-black text-cyan-700">
              {formatMoney(selectedService.base_fee)} ฿
            </p>
          </div>
        </div>
      ) : (
        <div>
          <p className="font-bold text-slate-900">ไม่พบข้อมูลบริการ</p>
          <p className="mt-1 text-sm text-slate-500">
            กรุณากลับไปเลือกบริการใหม่อีกครั้ง
          </p>
        </div>
      )}
    </section>
  );
}