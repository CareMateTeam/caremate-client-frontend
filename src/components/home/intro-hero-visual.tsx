import Image from "next/image";

type IntroHeroVisualProps = {
  aiCare: string;
  secureLogin: string;
};

export default function IntroHeroVisual({
  aiCare,
  secureLogin,
}: IntroHeroVisualProps) {
  return (
    <div className="relative mb-8 grid place-items-center">
      <div className="absolute h-72 w-72 rounded-full border border-emerald-300/30" />
      <div className="absolute h-56 w-56 animate-pulse rounded-full border border-cyan-300/40" />
      <div className="absolute h-40 w-40 rounded-full bg-emerald-300/25 blur-2xl" />

      <div className="relative grid h-60 w-60 place-items-center rounded-full border border-white bg-white/75 shadow-2xl shadow-emerald-100 backdrop-blur-xl">
        <div className="absolute inset-4 rounded-full border border-dashed border-emerald-300/60" />
        <div className="absolute inset-8 rounded-full border border-cyan-300/50" />

        <div className="relative grid h-28 w-28 place-items-center rounded-[2rem] border border-emerald-200 bg-white shadow-xl shadow-emerald-100">
          <div className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-emerald-400 shadow-lg shadow-emerald-300/70" />

          <Image
            src="/logo/caremate-logo.png"
            className="h-24 w-24 rounded-lg"
            alt="CareMate Logo"
            width={80}
            height={80}
          />
        </div>

        <div className="absolute left-0 top-10 rounded-2xl border border-cyan-100 bg-white/90 px-3 py-2 text-[11px] font-semibold text-cyan-700 shadow-lg backdrop-blur">
          {aiCare}
        </div>

        <div className="absolute bottom-12 right-0 rounded-2xl border border-emerald-100 bg-white/90 px-3 py-2 text-[11px] font-semibold text-emerald-700 shadow-lg backdrop-blur">
          {secureLogin}
        </div>
      </div>
    </div>
  );
}