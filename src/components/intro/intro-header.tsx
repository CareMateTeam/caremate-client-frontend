import Image from "next/image";
import LanguageSwitcher from "@/components/language-switcher";

type IntroHeaderProps = {
  appName: string;
  tagline: string;
};

export default function IntroHeader({ appName, tagline }: IntroHeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="grid place-items-center rounded-full border border-emerald-200 bg-white p-1 shadow-lg shadow-emerald-100">
          <Image
            src="/icon/caremate-icon.png"
            className="h-8 w-8"
            alt="CareMate Logo"
            width={60}
            height={60}
          />
        </div>

        <div>
          <p className="text-lg font-bold tracking-tight text-slate-950">
            {appName}
          </p>
          <p className="text-xs text-emerald-700">{tagline}</p>
        </div>
      </div>

      <LanguageSwitcher />
    </header>
  );
}