import LanguageSwitcher from "@/components/language-switcher";
import Image from "next/image";

type HomeHeaderProps = {
  appName: string;
};

export default function HomeHeader({ appName }: HomeHeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <div>
        <div className="flex gap-2 items-center">
          <div className="p-1 rounded-full overflow-hidden bg-white shadow-lg">
            <Image
              src="/icon/caremate-icon.png"
              alt="Caremate Icon"
              width={32}
              height={32}
            />
          </div>

          <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-950">
            {appName}
          </h1>
        </div>
      </div>

      <LanguageSwitcher />
    </header>
  );
}