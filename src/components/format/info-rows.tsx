export function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-100 px-4 py-3">
      <span className="text-sm text-slate-900">{label}</span>
      <span className="truncate text-right text-sm font-semibold text-slate-800">
        {value}
      </span>
    </div>
  );
}
