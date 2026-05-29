import React from "react";

type PaymentButtonProps = {
  active?: boolean;
  title?: string;
  subtitle?: string;
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
};

export function PaymentButton({
  active = false,
  title,
  subtitle,
  disabled = false,
  onClick,
  children,
  className = "",
  type = "button",
}: PaymentButtonProps) {
  const isOptionButton = Boolean(title || subtitle);

  if (!isOptionButton) {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={[
          "h-12 rounded-xl bg-cyan-500 px-5 text-sm font-black text-white shadow-md shadow-cyan-200 transition active:scale-[0.98]",
          "disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none",
          className,
        ].join(" ")}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[
        "flex w-full items-center justify-between rounded-xl border p-4 text-left transition active:scale-[0.99]",
        active
          ? "border-cyan-400 bg-cyan-50 shadow-md shadow-cyan-100"
          : "border-slate-200 bg-white hover:border-cyan-200",
        disabled ? "cursor-not-allowed opacity-60" : "",
        className,
      ].join(" ")}
    >
      <div>
        <p className="font-black text-slate-950">{title}</p>

        {subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}
      </div>

      <div
        className={[
          "grid h-6 w-6 place-items-center rounded-full border text-xs font-black",
          active
            ? "border-cyan-500 bg-cyan-500 text-white"
            : "border-slate-300 text-transparent",
        ].join(" ")}
      >
        ✓
      </div>
    </button>
  );
}