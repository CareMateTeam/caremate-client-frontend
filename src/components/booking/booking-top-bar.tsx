import Image from "next/image";
import LanguageSwitcher from "@/components/language-switcher";

type BookingTopBarProps = {
  appName: string;
};

export default function BookingTopBar({ appName }: BookingTopBarProps) {
  return (
    <header className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2">
          <div className="overflow-hidden rounded-full bg-white p-1 shadow-lg">
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