"use client";

import { useState } from "react";
import { useI18n } from "@/libs/i18n/i18n-provider";
import LanguageSwitcher from "@/components/language-switcher";

export default function RegisterPage() {
  const { t } = useI18n();
  const [showPolicy, setShowPolicy] = useState(false);
  const [accepted, setAccepted] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-slate-50 px-5 py-6">
      <div className="mx-auto max-w-md space-y-6">
        <header className="rounded-[2rem] bg-gradient-to-br from-emerald-500 to-teal-500 p-6 text-white shadow-lg shadow-emerald-100">
          <div className="flex items-start justify-between">
            <p className="text-sm opacity-90">{t.register.completeProfile}</p>
            <LanguageSwitcher />
          </div>
          <h1 className="mt-2 text-3xl font-bold">{t.register.title}</h1>
          <p className="mt-2 text-sm leading-6 opacity-90">{t.register.intro}</p>
        </header>

        <form className="space-y-4 rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <Field
            label={t.register.firstName}
            placeholder={t.register.firstNamePlaceholder}
            selectLabel={t.common.select}
          />
          <Field
            label={t.register.lastName}
            placeholder={t.register.lastNamePlaceholder}
            selectLabel={t.common.select}
          />
          <Field
            label={t.register.phone}
            placeholder={t.register.phonePlaceholder}
            selectLabel={t.common.select}
          />
          <Field
            label={t.register.email}
            placeholder={t.register.emailPlaceholder}
            type="email"
            selectLabel={t.common.select}
          />

          <div className="grid grid-cols-2 gap-3">
            <Field
              label={t.register.dob}
              type="date"
              selectLabel={t.common.select}
            />
            <Select
              label={t.register.gender}
              options={[
                t.register.genderMale,
                t.register.genderFemale,
                t.register.genderOther,
              ]}
              selectLabel={t.common.select}
            />
          </div>

          <Select
            label={t.register.registerAs}
            options={[
              t.register.rolePatient,
              t.register.roleFamily,
              t.register.roleCaregiver,
            ]}
            selectLabel={t.common.select}
          />

          <Field
            label={t.register.address}
            placeholder={t.register.addressPlaceholder}
            selectLabel={t.common.select}
          />
          <Field
            label={t.register.province}
            placeholder={t.register.provincePlaceholder}
            selectLabel={t.common.select}
          />

          <div className="grid grid-cols-2 gap-3">
            <Field
              label={t.register.emergencyContact}
              placeholder={t.register.emergencyContactPlaceholder}
              selectLabel={t.common.select}
            />
            <Field
              label={t.register.emergencyPhone}
              placeholder={t.register.phonePlaceholder}
              selectLabel={t.common.select}
            />
          </div>

          <textarea
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

          <button
            type="button"
            disabled={!accepted}
            className="w-full rounded-2xl bg-emerald-500 px-5 py-4 font-bold text-white shadow-lg shadow-emerald-100 transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
          >
            {t.register.submit}
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
                onClick={() => setShowPolicy(false)}
                className="flex-1 rounded-2xl bg-slate-100 px-4 py-3 font-semibold text-slate-700"
              >
                {t.common.close}
              </button>
              <button
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
    </main>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder?: string;
  type?: string;
  selectLabel?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold text-slate-600">
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50"
      />
    </label>
  );
}

function Select({
  label,
  options,
  selectLabel,
}: {
  label: string;
  options: string[];
  selectLabel: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold text-slate-600">
        {label}
      </span>
      <select className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50">
        <option value="">{selectLabel}</option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
