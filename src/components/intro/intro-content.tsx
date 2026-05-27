type IntroContentProps = {
  badge: string;
  headline1: string;
  headline2: string;
};

export default function IntroContent({
  badge,
  headline1,
  headline2,
}: IntroContentProps) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-lg backdrop-blur">
        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
        {badge}
      </div>

      <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-950">
        {headline1}
        <br />
        <span className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
          {headline2}
        </span>
      </h1>
    </div>
  );
}
