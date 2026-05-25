"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white px-5">
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-between py-8">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-emerald-500 text-lg font-bold text-white shadow-sm">
              C
            </div>
            <div>
              <p className="text-lg font-bold text-slate-900">CareMate</p>
              <p className="text-xs text-slate-500">Digital care companion</p>
            </div>
          </div>

          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
            LIFF App
          </span>
        </header>

        <section className="flex flex-1 flex-col justify-center">
          <div className="mb-8 rounded-[2rem] bg-white p-5 shadow-xl shadow-emerald-100 ring-1 ring-emerald-100">
            <div className="mb-5 grid h-56 place-items-center rounded-[1.5rem] bg-gradient-to-br from-emerald-100 to-teal-50">
              <div className="relative">
                <div className="grid h-28 w-28 place-items-center rounded-full bg-white shadow-lg">
                  <span className="text-5xl">🩺</span>
                </div>
                <div className="absolute -right-4 -top-3 rounded-2xl bg-white px-3 py-2 text-xs font-semibold text-emerald-600 shadow-md">
                  Online
                </div>
                <div className="absolute -bottom-4 -left-5 rounded-2xl bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-md">
                  Care ready
                </div>
              </div>
            </div>

            <h1 className="text-3xl font-bold leading-tight text-slate-900">
              Healthcare support,
              <br />
              made simple.
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Connect with care services, manage bookings, and access your
              healthcare journey securely through LINE.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100">
              <p className="text-lg">👩‍⚕️</p>
              <p className="mt-1 text-xs font-medium text-slate-600">
                Caregiver
              </p>
            </div>
            <div className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100">
              <p className="text-lg">📅</p>
              <p className="mt-1 text-xs font-medium text-slate-600">
                Booking
              </p>
            </div>
            <div className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100">
              <p className="text-lg">🔒</p>
              <p className="mt-1 text-xs font-medium text-slate-600">
                Secure
              </p>
            </div>
          </div>
        </section>

        <footer className="space-y-3">
          <button
            onClick={() => router.push("/login")}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#06C755] px-5 py-4 text-base font-bold text-white shadow-lg shadow-green-200 transition hover:bg-[#05b64d] active:scale-[0.98]"
          >
            <span className="grid px-2 py-1 place-items-center rounded-full bg-white text-sm font-black text-[#06C755]">
              LINE
            </span>
            Login with LINE
          </button>

          <p className="text-center text-xs leading-5 text-slate-400">
            By continuing, you agree to access CareMate securely through LINE
            LIFF authentication.
          </p>
        </footer>
      </div>
    </main>
  );
}