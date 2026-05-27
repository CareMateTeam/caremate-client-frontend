type Props = {
  children: React.ReactNode;
};

export default function AppBackground({ children }: Props) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-emerald-50/40 to-sky-50/40" />
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-200/35 blur-3xl" />
      <div className="pointer-events-none absolute top-20 right-[-60px] h-80 w-80 rounded-full bg-sky-200/35 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-80px] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-rose-100/35 blur-3xl" />

      <div className="relative z-10">{children}</div>
    </div>
  );
}