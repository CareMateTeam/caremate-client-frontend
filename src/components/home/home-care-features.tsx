type CareHighlight = {
  title: string;
  description: string;
  icon: string;
};

type HomeCareFeaturesProps = {
  careFeaturesBadge: string;
  careFeaturesTitle: string;
  careHighlights: CareHighlight[];
};

export default function HomeCareFeatures({
  careFeaturesBadge,
  careFeaturesTitle,
  careHighlights,
}: HomeCareFeaturesProps) {
  return (
    <section className="mt-4">
      <div className="mb-3 flex items-end justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-600">
            {careFeaturesBadge}
          </p>
          <h2 className="text-lg font-black text-slate-950">
            {careFeaturesTitle}
          </h2>
        </div>
      </div>

      <div className="space-y-3">
        {careHighlights.map((item) => (
          <div
            key={item.title}
            className="rounded-[1.5rem] border border-slate-100 bg-white p-4 shadow-lg shadow-slate-50"
          >
            <div className="flex gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-cyan-50 text-2xl">
                {item.icon}
              </div>

              <div>
                <h3 className="text-sm font-black text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}