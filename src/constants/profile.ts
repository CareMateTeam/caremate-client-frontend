export type ProfileMenuKey =
  | "personalInfo"
  | "healthInfo"
  | "addresses"
  | "relatives"
  | "history"
  | "payment"
  | "settings";

export interface ProfileMenuItem {
  key: ProfileMenuKey;
  icon: string;
  href: string;
}

export const menuItems: ProfileMenuItem[] = [
  { key: "personalInfo", icon: "👤", href: "/profile/personal-information" },
  { key: "healthInfo", icon: "🩺", href: "/profile/health-information" },
  { key: "addresses", icon: "📍", href: "/profile/addresses" },
  { key: "relatives", icon: "🫶", href: "/members" },
  { key: "history", icon: "📋", href: "/booking/history" },
  { key: "payment", icon: "💳", href: "/profile/payment" },
  { key: "settings", icon: "⚙️", href: "/profile/settings" },
];
