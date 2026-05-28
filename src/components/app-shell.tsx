import { BottomNavbar } from "./button-nav-bar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen bg-transparent px-5 pb-28 pt-4 text-slate-900">
      {/* fixed background */}
      <div className="caremate-fixed-bg" />

      <div className="relative z-10 mx-auto max-w-md space-y-6">
        {children}
      </div>

      <BottomNavbar />
    </main>
  );
}