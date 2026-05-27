export function TopUserInformationSkeleton() {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/90 p-4 shadow-xl shadow-emerald-100/50 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 animate-pulse rounded-3xl bg-emerald-100" />

        <div className="min-w-0 flex-1 space-y-3">
          <div className="h-4 w-32 animate-pulse rounded-full bg-slate-100" />
          <div className="h-3 w-44 animate-pulse rounded-full bg-slate-100" />
          <div className="flex gap-2">
            <div className="h-6 w-20 animate-pulse rounded-full bg-slate-100" />
            <div className="h-6 w-24 animate-pulse rounded-full bg-slate-100" />
          </div>
        </div>
      </div>
    </section>
  );
}
