type CareStep = {
  step: string;
  title: string;
  description: string;
};

type HomeHowItWorksProps = {
  howItWorksBadge: string;
  howItWorksTitle: string;
  careSteps: CareStep[];
};

export default function HomeHowItWorks({
  howItWorksBadge,
  howItWorksTitle,
  careSteps,
}: HomeHowItWorksProps) {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-cyan-100 bg-white shadow-xl shadow-cyan-50">
      <div className="bg-gradient-to-r from-cyan-50 to-emerald-50 p-5">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-600">
          {howItWorksBadge}
        </p>
        <h2 className="mt-1 text-xl font-black text-slate-950">
          {howItWorksTitle}
        </h2>
      </div>

      <div className="space-y-4 p-5">
        {careSteps.map((item, index) => (
          <div key={item.step} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-sm font-black text-white">
                {item.step}
              </div>

              {index < careSteps.length - 1 && (
                <div className="mt-2 h-10 w-px bg-slate-200" />
              )}
            </div>

            <div className="pb-2">
              <h3 className="text-sm font-black text-slate-950">
                {item.title}
              </h3>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}