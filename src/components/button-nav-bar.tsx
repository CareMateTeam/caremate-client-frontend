"use client";
import {
  Bell,
  CalendarRange,
  MessageCircleMore,
  SquareMenu,
  UserRound,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNavbar() {
  const pathname = usePathname();

  const menus = [
    {
      href: "/home",
      label: "Home",
      icon: <SquareMenu className="h-5 w-5" />,
    },
    {
      href: "/booking",
      label: "Booking",
      icon: <CalendarRange className="h-5 w-5" />,
    },
    // {
    //   href: "/chat",
    //   label: "Chat",
    //   icon: <MessageCircleMore className="h-5 w-5" />,
    // },
    {
      href: "/members",
      label: "Members",
      icon: <UsersRound className="h-5 w-5" />,
    },
    {
      href: "/notifications",
      label: "Notification",
      icon: <Bell className="h-5 w-5" />,
    },
    {
      href: "/profile",
      label: "Profile",
      icon: <UserRound className="h-5 w-5" />,
    },
  ];

  return (
    <nav className="fixed  inset-x-0 bottom-0 z-50 px-5 pb-4">
      <div
        className="mx-auto max-w-md rounded-[1.8rem] border
       border-gray-200 bg-white/90 p-2 shadow-2xl 
       backdrop-blur-xl"
      >
        <div className="grid grid-cols-5 gap-1">
          {menus.map((item) => {
            const isActive = pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center 
                    rounded-xl px-1 py-2 text-xs font-bold transition ${
                      isActive
                        ? "bg-gradient-to-br from-emerald-400 to-sky-600 text-white shadow-lg shadow-emerald-100"
                        : "text-slate-400 hover:bg-emerald-50 hover:text-emerald-600"
                    }`}
              >
                <span className="text-lg leading-none">{item.icon}</span>
                <span className="mt-1 text-[10px]">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
