"use client";

import type { BackendCareService } from "@/dto/service";
import { formatMoney } from "@/libs/general/currency-format";
import {
  SummaryRowDark,
  SummaryRowLight,
} from "@/components/format/summary-row";
import type { BookingMemberOption } from "./booking-care-target-step";

type BookingPaymentStepProps = {
  selectedService: BackendCareService | null;
  date: string;
  selectedTimeLabel: string;
  selectedCareTarget: BookingMemberOption | null;
  paymentMethod: string;
  serviceFee: number;
  platformFee: number;
  totalPrice: number;
  onPaymentMethodChange: (value: string) => void;
};

export default function BookingPaymentStep({
  selectedService,
  date,
  selectedTimeLabel,
  selectedCareTarget,
  paymentMethod,
  serviceFee,
  platformFee,
  totalPrice,
  onPaymentMethodChange,
}: BookingPaymentStepProps) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-black text-slate-950">
          ตรวจสอบและชำระเงิน
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          ตรวจสอบรายละเอียดก่อนยืนยันการจอง
        </p>
      </div>

      <section className="rounded-3xl bg-slate-950 p-5 text-white">
        <div className="space-y-3">
          <SummaryRowDark label="บริการ" value={selectedService?.name_th ?? "-"} />

          <SummaryRowDark label="วันที่" value={date || "-"} />

          <SummaryRowDark label="เวลา" value={selectedTimeLabel} />

          <SummaryRowDark
            label="ผู้รับการดูแล"
            value={selectedCareTarget?.name ?? "-"}
          />

          <SummaryRowDark
            label="ประเภท"
            value={
              selectedCareTarget?.type === "self"
                ? "ดูแลตัวเราเอง"
                : selectedCareTarget?.subtitle ?? "-"
            }
          />
        </div>
      </section>

      <section className="rounded-3xl border border-slate-100 bg-white p-5">
        <p className="mb-4 text-sm font-black text-slate-950">วิธีชำระเงิน</p>

        <div className="grid grid-cols-2 gap-3">
          {[
            {
              value: "promptpay",
              label: "PromptPay",
            },
            {
              value: "cash",
              label: "เงินสด",
            },
          ].map((method) => {
            const active = paymentMethod === method.value;

            return (
              <button
                key={method.value}
                type="button"
                onClick={() => onPaymentMethodChange(method.value)}
                className={[
                  "rounded-2xl border px-4 py-3 text-sm font-black transition active:scale-[0.98]",
                  active
                    ? "border-cyan-400 bg-cyan-50 text-cyan-700 ring-4 ring-cyan-100"
                    : "border-slate-200 bg-white text-slate-600",
                ].join(" ")}
              >
                {method.label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-100 bg-white p-5">
        <div className="space-y-3">
          <SummaryRowLight
            label="ค่าบริการ"
            value={`${formatMoney(serviceFee)} ฿`}
          />

          <SummaryRowLight
            label="ค่าธรรมเนียมแพลตฟอร์ม"
            value={`${formatMoney(platformFee)} ฿`}
          />

          <div className="border-t border-dashed border-slate-200 pt-3">
            <SummaryRowLight
              label="ยอดรวม"
              value={`${formatMoney(totalPrice)} ฿`}
            />
          </div>
        </div>
      </section>
    </div>
  );
}