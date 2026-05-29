import Link from "next/link";

type QuickAction = {
  title: string;
  description: string;
  href: string;
  icon: string;
  color: string;
};

type HomeQuickActionsProps = {
  quickActions: QuickAction[];
  quickActionTap: string;
};

export default function HomeQuickActions({
  quickActions,
  quickActionTap,
}: HomeQuickActionsProps) {
  return (
    <section className="grid grid-cols-2 gap-3">
      {quickActions.map((item) => (
        <Link
          key={item.title}
          href={item.href}
          className="group rounded-xl shadow-md  border border-gray-200 bg-white/90 p-4 transition active:scale-[0.98]"
        >
          <div
            className={[
              "grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br text-2xl text-white shadow-lg",
              item.color,
            ].join(" ")}
          >
            {item.icon}
          </div>

          <h3 className="mt-4 text-sm font-black text-slate-950">
            {item.title}
          </h3>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            {item.description}
          </p>

          <p className="mt-3 text-xs font-black text-cyan-600">
            {quickActionTap}
          </p>
        </Link>
      ))}
    </section>
  );
}