"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getBloodTypeOptions,
  getRelationshipOptions,
} from "@/constants/health-information";
import { useI18n } from "@/libs/i18n/i18n-provider";
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
  const { t } = useI18n();

  const bloodTypeOptions = useMemo(() => getBloodTypeOptions(t), [t]);
  const relationshipOptions = useMemo(() => getRelationshipOptions(t), [t]);

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
            json?.message ?? t.health.fetchError,
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
        setMessage(t.health.fetchError);
      } finally {
        setLoading(false);
      }
    };

    fetchHealthInformation();
  }, [t]);

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
      setMessage(t.health.validationPhoneMax);
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
        throw new Error(json?.message ?? t.health.saveError);
      }

      setShowSuccessPopup(true);

    } catch (error) {
      console.error("Update health information error:", error);
      setMessage(t.health.saveError);
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
            <p className="text-sm font-semibold text-cyan-600">{t.health.badge}</p>
            <h1 className="mt-1 text-2xl font-extrabold text-slate-950">
              {t.health.title}
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              {t.health.description}
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
              {t.health.emergencyTitle}
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              {t.health.emergencyDescription}
            </p>
          </div>

          <FormInput
            label={t.health.emergencyNameLabel}
            value={form.emergencyContactName}
            placeholder={t.health.emergencyNamePlaceholder}
            onChange={(value) => updateForm("emergencyContactName", value)}
          />

          <FormInput
            label={t.health.emergencyPhoneLabel}
            value={form.emergencyContactPhone}
            placeholder={t.health.emergencyPhonePlaceholder}
            inputMode="tel"
            maxLength={20}
            onChange={(value) => updateForm("emergencyContactPhone", value)}
          />

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">
              {t.health.relationshipLabel}
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
              {t.health.basicTitle}
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              {t.health.basicDescription}
            </p>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">
              {t.health.bloodTypeLabel}
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
            label={t.health.allergiesLabel}
            value={form.allergies}
            placeholder={t.health.allergiesPlaceholder}
            onChange={(value) => updateForm("allergies", value)}
          />

          <FormTextarea
            label={t.health.diseasesLabel}
            value={form.congenitalDiseases}
            placeholder={t.health.diseasesPlaceholder}
            onChange={(value) => updateForm("congenitalDiseases", value)}
          />

          <FormTextarea
            label={t.health.medicationsLabel}
            value={form.currentMedications}
            placeholder={t.health.medicationsPlaceholder}
            onChange={(value) => updateForm("currentMedications", value)}
          />

          <FormTextarea
            label={t.health.careNoteLabel}
            value={form.careNote}
            placeholder={t.health.careNotePlaceholder}
            rows={4}
            onChange={(value) => updateForm("careNote", value)}
          />
        </section>

        <div className="rounded-2xl bg-cyan-50 px-4 py-3 text-xs leading-5 text-cyan-800">
          {t.health.disclaimer}
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
            {t.health.backButton}
          </button>

          <button
            type="submit"
            disabled={saving}
            className="h-12 flex-1 rounded-2xl bg-cyan-500 text-sm font-bold text-white shadow-md shadow-cyan-100 transition hover:bg-cyan-600 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? t.health.savingButton : t.health.saveButton}
          </button>
        </div>
      </form>

      {showSuccessPopup ? (
        <SaveSuccessPopUp
          label={t.health.saveSuccessLabel}
          backto={t.health.saveSuccessBackto}
          backtoHref="/profile"
        />
      ) : null}
    </div>
  );
}
