export function SummaryRowLight({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <span className="shrink-0 text-slate-700">{label}</span>
      <span className="text-right font-bold text-slate-900">{value}</span>
    </div>
  );
}
export function SummaryRowDark({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <span className="shrink-0 text-slate-200">{label}</span>
      <span className="text-right font-bold text-gray-200">{value}</span>
    </div>
  );
}
