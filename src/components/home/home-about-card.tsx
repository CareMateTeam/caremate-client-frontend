type HomeAboutCardProps = {
  aboutBadge: string;
  aboutTitle: string;
  aboutDescription: string;
};

export default function HomeAboutCard({
  aboutBadge,
  aboutTitle,
  aboutDescription,
}: HomeAboutCardProps) {
  return (
    <section className="rounded-[2rem] border border-emerald-100 bg-white px-5 py-6 shadow-xl shadow-emerald-100 ">
      <div className="flex items-start gap-4">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-emerald-50 text-3xl">
          🌿
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-600">
            {aboutBadge}
          </p>

          <h2 className="mt-1 text-xl font-black text-slate-950">
            {aboutTitle}
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {aboutDescription}
          </p>
        </div>
      </div>
    </section>
  );
}