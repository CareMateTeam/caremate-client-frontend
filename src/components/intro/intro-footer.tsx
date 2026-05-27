type IntroFooterProps = {
  loginButton: string;
  loginFooter: string;
  onLogin: () => void;
};

export default function IntroFooter({
  loginButton,
  loginFooter,
  onLogin,
}: IntroFooterProps) {
  return (
    <footer className="pb-2">
      <button
        type="button"
        onClick={onLogin}
        className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-[1.4rem] bg-[#06C755] px-5 py-3 text-base font-bold text-white shadow-2xl shadow-[#06C755]/25 transition active:scale-[0.98]"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 opacity-0 transition group-hover:opacity-100" />

        <span className="relative text-xl">{loginButton}</span>
      </button>

      <p className="mt-4 text-center text-[11px] leading-5 text-slate-500">
        {loginFooter}
      </p>
    </footer>
  );
}
