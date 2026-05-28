"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  bloodTypeOptions,
  relationshipOptions,
} from "@/constants/health-information";
import { unwrapApiData } from "@/libs/user/map-user-profile";
import SaveSuccessPopUp from "@/components/card/save-success-pop-up";
import { FormInput } from "@/components/input/form-input";
import { FormTextarea } from "@/components/input/form-text-area";
import { HealthInformationForm, HealthInformationResponse } from "@/dto/health";

const initialForm: HealthInformationForm = {
  emergencyContactName: "",
  emergencyContactPhone: "",
  emergencyContactRelationship: "",
  bloodType: "",
  allergies: "",
  congenitalDiseases: "",
  currentMedications: "",
  careNote: "",
};

export default function HealthInformationPage() {
  const router = useRouter();

  const [form, setForm] = useState<HealthInformationForm>(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    const fetchHealthInformation = async () => {
      try {
        setLoading(true);
        setMessage("");

        const res = await fetch("/api/user/health-information", {
          method: "GET",
          credentials: "include",
        });

        const json = await res.json().catch(() => null);

        if (!res.ok) {
          throw new Error(
            json?.message ?? "Failed to fetch health information",
          );
        }

        const data = unwrapApiData<HealthInformationResponse>(json);

        setForm({
          emergencyContactName: data.emergency_contact_name ?? "",
          emergencyContactPhone: data.emergency_contact_phone ?? "",
          emergencyContactRelationship:
            data.emergency_contact_relationship ?? "",
          bloodType: data.blood_type ?? "",
          allergies: data.allergies ?? "",
          congenitalDiseases: data.congenital_diseases ?? "",
          currentMedications: data.current_medications ?? "",
          careNote: data.care_note ?? "",
        });
      } catch (error) {
        console.error("Fetch health information error:", error);
        setMessage("โหลดข้อมูลสุขภาพไม่สำเร็จ");
      } finally {
        setLoading(false);
      }
    };

    fetchHealthInformation();
  }, []);

  const updateForm = <K extends keyof HealthInformationForm>(
    key: K,
    value: HealthInformationForm[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      form.emergencyContactPhone.trim() &&
      form.emergencyContactPhone.trim().length > 20
    ) {
      setMessage("เบอร์โทรผู้ติดต่อฉุกเฉินต้องไม่เกิน 20 ตัวอักษร");
      return;
    }

    try {
      setSaving(true);
      setMessage("");

      const payload = {
        emergency_contact_name: form.emergencyContactName.trim(),
        emergency_contact_phone: form.emergencyContactPhone.trim(),
        emergency_contact_relationship:
          form.emergencyContactRelationship.trim(),
        blood_type: form.bloodType.trim(),
        allergies: form.allergies.trim(),
        congenital_diseases: form.congenitalDiseases.trim(),
        current_medications: form.currentMedications.trim(),
        care_note: form.careNote.trim(),
      };

      const res = await fetch("/api/user/health-information", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(json?.message ?? "Failed to update health information");
      }

      setShowSuccessPopup(true);

      window.setTimeout(() => {
        router.replace("/profile");
      }, 1200);
    } catch (error) {
      console.error("Update health information error:", error);
      setMessage("บันทึกข้อมูลสุขภาพไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-md space-y-5">
        <div className="h-28 animate-pulse rounded-[2rem] bg-white/80" />
        <div className="h-[760px] animate-pulse rounded-[2rem] bg-white/80" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md space-y-5">
      <section className="rounded-[2rem] border border-white/80 bg-white/85 p-5 shadow-sm backdrop-blur">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-cyan-600">Profile</p>
            <h1 className="mt-1 text-2xl font-extrabold text-slate-950">
              ข้อมูลสุขภาพ
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              บันทึกข้อมูลสุขภาพที่สำคัญ เพื่อช่วยให้ผู้ดูแลเข้าใจข้อควรระวัง
              โรคประจำตัว ยาที่ใช้อยู่ และข้อมูลติดต่อฉุกเฉิน
            </p>
          </div>

          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-cyan-100 text-2xl">
            🩺
          </div>
        </div>
      </section>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-[2rem] border border-white/80 bg-white/85 p-5 shadow-sm"
      >
        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-950">
              ผู้ติดต่อฉุกเฉิน
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              ใช้สำหรับติดต่อในกรณีฉุกเฉินระหว่างการดูแล
            </p>
          </div>

          <FormInput
            label="ชื่อผู้ติดต่อฉุกเฉิน"
            value={form.emergencyContactName}
            placeholder="เช่น คุณแม่, คุณพ่อ, ญาติ"
            onChange={(value) => updateForm("emergencyContactName", value)}
          />

          <FormInput
            label="เบอร์โทรผู้ติดต่อฉุกเฉิน"
            value={form.emergencyContactPhone}
            placeholder="เช่น 0812345678"
            inputMode="tel"
            maxLength={20}
            onChange={(value) => updateForm("emergencyContactPhone", value)}
          />

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">
              ความสัมพันธ์
            </span>

            <select
              value={form.emergencyContactRelationship}
              onChange={(event) =>
                updateForm("emergencyContactRelationship", event.target.value)
              }
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
            >
              {relationshipOptions.map((item) => (
                <option key={item.value || "empty"} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        </section>

        <div className="h-px bg-slate-100" />

        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-950">
              ข้อมูลสุขภาพพื้นฐาน
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              ข้อมูลนี้ช่วยให้ผู้ดูแลระมัดระวังและวางแผนการดูแลได้ดีขึ้น
            </p>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">
              กรุ๊ปเลือด
            </span>

            <select
              value={form.bloodType}
              onChange={(event) => updateForm("bloodType", event.target.value)}
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
            >
              {bloodTypeOptions.map((item) => (
                <option key={item.value || "empty"} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <FormTextarea
            label="ประวัติการแพ้"
            value={form.allergies}
            placeholder="เช่น แพ้อาหารทะเล, แพ้ยาเพนิซิลลิน, ไม่มี"
            onChange={(value) => updateForm("allergies", value)}
          />

          <FormTextarea
            label="โรคประจำตัว"
            value={form.congenitalDiseases}
            placeholder="เช่น เบาหวาน, ความดัน, หอบหืด, ไม่มี"
            onChange={(value) => updateForm("congenitalDiseases", value)}
          />

          <FormTextarea
            label="ยาที่ใช้อยู่ปัจจุบัน"
            value={form.currentMedications}
            placeholder="เช่น ยาความดันหลังอาหารเช้า, อินซูลิน, ไม่มี"
            onChange={(value) => updateForm("currentMedications", value)}
          />

          <FormTextarea
            label="หมายเหตุสำหรับผู้ดูแล"
            value={form.careNote}
            placeholder="เช่น เดินไม่สะดวก, ต้องช่วยเตือนกินยา, ต้องเลี่ยงอาหารบางชนิด"
            rows={4}
            onChange={(value) => updateForm("careNote", value)}
          />
        </section>

        <div className="rounded-2xl bg-cyan-50 px-4 py-3 text-xs leading-5 text-cyan-800">
          ข้อมูลสุขภาพควรถูกกรอกให้ตรงกับความจริง
          เพื่อช่วยให้การดูแลปลอดภัยและเหมาะสมมากขึ้น
        </div>

        {message ? (
          <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
            {message}
          </div>
        ) : null}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="h-12 flex-1 rounded-2xl border border-slate-200 bg-white text-sm font-bold text-slate-600 transition hover:bg-slate-50 active:scale-[0.99]"
          >
            ย้อนกลับ
          </button>

          <button
            type="submit"
            disabled={saving}
            className="h-12 flex-1 rounded-2xl bg-cyan-500 text-sm font-bold text-white shadow-md shadow-cyan-100 transition hover:bg-cyan-600 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
          </button>
        </div>
      </form>

      {showSuccessPopup ? (
        <SaveSuccessPopUp
          label="ข้อมูลสุขภาพ"
          backto="หน้าโปรไฟล์"
          backtoHref="/profile"
        />
      ) : null}
    </div>
  );
}
