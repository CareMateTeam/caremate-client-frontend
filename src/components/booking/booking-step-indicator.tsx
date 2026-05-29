"use client";

import type { LucideIcon } from "lucide-react";

export type BookingStepItem = {
  id: number;
  title: string;
  icon: LucideIcon;
};

type BookingStepIndicatorProps = {
  steps: BookingStepItem[];
  currentStep: number;
};

export default function BookingStepIndicator({
  steps,
  currentStep,
}: BookingStepIndicatorProps) {
  return (
    <section className="rounded-lg border border-white bg-white/80 p-4 shadow-sm">
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))`,
        }}
      >
        {steps.map((step) => {
          const active = currentStep === step.id;
          const completed = currentStep > step.id;
          const Icon = step.icon;

          return (
            <div key={step.id} className="text-center">
              <div
                className={[
                  "mx-auto grid h-9 w-9 place-items-center rounded-full text-sm font-black transition",
                  active
                    ? "bg-cyan-500 text-white shadow-md shadow-cyan-100"
                    : completed
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-100 text-slate-400",
                ].join(" ")}
              >
                {completed ? "✓" : <Icon className="h-4 w-4" />}
              </div>

              <p
                className={[
                  "mt-2 text-[10px] font-bold",
                  active ? "text-cyan-700" : "text-slate-400",
                ].join(" ")}
              >
                {step.title}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}