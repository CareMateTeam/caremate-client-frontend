type HomeHealthTipsProps = {
  tipsTitle: string;
  healthTips: string[];
};

export default function HomeHealthTips({
  tipsTitle,
  healthTips,
}: HomeHealthTipsProps) {
  return (
    <section className="rounded-[2rem] border border-amber-100 bg-amber-50 p-5 shadow-xl shadow-amber-50">
      <div className="flex items-start gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-2xl shadow-sm">
          💡
        </div>

        <div>
          <h2 className="text-lg font-black text-slate-950">{tipsTitle}</h2>

          <div className="mt-4 space-y-3">
            {healthTips.map((tip) => (
              <div key={tip} className="flex gap-3">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                <p className="text-sm leading-6 text-slate-600">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}