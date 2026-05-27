import type { ReactNode } from "react";

type IntroBackgroundProps = {
  children: ReactNode;
};

export default function IntroBackground({ children }: IntroBackgroundProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white px-5 text-slate-900">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-emerald-50/40 to-sky-50/40" />

      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />
      <div className="pointer-events-none absolute top-20 right-[-60px] h-80 w-80 rounded-full bg-sky-200/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-80px] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-rose-100/40 blur-3xl" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.18]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#0f766e_1px,transparent_1px),linear-gradient(to_bottom,#0f766e_1px,transparent_1px)] bg-[size:42px_42px]" />
      </div>

      <div className="relative z-10">{children}</div>
    </main>
  );
}