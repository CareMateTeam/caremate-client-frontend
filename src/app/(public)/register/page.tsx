"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/libs/i18n/i18n-provider";
import LanguageSwitcher from "@/components/language-switcher";
import AppBackground from "@/components/app-background";
import { LineProfile, RegisterForm } from "@/dto/register";
import { Field } from "@/components/input/field-lable";


const initialForm: RegisterForm = {
  firstName: "",
  username: "",
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
};

function optional(value: string) {
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
}

export default function RegisterPage() {
  const router = useRouter();
  const { t } = useI18n();

  const [form, setForm] = useState<RegisterForm>(initialForm);
  const [showPolicy, setShowPolicy] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const registrationToken = sessionStorage.getItem(
      "caremate_registration_token",
    );

    if (!registrationToken) {
      router.replace("/login");
      return;
    }

    const rawLineProfile = sessionStorage.getItem("caremate_line_profile");

    if (!rawLineProfile) return;

    try {
      const lineProfile = JSON.parse(rawLineProfile) as LineProfile;

      if (lineProfile.email) {
        setForm((prev) => ({
          ...prev,
          username: lineProfile.name,
          email: lineProfile.email,
        }));
      }
    } catch {
      sessionStorage.removeItem("caremate_line_profile");
    }
  }, [router]);

  const updateForm = (key: keyof RegisterForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setErrorMessage("");

      if (!accepted) return;

      const registrationToken = sessionStorage.getItem(
        "caremate_registration_token",
      );

      if (!registrationToken) {
        router.replace("/login");
        return;
      }

      if (!form.firstName.trim()) {
        setErrorMessage(t.validation.firstNameRequired);
        return;
      }

      if (!form.lastName.trim()) {
        setErrorMessage(t.validation.lastNameRequired);
        return;
      }

      if (!form.phone.trim()) {
        setErrorMessage(t.validation.phoneRequired);
        return;
      }

      setSubmitting(true);

      const res = await fetch("/api/auth/register-with-line", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          registrationToken,
          username: form.username.trim(),
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          nickname: null,

          gender: optional(form.gender),
          dateOfBirth: optional(form.dateOfBirth),

          email: optional(form.email),
          phone: form.phone.trim(),

          addressLine: optional(form.addressLine),
          subdistrict: null,
          district: null,
          province: optional(form.province),
          postalCode: null,

          emergencyContactName: optional(form.emergencyContactName),
          emergencyContactPhone: optional(form.emergencyContactPhone),
          emergencyContactRelationship: null,

          bloodType: null,
          allergies: null,
          congenitalDiseases: null,
          currentMedications: null,
          careNote: optional(form.careNote),
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.message ?? data?.error ?? "Register failed");
      }

      sessionStorage.removeItem("caremate_registration_token");
      sessionStorage.removeItem("caremate_line_profile");

      router.replace("/home");
    } catch (error) {
      console.error("Register with LINE error:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "Register failed",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppBackground>
      <div className=" px-5 py-6">
        <div className="mx-auto max-w-md space-y-6">
          <header className="rounded-[2rem] bg-gradient-to-br from-emerald-500 to-teal-500 p-6 text-white shadow-lg shadow-emerald-100">
            <div className="flex items-start justify-between">
              <p className="text-sm opacity-90">{t.register.completeProfile}</p>
              <LanguageSwitcher />
            </div>
            <h1 className="mt-2 text-3xl font-bold">{t.register.title}</h1>
            <p className="mt-2 text-sm leading-6 opacity-90">
              {t.register.intro}
            </p>
          </header>

          <form
            className="space-y-4 rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-100"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <Field
              label={t.register.firstName}
              placeholder={t.register.firstNamePlaceholder}
              value={form.firstName}
              onChange={(value) => updateForm("firstName", value)}
            />

            <Field
              label={t.register.lastName}
              placeholder={t.register.lastNamePlaceholder}
              value={form.lastName}
              onChange={(value) => updateForm("lastName", value)}
            />

            <Field
              label={t.register.phone}
              placeholder={t.register.phonePlaceholder}
              value={form.phone}
              onChange={(value) => updateForm("phone", value)}
            />

            <Field
              label={t.register.email}
              placeholder={t.register.emailPlaceholder}
              type="email"
              value={form.email}
              onChange={(value) => updateForm("email", value)}
            />

            <div className="grid grid-cols-2 gap-3">
              <Field
                label={t.register.dob}
                type="date"
                value={form.dateOfBirth}
                onChange={(value) => updateForm("dateOfBirth", value)}
              />

              <Select
                label={t.register.gender}
                value={form.gender}
                onChange={(value) => updateForm("gender", value)}
                options={[
                  {
                    label: t.register.genderMale,
                    value: "male",
                  },
                  {
                    label: t.register.genderFemale,
                    value: "female",
                  },
                ]}
                selectLabel={t.common.select}
              />
            </div>

            <Select
              label={t.register.registerAs}
              value={form.registerAs}
              onChange={(value) => updateForm("registerAs", value)}
              options={[
                {
                  label: t.register.rolePatient,
                  value: "patient",
                },
                {
                  label: t.register.roleFamily,
                  value: "family",
                },
                {
                  label: t.register.roleCaregiver,
                  value: "caregiver",
                },
              ]}
              selectLabel={t.common.select}
            />

            <Field
              label={t.register.address}
              placeholder={t.register.addressPlaceholder}
              value={form.addressLine}
              onChange={(value) => updateForm("addressLine", value)}
            />

            <Field
              label={t.register.province}
              placeholder={t.register.provincePlaceholder}
              value={form.province}
              onChange={(value) => updateForm("province", value)}
            />

            <div className="grid grid-cols-2 gap-3">
              <Field
                label={t.register.emergencyContact}
                placeholder={t.register.emergencyContactPlaceholder}
                value={form.emergencyContactName}
                onChange={(value) => updateForm("emergencyContactName", value)}
              />

              <Field
                label={t.register.emergencyPhone}
                placeholder={t.register.phonePlaceholder}
                value={form.emergencyContactPhone}
                onChange={(value) => updateForm("emergencyContactPhone", value)}
              />
            </div>

            <textarea
              value={form.careNote}
              onChange={(e) => updateForm("careNote", e.target.value)}
              className="min-h-24 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-400"
              placeholder={t.register.notesPlaceholder}
            />

            <div className="rounded-2xl bg-emerald-50 p-4">
              <label className="flex items-start gap-3 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-emerald-500"
                />
                <span>
                  {t.register.consentPrefix}{" "}
                  <button
                    type="button"
                    onClick={() => setShowPolicy(true)}
                    className="font-semibold text-emerald-600 underline"
                  >
                    {t.register.pdpaLink}
                  </button>
                  .
                </span>
              </label>
            </div>

            {errorMessage ? (
              <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {errorMessage}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={!accepted || submitting}
              className="w-full rounded-2xl bg-emerald-500 px-5 py-4 font-bold text-white shadow-lg shadow-emerald-100 transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
            >
              {submitting ? t.register.submitting : t.register.submit}
            </button>
          </form>
        </div>

        {showPolicy && (
          <div className="fixed inset-0 z-50 grid place-items-end bg-black/40 px-4 pb-4">
            <div className="max-h-[85vh] w-full max-w-md overflow-hidden rounded-[2rem] bg-white shadow-2xl">
              <div className="border-b border-slate-100 p-5">
                <h2 className="text-xl font-bold text-slate-900">
                  {t.register.pdpaTitle}
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  {t.register.pdpaSubtitle}
                </p>
              </div>

              <div className="max-h-[55vh] space-y-4 overflow-y-auto p-5 text-sm leading-6 text-slate-600">
                {t.register.pdpaParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="flex gap-3 border-t border-slate-100 p-4">
                <button
                  type="button"
                  onClick={() => setShowPolicy(false)}
                  className="flex-1 rounded-2xl bg-slate-100 px-4 py-3 font-semibold text-slate-700"
                >
                  {t.common.close}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAccepted(true);
                    setShowPolicy(false);
                  }}
                  className="flex-1 rounded-2xl bg-emerald-500 px-4 py-3 font-bold text-white"
                >
                  {t.common.accept}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppBackground>
  );
}


function Select({
  label,
  options,
  selectLabel,
  value,
  onChange,
}: {
  label: string;
  options: {
    label: string;
    value: string;
  }[];
  selectLabel: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold text-slate-600">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50"
      >
        <option value="">{selectLabel}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
