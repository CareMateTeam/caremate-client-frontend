"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [showPolicy, setShowPolicy] = useState(false);
  const [accepted, setAccepted] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-slate-50 px-5 py-6">
      <div className="mx-auto max-w-md space-y-6">
        <header className="rounded-[2rem] bg-gradient-to-br from-emerald-500 to-teal-500 p-6 text-white shadow-lg shadow-emerald-100">
          <p className="text-sm opacity-90">Complete your profile</p>
          <h1 className="mt-2 text-3xl font-bold">Register CareMate</h1>
          <p className="mt-2 text-sm leading-6 opacity-90">
            Please provide your information so we can prepare safe and suitable
            care services for you.
          </p>
        </header>

        <form className="space-y-4 rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <Field label="First name" placeholder="Enter your first name" />
          <Field label="Last name" placeholder="Enter your last name" />
          <Field label="Phone number" placeholder="08x-xxx-xxxx" />
          <Field label="Email" placeholder="example@email.com" type="email" />

          <div className="grid grid-cols-2 gap-3">
            <Field label="Date of birth" type="date" />
            <Select label="Gender" options={["Male", "Female", "Other"]} />
          </div>

          <Select
            label="Register as"
            options={["Patient / Client", "Family member", "Caregiver"]}
          />

          <Field label="Address" placeholder="House number, street, district" />
          <Field label="Province" placeholder="Bangkok" />

          <div className="grid grid-cols-2 gap-3">
            <Field label="Emergency contact" placeholder="Name" />
            <Field label="Contact phone" placeholder="08x-xxx-xxxx" />
          </div>

          <textarea
            className="min-h-24 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-400"
            placeholder="Medical notes, allergies, care requirements, or special instructions"
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
                I have read and agree to the{" "}
                <button
                  type="button"
                  onClick={() => setShowPolicy(true)}
                  className="font-semibold text-emerald-600 underline"
                >
                  PDPA Privacy Policy
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
            Complete Registration
          </button>
        </form>
      </div>

      {showPolicy && (
        <div className="fixed inset-0 z-50 grid place-items-end bg-black/40 px-4 pb-4">
          <div className="max-h-[85vh] w-full max-w-md overflow-hidden rounded-[2rem] bg-white shadow-2xl">
            <div className="border-b border-slate-100 p-5">
              <h2 className="text-xl font-bold text-slate-900">
                PDPA Privacy Policy
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Personal Data Protection Notice for CareMate users
              </p>
            </div>

            <div className="max-h-[55vh] space-y-4 overflow-y-auto p-5 text-sm leading-6 text-slate-600">
              <p>
                CareMate respects your privacy and is committed to protecting
                your personal data in accordance with the Personal Data
                Protection Act B.E. 2562 (2019) of Thailand and other applicable
                laws. This privacy notice explains how we collect, use, store,
                disclose, and protect your personal data when you register for
                and use CareMate services.
              </p>

              <p>
                We may collect personal data such as your name, phone number,
                email address, LINE user profile, profile picture, date of
                birth, gender, address, emergency contact information, booking
                history, service preferences, device information, login
                activity, and communication records. Where necessary for care
                coordination, we may also collect sensitive personal data,
                including health-related information, allergy information,
                medical notes, mobility limitations, care requirements, and
                other information that you voluntarily provide for the purpose of
                receiving suitable care services.
              </p>

              <p>
                We collect and use your personal data for the following
                purposes: to verify your identity, create and manage your
                account, provide caregiver matching, manage bookings and
                schedules, contact you about services, coordinate care between
                clients, family members, caregivers, and service providers,
                improve service quality, prevent fraud or misuse, comply with
                legal obligations, maintain service security, and respond to
                emergency or safety-related situations.
              </p>

              <p>
                For sensitive personal data, including health-related
                information, we will request your explicit consent before
                collection, use, or disclosure, unless the law allows otherwise,
                such as where it is necessary to prevent or suppress danger to
                life, body, or health, or where it is required by applicable law.
              </p>

              <p>
                We may disclose your personal data only when necessary to
                authorized personnel, caregivers, healthcare-related service
                providers, technology service providers, payment service
                providers, cloud infrastructure providers, legal advisors,
                auditors, government authorities, or other parties required by
                law. We require relevant third parties to protect your personal
                data and use it only for the purposes instructed by CareMate.
              </p>

              <p>
                We will retain your personal data only for as long as necessary
                for the purposes described in this notice, for the duration of
                your account, for service record keeping, dispute resolution,
                audit, legal compliance, and legitimate business purposes. When
                your personal data is no longer necessary, we will delete,
                destroy, anonymize, or otherwise handle it in accordance with
                applicable laws and internal security standards.
              </p>

              <p>
                We implement appropriate technical and organizational security
                measures to protect your personal data against unauthorized
                access, loss, misuse, alteration, disclosure, or destruction.
                These measures may include access control, encryption, secure
                authentication, audit logs, role-based permission control, and
                data breach response procedures.
              </p>

              <p>
                As a data subject, you may have the right to request access to
                your personal data, request correction of inaccurate data,
                request deletion or anonymization, restrict or object to certain
                processing, withdraw consent, request data portability where
                applicable, and lodge a complaint with the relevant authority.
                Withdrawal of consent may affect our ability to provide certain
                services, especially where such data is necessary for care
                coordination or safety.
              </p>

              <p>
                By ticking the consent checkbox and continuing registration, you
                confirm that you have read and understood this privacy notice and
                consent to CareMate collecting, using, and disclosing your
                personal data, including sensitive personal data where necessary,
                for the purposes described above.
              </p>
            </div>

            <div className="flex gap-3 border-t border-slate-100 p-4">
              <button
                onClick={() => setShowPolicy(false)}
                className="flex-1 rounded-2xl bg-slate-100 px-4 py-3 font-semibold text-slate-700"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setAccepted(true);
                  setShowPolicy(false);
                }}
                className="flex-1 rounded-2xl bg-emerald-500 px-4 py-3 font-bold text-white"
              >
                Accept
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

function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold text-slate-600">
        {label}
      </span>
      <select className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50">
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}