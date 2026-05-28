"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/libs/i18n/i18n-provider";
import { Field } from "@/components/input/field-lable";
import {
  genderOptions,
  registerAsOptions,
  relationshipOptions,
} from "@/constants/health-information";
import { CreateRelativeForm } from "@/dto/register";
import { MAX_MEMBERS } from "@/constants/member";
import { optional } from "@/libs/user/map-lib";
import { Check } from "lucide-react";
import SaveSuccessPopUp from "@/components/card/save-success-pop-up";

const initialForm: CreateRelativeForm = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  dateOfBirth: "",
  gender: "",
  registerAs: "",
  addressLine: "",
  province: "",
  emergencyContactName: "",
  emergencyContactPhone: "",
  careNote: "",
  relationship: "",
  isDefault: false,
};

export default function CreateMemberPage() {
  const router = useRouter();
  const { t } = useI18n();

  const [form, setForm] = useState<CreateRelativeForm>(initialForm);

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    const fetchRelatives = async () => {
      try {
        const res = await fetch("/api/relative", {
          method: "GET",
          cache: "no-store",
        });

        const json = await res.json().catch(() => null);

        if (!res.ok) {
          console.error("Fetch relatives failed:", json);
          return;
        }

        const relatives = json?.data?.relatives ?? [];

        if (relatives.length >= MAX_MEMBERS) {
          router.replace("/members");
        }
      } catch (error) {
        console.error("Fetch relatives error:", error);
      }
    };

    fetchRelatives();
  }, [router]);

  const updateForm = <K extends keyof CreateRelativeForm>(
    key: K,
    value: CreateRelativeForm[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const canSubmit = useMemo(() => {
    return (
      form.firstName.trim().length > 0 &&
      form.lastName.trim().length > 0 &&
      form.phone.trim().length > 0 &&
      form.relationship.trim().length > 0
    );
  }, [form.firstName, form.lastName, form.phone, form.relationship]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.firstName.trim()) {
      setErrorMessage("กรุณากรอกชื่อจริง");
      return;
    }

    if (!form.lastName.trim()) {
      setErrorMessage("กรุณากรอกนามสกุล");
      return;
    }

    if (!form.phone.trim()) {
      setErrorMessage("กรุณากรอกเบอร์โทรศัพท์");
      return;
    }

    if (!form.relationship.trim()) {
      setErrorMessage("กรุณาเลือกความสัมพันธ์");
      return;
    }

    try {
      setSubmitting(true);
      setErrorMessage("");

      const payload = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        phone: form.phone.trim(),
        email: optional(form.email),
        dateOfBirth: optional(form.dateOfBirth),
        gender: optional(form.gender),
        registerAs: optional(form.registerAs),
        addressLine: optional(form.addressLine),
        province: optional(form.province),
        emergencyContactName: optional(form.emergencyContactName),
        emergencyContactPhone: optional(form.emergencyContactPhone),
        careNote: optional(form.careNote),
        relationship: form.relationship,
        isDefault: form.isDefault,
      };

      const res = await fetch("/api/relative", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      console.log("Create member response:", payload);

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(json?.message ?? "ไม่สามารถบันทึกข้อมูลสมาชิกได้");
      }

      setShowSuccessPopup(true);
    } catch (error) {
      console.error("Create member error:", error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "ไม่สามารถบันทึกข้อมูลสมาชิกได้",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="space-y-3">
      <header className="rounded-2xl bg-gradient-to-br from-emerald-500 flex justify-between to-teal-500 p-6 text-white shadow-lg shadow-emerald-100">
        <div className="grid">
          {" "}
          <p className="text-sm opacity-90">Family Member</p>
          <h1 className="mt-2 text-2xl font-bold">เพิ่มสมาชิก</h1>
          <p className="mt-2 text-sm leading-6 opacity-90">
            กรอกข้อมูลสมาชิกหรือญาติที่ต้องการรับบริการดูแล
          </p>
        </div>
      </header>

      <form
        className="space-y-4 rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-100"
        onSubmit={handleSubmit}
      >
        <Field
          label="ชื่อจริง *"
          value={form.firstName}
          onChange={(value) => updateForm("firstName", value)}
          placeholder="กรอกชื่อจริง"
        />

        <Field
          label="นามสกุล *"
          value={form.lastName}
          onChange={(value) => updateForm("lastName", value)}
          placeholder="กรอกนามสกุล"
        />

        <Field
          label="เบอร์โทรศัพท์ *"
          value={form.phone}
          onChange={(value) => updateForm("phone", value)}
          placeholder="08x-xxx-xxxx"
          type="tel"
        />

        <Field
          label="อีเมล"
          value={form.email}
          onChange={(value) => updateForm("email", value)}
          placeholder="example@email.com"
          type="email"
        />

        <div className="grid grid-cols-2 gap-3">
          <Field
            label="วันเกิด"
            value={form.dateOfBirth}
            onChange={(value) => updateForm("dateOfBirth", value)}
            type="date"
          />

          <label className="block">
            <span className="mb-2 block text-xs font-semibold text-slate-600">
              เพศ
            </span>
            <select
              value={form.gender}
              onChange={(event) => updateForm("gender", event.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50"
            >
              <option value="">เลือก</option>
              {genderOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="block">
          <span className="mb-2 block text-xs font-semibold text-slate-600">
            ความสัมพันธ์ *
          </span>
          <select
            value={form.relationship}
            onChange={(event) => updateForm("relationship", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50"
          >
            <option value="">เลือกความสัมพันธ์</option>
            {relationshipOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-semibold text-slate-600">
            สมัครในฐานะ
          </span>
          <select
            value={form.registerAs}
            onChange={(event) => updateForm("registerAs", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50"
          >
            <option value="">เลือก</option>
            {registerAsOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-semibold text-slate-600">
            ที่อยู่
          </span>
          <textarea
            value={form.addressLine}
            onChange={(event) => updateForm("addressLine", event.target.value)}
            rows={3}
            placeholder="บ้านเลขที่, หมู่บ้าน, คอนโด, ชั้น, ห้อง"
            className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50"
          />
        </label>

        <Field
          label="จังหวัด"
          value={form.province}
          onChange={(value) => updateForm("province", value)}
          placeholder="เช่น กรุงเทพมหานคร"
        />

        <Field
          label="ชื่อผู้ติดต่อฉุกเฉิน"
          value={form.emergencyContactName}
          onChange={(value) => updateForm("emergencyContactName", value)}
          placeholder="ชื่อผู้ติดต่อฉุกเฉิน"
        />

        <Field
          label="เบอร์ผู้ติดต่อฉุกเฉิน"
          value={form.emergencyContactPhone}
          onChange={(value) => updateForm("emergencyContactPhone", value)}
          placeholder="08x-xxx-xxxx"
          type="tel"
        />

        <label className="block">
          <span className="mb-2 block text-xs font-semibold text-slate-600">
            หมายเหตุการดูแล
          </span>
          <textarea
            value={form.careNote}
            onChange={(event) => updateForm("careNote", event.target.value)}
            rows={4}
            placeholder="เช่น โรคประจำตัว, ยาที่ทานประจำ, อาหารที่แพ้, การช่วยเหลือพิเศษ"
            className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50"
          />
        </label>

        <button
          type="button"
          onClick={() => updateForm("isDefault", !form.isDefault)}
          className={[
            "flex w-full items-center justify-between rounded-xl border p-4 text-left transition",
            form.isDefault
              ? "border-emerald-300 bg-emerald-50"
              : "border-slate-200 bg-white",
          ].join(" ")}
        >
          <div>
            <p className="font-black text-slate-950">ตั้งเป็นสมาชิกหลัก</p>
            <p className="mt-1 text-xs text-slate-500">
              ใช้เป็นค่าเริ่มต้นตอนสร้าง booking
            </p>
          </div>

          <div
            className={[
              "grid h-7 w-7 place-items-center rounded-full text-xs font-black",
              form.isDefault
                ? "bg-emerald-500 text-white"
                : "bg-slate-100 text-transparent",
            ].join(" ")}
          >
            <Check className="h-4 w-4" />
          </div>
        </button>

        {errorMessage && (
          <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
            {errorMessage}
          </p>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="h-fit py-3 w-24 rounded-xl bg-slate-100 text-sm font-black text-slate-600"
          >
            ยกเลิก
          </button>

          <button
            type="submit"
            disabled={!canSubmit || submitting}
            className={[
              "h-fit py-3 flex-1 rounded-xl text-sm font-black shadow-lg transition active:scale-[0.98]",
              canSubmit && !submitting
                ? "bg-emerald-500 text-white shadow-emerald-100"
                : "cursor-not-allowed bg-slate-200 text-slate-400 shadow-none",
            ].join(" ")}
          >
            {submitting ? "กำลังบันทึก..." : "บันทึกสมาชิก"}
          </button>
        </div>
      </form>
      {showSuccessPopup ? (
        <SaveSuccessPopUp
          label="ข้อมูลสมาชิก"
          backto="หน้าสมาชิกครอบครัว"
          backtoHref="/members"
        />
      ) : null}
    </section>
  );
}
