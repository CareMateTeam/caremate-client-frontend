export function PaymentButton({
  active,
  title,
  subtitle,
  onClick,
}: {
  active: boolean;
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex w-full items-center justify-between rounded-xl border p-4 text-left transition",
        active
          ? "border-cyan-400 bg-cyan-50 shadow-md shadow-cyan-100"
          : "border-slate-200 bg-white hover:border-cyan-200",
      ].join(" ")}
    >
      <div>
        <p className="font-black text-slate-950">{title}</p>
        <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
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
