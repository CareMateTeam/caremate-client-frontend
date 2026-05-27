import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { I18nProvider } from "@/libs/i18n/i18n-provider";
import {
  defaultLocale,
  isLocale,
  localeCookieName,
  type Locale,
} from "@/libs/i18n/config";
import { Prompt } from "next/font/google";

const prompt = Prompt({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CareMate - Secure LINE Login Demo",
  description:
    "caremate is a healthcare platform connecting patients, caregivers, and services through a secure LINE-based experience.",
  icons: {
    icon: "/caremate-logo.ico",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const raw = cookieStore.get(localeCookieName)?.value;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;

  return (
    <html lang={locale}>
      <body className={prompt.className}>
        <I18nProvider initialLocale={locale}>{children}</I18nProvider>
      </body>
    </html>
  );
}
