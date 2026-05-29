import Link from "next/link";

type HomeCtaSectionProps = {
  ctaBadge: string;
  ctaLines: string[];
  ctaDescription: string;
  ctaManageMembers: string;
  ctaSeeServices: string;
};

export default function HomeCtaSection({
  ctaBadge,
  ctaLines,
  ctaDescription,
  ctaManageMembers,
  ctaSeeServices,
}: HomeCtaSectionProps) {
  return (
    <section className="rounded-[2rem] bg-slate-950 p-5 text-white shadow-2xl shadow-slate-200">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">
            {ctaBadge}
          </p>

          <h2 className="mt-2 text-2xl font-black leading-tight">
            {ctaLines.map((line, idx) => (
              <span key={idx}>
                {line}
                {idx < ctaLines.length - 1 && <br />}
              </span>
            ))}
          </h2>

          <p className="mt-3 text-sm leading-6 text-white/70">
            {ctaDescription}
          </p>
        </div>

        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/10 text-3xl">
          🤝
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <Link
          href="/members"
          className="rounded-2xl bg-white px-4 py-3 text-center text-sm font-black text-slate-950 active:scale-[0.98]"
        >
          {ctaManageMembers}
        </Link>

        <Link
          href="/services"
          className="rounded-2xl bg-cyan-500 px-4 py-3 text-center text-sm font-black text-white active:scale-[0.98]"
        >
          {ctaSeeServices}
        </Link>
      </div>
    </section>
  );
}