type Props = {
  children: React.ReactNode;
};

export default function AppBackground({ children }: Props) {
  return (
    <main className="relative min-h-screen bg-transparent px-5 pb-28 pt-6 text-slate-900">
      {/* fixed background */}
      <div className="caremate-fixed-bg" />

      <div className="relative z-10 mx-auto max-w-md space-y-6">{children}</div>
    </main>
  );
}
