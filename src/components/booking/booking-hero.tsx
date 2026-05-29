type BookingHeroProps = {
  title: string;
  headerDescription: string;
};

export default function BookingHero({
  title,
  headerDescription,
}: BookingHeroProps) {
  return (
    <header className="rounded-xl border border-white/80 bg-white/85 p-5 shadow-sm backdrop-blur">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-cyan-600">CareMate</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
            {title}
          </h1>
        </div>

        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-100 text-2xl">
          🩺
        </div>
      </div>

      <p className="text-sm leading-6 text-slate-600">
        {headerDescription}
      </p>
    </header>
  );
}