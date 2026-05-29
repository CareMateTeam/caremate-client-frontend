"use client";

import type { BackendCareService } from "@/dto/service";
import { formatMoney } from "@/libs/general/currency-format";
import {
  SummaryRowDark,
  SummaryRowLight,
} from "@/components/format/summary-row";
import type { BookingMemberOption } from "./booking-care-target-step";
import { BookingCareTargetDetail } from "@/dto/booking";

type BookingPaymentStepProps = {
  selectedService: BackendCareService | null;
  date: string;
  selectedTimeLabel: string;
  selectedCareTarget: BookingMemberOption | null;
  selectedCareTargetDetail: BookingCareTargetDetail | null;
  paymentMethod: string;
  serviceFee: number;
  platformFee: number;
  totalPrice: number;
  onPaymentMethodChange: (value: string) => void;
};

function valueOrDash(value?: string | number | null) {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  return String(value);
}

function buildFullName(detail: BookingCareTargetDetail | null) {
  if (!detail) return "-";

  if (detail.fullName) {
    return detail.fullName;
  }

  const name = [detail.firstName, detail.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  return name || "-";
}

function buildAddress(detail: BookingCareTargetDetail | null) {
  if (!detail) return "-";

  const address = [
    detail.addressLine,
    detail.subdistrict,
    detail.district,
    detail.province,
    detail.postalCode,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  return address || "-";
}

function formatGender(value?: string | null) {
  switch (value) {
    case "male":
      return "ชาย";
    case "female":
      return "หญิง";
    case "other":
      return "อื่น ๆ";
    default:
      return valueOrDash(value);
  }
}

function formatRelationship(value?: string | null) {
  switch (value) {
    case "self":
      return "ตัวฉันเอง";
    case "father":
      return "พ่อ";
    case "mother":
      return "แม่";
    case "grandfather":
      return "ปู่ / ตา";
    case "grandmother":
      return "ย่า / ยาย";
    case "sibling":
      return "พี่น้อง";
    case "child":
      return "ลูก";
    case "spouse":
      return "คู่สมรส";
    case "other":
      return "อื่น ๆ";
    default:
      return valueOrDash(value);
  }
}

function formatDate(value?: string | null) {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  return (
    <div className="rounded-xl bg-slate-100 px-4 py-2">
      <p className="text-[11px] font-bold text-slate-400">{label}</p>
      <p className="mt-1 break-words text-sm font-black text-slate-800">
        {valueOrDash(value)}
      </p>
    </div>
  );
}

function SectionTitle({
  icon,
  title,
  subtitle,
}: {
  icon: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-50 text-xl">
        {icon}
      </div>

      <div>
        <h3 className="text-sm font-black text-slate-950">{title}</h3>
        {subtitle && (
          <p className="mt-0.5 text-xs font-semibold text-slate-400">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

export default function BookingPaymentStep({
  selectedService,
  date,
  selectedTimeLabel,
  selectedCareTarget,
  selectedCareTargetDetail,
  paymentMethod,
  serviceFee,
  platformFee,
  totalPrice,
  onPaymentMethodChange,
}: BookingPaymentStepProps) {
  const detailName = buildFullName(selectedCareTargetDetail);
  const address = buildAddress(selectedCareTargetDetail);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-black text-slate-950">
          ตรวจสอบและชำระเงิน
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          ตรวจสอบรายละเอียดผู้รับการดูแลและข้อมูลการจองก่อนยืนยัน
        </p>
      </div>

      <section className="rounded-xl bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 p-5 text-white shadow-xl shadow-slate-200">
        <div className="space-y-3">
          <SummaryRowDark
            label="บริการ"
            value={selectedService?.name_th ?? "-"}
          />

          <SummaryRowDark label="วันที่" value={date || "-"} />

          <SummaryRowDark label="เวลา" value={selectedTimeLabel} />

          <SummaryRowDark
            label="ผู้รับการดูแล"
            value={
              selectedCareTargetDetail
                ? detailName
                : (selectedCareTarget?.name ?? "-")
            }
          />

          <SummaryRowDark
            label="ประเภท"
            value={
              selectedCareTarget?.type === "self"
                ? "ดูแลตัวเราเอง"
                : (selectedCareTarget?.subtitle ?? "-")
            }
          />
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl shadow-cyan-50">
        {/* <div className="bg-gradient-to-r from-cyan-50 to-emerald-50 p-5">
          <div className="flex items-start gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-600">
                Care Receiver
              </p>
              <h3 className="mt-1 truncate text-2xl font-black text-slate-950">
                {selectedCareTargetDetail
                  ? detailName
                  : (selectedCareTarget?.name ?? "-")}
              </h3>

              <div className="mt-2 flex flex-wrap gap-2">
                <span className="rounded-full bg-cyan-500 px-3 py-1 text-[11px] font-black text-white">
                  {selectedCareTarget?.type === "self" ? "ตัวฉันเอง" : "Member"}
                </span>

                <span className="rounded-full bg-white px-3 py-1 text-[11px] font-black text-slate-600 shadow-sm">
                  {selectedCareTargetDetail?.type === "self"
                    ? "Self care"
                    : formatRelationship(
                        selectedCareTargetDetail?.relationship,
                      )}
                </span>
              </div>
            </div>
          </div>
        </div> */}

        <div className="space-y-5 p-5">
          <div className="space-y-3">
            <SectionTitle
              icon="👤"
              title="ข้อมูลส่วนตัว"
              subtitle="ข้อมูลหลักของผู้รับการดูแล"
            />

            <div className="grid grid-cols-2 gap-3">
              <InfoRow
                label="ชื่อ"
                value={selectedCareTargetDetail?.firstName}
              />
              <InfoRow
                label="นามสกุล"
                value={selectedCareTargetDetail?.lastName}
              />
            </div>
            <div className="space-y-3">
              <InfoRow
                label="ชื่อเล่น"
                value={selectedCareTargetDetail?.nickname}
              />
              <InfoRow
                label="เพศ"
                value={formatGender(selectedCareTargetDetail?.gender)}
              />
              <InfoRow
                label="วันเกิด"
                value={formatDate(selectedCareTargetDetail?.dateOfBirth)}
              />
              <InfoRow
                label="ความสัมพันธ์"
                value={
                  selectedCareTargetDetail?.type === "self"
                    ? "ตัวฉันเอง"
                    : formatRelationship(selectedCareTargetDetail?.relationship)
                }
              />
            </div>
          </div>

          <hr className="my-5 border-t border-slate-300" />

          <div className="space-y-3">
            <SectionTitle
              icon="☎️"
              title="ข้อมูลติดต่อ"
              subtitle="ใช้สำหรับประสานงานก่อนเข้ารับบริการ"
            />

            <div className="grid grid-cols-1 gap-3">
              <InfoRow
                label="เบอร์โทร"
                value={selectedCareTargetDetail?.phone}
              />
              <InfoRow label="อีเมล" value={selectedCareTargetDetail?.email} />
            </div>
          </div>

          <hr className="my-5 border-t border-slate-300" />

          <div className="space-y-3">
            <SectionTitle
              icon="📍"
              title="ที่อยู่และตำแหน่ง"
              subtitle="ใช้สำหรับเดินทางไปให้บริการ"
            />

            <div className="rounded-lg bg-sky-100 px-4 py-6">
              <p className="text-[12px] font-bold text-gray-800">
                ที่อยู่สำหรับเข้ารับบริการ
              </p>
              <p className="mt-2 text-xs font-semibold leading-6 text-slate-600">
                {address}
              </p>
            </div>
          </div>

          <hr className="my-5 border-t border-slate-300" />

          <div className="space-y-3">
            <SectionTitle
              icon="🚨"
              title="ผู้ติดต่อฉุกเฉิน"
              subtitle="ข้อมูลสำคัญกรณีเกิดเหตุจำเป็น"
            />

            <div className="grid grid-cols-1 gap-3">
              <InfoRow
                label="ชื่อผู้ติดต่อฉุกเฉิน"
                value={selectedCareTargetDetail?.emergencyContactName}
              />
              <InfoRow
                label="เบอร์โทรฉุกเฉิน"
                value={selectedCareTargetDetail?.emergencyContactPhone}
              />
              <InfoRow
                label="ความสัมพันธ์"
                value={selectedCareTargetDetail?.emergencyContactRelationship}
              />
            </div>
          </div>

          <hr className="my-5 border-t border-slate-300" />

          <div className="space-y-3">
            <SectionTitle
              icon="🩺"
              title="ข้อมูลสุขภาพ"
              subtitle="ช่วยให้ผู้ดูแลเตรียมตัวได้ถูกต้อง"
            />

            <div className="grid grid-cols-1 gap-3">
              <InfoRow
                label="กรุ๊ปเลือด"
                value={selectedCareTargetDetail?.bloodType}
              />
              <InfoRow
                label="ประวัติแพ้ยา / แพ้อาหาร"
                value={selectedCareTargetDetail?.allergies}
              />
              <InfoRow
                label="โรคประจำตัว"
                value={selectedCareTargetDetail?.congenitalDiseases}
              />
              <InfoRow
                label="ยาที่ใช้อยู่ปัจจุบัน"
                value={selectedCareTargetDetail?.currentMedications}
              />
              <InfoRow
                label="หมายเหตุการดูแล"
                value={selectedCareTargetDetail?.careNote}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-100 bg-white p-5 shadow-md">
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
                  "rounded-xl border px-4 py-2 text-sm font-black transition active:scale-[0.98]",
                  active
                    ? "border-cyan-400 bg-cyan-50 text-cyan-700 shadow-md shadow-sky-200"
                    : "border-slate-200 bg-white text-slate-600",
                ].join(" ")}
              >
                {method.label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="rounded-xl border border-slate-100 bg-white p-5 shadow-md">
        <div className="space-y-3">
          <SummaryRowLight
            label="ค่าบริการ"
            value={`${formatMoney(serviceFee)} ฿`}
          />

          <SummaryRowLight
            label="ค่าธรรมเนียมแพลตฟอร์ม"
            value={`${formatMoney(platformFee)} ฿`}
          />

          <div className="border-t  border-dashed border-slate-400 pt-3">
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
