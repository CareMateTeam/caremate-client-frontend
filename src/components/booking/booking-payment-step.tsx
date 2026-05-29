"use client";

import type { BackendCareService } from "@/dto/service";
import { formatMoney } from "@/libs/general/currency-format";
import { useI18n } from "@/libs/i18n/i18n-provider";
import type { Dictionary } from "@/libs/i18n/dictionaries/en";
import {
  SummaryRowDark,
  SummaryRowLight,
} from "@/components/format/summary-row";
import type { BookingMemberOption } from "./booking-care-target-step";
import { BookingCareTargetDetail } from "@/dto/booking";
import { formatDuration } from "@/libs/general/date";
import { InfoRow } from "../format/info-rows";
import { valueOrDash } from "@/libs/general/string-handler";

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

  baseFeePerHour: number;
  bookingDurationMinutes: number;
  billableMinutes: number;
  billableHours: number;

  onPaymentMethodChange: (value: string) => void;
};


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

function formatGender(value: string | null | undefined, t: Dictionary) {
  switch (value) {
    case "male":
      return t.gender.male;
    case "female":
      return t.gender.female;
    case "other":
      return t.gender.other;
    default:
      return valueOrDash(value);
  }
}

function formatRelationship(value: string | null | undefined, t: Dictionary) {
  switch (value) {
    case "self":
      return t.relationship.self;
    case "father":
      return t.relationship.father;
    case "mother":
      return t.relationship.mother;
    case "grandfather":
      return t.relationship.grandfather;
    case "grandmother":
      return t.relationship.grandmother;
    case "sibling":
      return t.relationship.sibling;
    case "child":
      return t.relationship.child;
    case "spouse":
      return t.relationship.spouse;
    case "relative":
      return t.relationship.relative;
    case "other":
      return t.relationship.other;
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
  baseFeePerHour,
  bookingDurationMinutes,
  billableMinutes,
  billableHours,
  onPaymentMethodChange,
}: BookingPaymentStepProps) {
  const { t } = useI18n();
  const p = t.booking.payment;
  const detailName = buildFullName(selectedCareTargetDetail);
  const address = buildAddress(selectedCareTargetDetail);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-black text-slate-950">
          {p.title}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          {p.description}
        </p>
      </div>

      <section className="rounded-xl bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 p-5 text-white shadow-xl shadow-slate-200">
        <div className="space-y-3">
          <SummaryRowDark
            label={p.summaryService}
            value={selectedService?.name_th ?? "-"}
          />

          <SummaryRowDark label={p.summaryDate} value={date || "-"} />

          <SummaryRowDark label={p.summaryTime} value={selectedTimeLabel} />

          <SummaryRowDark
            label={p.summaryCareReceiver}
            value={
              selectedCareTargetDetail
                ? detailName
                : (selectedCareTarget?.name ?? "-")
            }
          />

          <SummaryRowDark
            label={p.summaryType}
            value={
              selectedCareTarget?.type === "self"
                ? p.typeSelf
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
              title={p.personalTitle}
              subtitle={p.personalSubtitle}
            />

            <div className="grid grid-cols-2 gap-3">
              <InfoRow
                label={p.labelFirstName}
                value={selectedCareTargetDetail?.firstName}
              />
              <InfoRow
                label={p.labelLastName}
                value={selectedCareTargetDetail?.lastName}
              />
            </div>
            <div className="space-y-3">
              <InfoRow
                label={p.labelNickname}
                value={selectedCareTargetDetail?.nickname}
              />
              <InfoRow
                label={p.labelGender}
                value={formatGender(selectedCareTargetDetail?.gender, t)}
              />
              <InfoRow
                label={p.labelDob}
                value={formatDate(selectedCareTargetDetail?.dateOfBirth)}
              />
              <InfoRow
                label={p.labelRelationship}
                value={
                  selectedCareTargetDetail?.type === "self"
                    ? t.relationship.self
                    : formatRelationship(selectedCareTargetDetail?.relationship, t)
                }
              />
            </div>
          </div>

          <hr className="my-5 border-t border-slate-300" />

          <div className="space-y-3">
            <SectionTitle
              icon="☎️"
              title={p.contactTitle}
              subtitle={p.contactSubtitle}
            />

            <div className="grid grid-cols-1 gap-3">
              <InfoRow
                label={p.labelPhone}
                value={selectedCareTargetDetail?.phone}
              />
              <InfoRow label={p.labelEmail} value={selectedCareTargetDetail?.email} />
            </div>
          </div>

          <hr className="my-5 border-t border-slate-300" />

          <div className="space-y-3">
            <SectionTitle
              icon="📍"
              title={p.addressTitle}
              subtitle={p.addressSubtitle}
            />

            <div className="rounded-lg bg-sky-100 px-4 py-6">
              <p className="text-[12px] font-bold text-gray-800">
                {p.addressInBox}
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
              title={p.emergencyTitle}
              subtitle={p.emergencySubtitle}
            />

            <div className="grid grid-cols-1 gap-3">
              <InfoRow
                label={p.labelEmergencyName}
                value={selectedCareTargetDetail?.emergencyContactName}
              />
              <InfoRow
                label={p.labelEmergencyPhone}
                value={selectedCareTargetDetail?.emergencyContactPhone}
              />
              <InfoRow
                label={p.labelEmergencyRelationship}
                value={selectedCareTargetDetail?.emergencyContactRelationship}
              />
            </div>
          </div>

          <hr className="my-5 border-t border-slate-300" />

          <div className="space-y-3">
            <SectionTitle
              icon="🩺"
              title={p.healthTitle}
              subtitle={p.healthSubtitle}
            />

            <div className="grid grid-cols-1 gap-3">
              <InfoRow
                label={p.labelBloodType}
                value={selectedCareTargetDetail?.bloodType}
              />
              <InfoRow
                label={p.labelAllergies}
                value={selectedCareTargetDetail?.allergies}
              />
              <InfoRow
                label={p.labelDiseases}
                value={selectedCareTargetDetail?.congenitalDiseases}
              />
              <InfoRow
                label={p.labelMedications}
                value={selectedCareTargetDetail?.currentMedications}
              />
              <InfoRow
                label={p.labelCareNote}
                value={selectedCareTargetDetail?.careNote}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-100 bg-white p-5 shadow-md">
        <p className="mb-4 text-sm font-black text-slate-950">{p.methodTitle}</p>

        <div className="grid grid-cols-2 gap-3">
          {[
            {
              value: "promptpay",
              label: p.methodPromptpay,
            },
            {
              value: "cash",
              label: p.methodCash,
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
            label={p.perHour}
            value={`${formatMoney(baseFeePerHour)} ฿`}
          />

          <SummaryRowLight
            label={p.duration}
            value={formatDuration(bookingDurationMinutes)}
          />

          {/* <SummaryRowLight
            label="เวลาที่คิดเงิน"
            value={`${formatDuration(billableMinutes)}`}
          /> */}

          <SummaryRowLight
            label={p.serviceFee}
            value={`${formatMoney(serviceFee)} ฿`}
          />

          <SummaryRowLight
            label={p.platformFee}
            value={`${formatMoney(platformFee)} ฿`}
          />

          <div className="border-t border-dashed border-slate-400 pt-3">
            <SummaryRowLight
              label={p.totalPrice}
              value={`${formatMoney(totalPrice)} ฿`}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
