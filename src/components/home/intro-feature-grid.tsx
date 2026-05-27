type IntroFeature = {
  icon: string;
  label: string;
};

type IntroFeatureGridProps = {
  features: IntroFeature[];
};

export default function IntroFeatureGrid({ features }: IntroFeatureGridProps) {
  return (
    <div className="mt-8 grid grid-cols-3 gap-3">
      {features.map((feature) => (
        <div
          key={feature.label}
          className="rounded-3xl border border-emerald-100 bg-white/85 p-4 text-center shadow-lg shadow-emerald-50 backdrop-blur"
        >
          <p className="text-xl">{feature.icon}</p>
          <p className="mt-2 text-[11px] font-semibold text-slate-600">
            {feature.label}
          </p>
        </div>
      ))}
    </div>
  );
}