export default function ServiceLoadingGrid() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="h-[168px] animate-pulse rounded-[1.75rem] border border-white bg-white/70 p-4 shadow-sm"
        >
          <div className="mb-4 h-12 w-12 rounded-2xl bg-slate-100" />
          <div className="mb-2 h-4 w-24 rounded-full bg-slate-100" />
          <div className="h-3 w-16 rounded-full bg-slate-100" />
          <div className="mt-5 h-6 w-20 rounded-full bg-slate-100" />
        </div>
      ))}
    </div>
  );
}