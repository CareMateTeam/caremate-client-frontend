"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getLiffIdToken,
  initLiff,
  isLiffLoggedIn,
  loginWithLiff,
} from "@/libs/liff";
import { useI18n } from "@/libs/i18n/i18n-provider";

type AuthStatus = "loading" | "redirecting" | "success" | "error";

export default function LiffAuthProvider() {
  const router = useRouter();
  const hasRun = useRef(false);
  const { t } = useI18n();

  const [status, setStatus] = useState<AuthStatus>("loading");
  const [message, setMessage] = useState<string>(t.auth.preparing);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const handleLogin = async () => {
      try {
        setStatus("loading");
        setMessage(t.auth.connecting);

        await initLiff();

        if (!isLiffLoggedIn()) {
          setStatus("redirecting");
          setMessage(t.auth.redirecting);
          loginWithLiff();
          return;
        }

        setMessage(t.auth.verifying);

        const idToken = getLiffIdToken();

        if (!idToken) {
          throw new Error(t.auth.tokenNotFound);
        }

        setMessage(t.auth.creatingSession);

        const res = await fetch("/api/auth/line-login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ idToken }),
        });

        const data = await res.json().catch(() => null);

        if (!res.ok) {
          throw new Error(data?.message ?? t.auth.loginFailed);
        }

        setStatus("success");
        setMessage(t.auth.successRedirect);

        router.replace("/home");
      } catch (err) {
        console.error("LIFF auth error:", err);

        setStatus("error");
        setMessage(err instanceof Error ? err.message : t.auth.genericError);
      }
    };

    handleLogin();
  }, [router]);

  const isError = status === "error";
  const isSuccess = status === "success";

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-10 text-white">
      <div className="absolute left-[-10%] top-[-10%] h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.14),transparent_35%),linear-gradient(to_bottom,rgba(15,23,42,0.2),rgba(2,6,23,1))]" />

      <section className="relative w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.08] p-8 shadow-2xl shadow-emerald-950/30 backdrop-blur-xl">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 shadow-lg ring-1 ring-white/15">
          {isError ? (
            <svg
              className="h-8 w-8 text-red-400"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : isSuccess ? (
            <svg
              className="h-8 w-8 text-emerald-400"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="m5 12 4 4L19 6"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <div className="relative h-9 w-9">
              <div className="absolute inset-0 rounded-full border-4 border-white/15" />
              <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-emerald-400 border-r-cyan-300" />
            </div>
          )}
        </div>

        <div className="text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.28em] text-emerald-300/90">
            {t.common.appName}
          </p>

          <h1 className="text-2xl font-semibold tracking-tight text-white">
            {isError
              ? t.auth.loginFailed
              : isSuccess
                ? t.auth.welcomeBack
                : t.auth.signingIn}
          </h1>

          <p className="mt-3 min-h-12 text-sm leading-6 text-slate-300">
            {message}
          </p>
        </div>

        {!isError && (
          <div className="mt-8 space-y-4">
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-2/3 animate-pulse rounded-full bg-gradient-to-r from-emerald-400 to-cyan-300" />
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
              <span>{t.auth.inProgress}</span>
            </div>
          </div>
        )}

        {isError && (
          <div className="mt-8 space-y-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="w-full rounded-2xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-300 active:scale-[0.99]"
            >
              {t.auth.tryAgain}
            </button>

            <button
              type="button"
              onClick={() => router.replace("/login")}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/10 active:scale-[0.99]"
            >
              {t.auth.backToLogin}
            </button>
          </div>
        )}

        <div className="mt-8 rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>{t.auth.protectedBy}</span>
            <span className="rounded-full bg-emerald-400/10 px-2 py-1 text-emerald-300">
              {t.common.secure}
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
