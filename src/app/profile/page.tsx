"use client";

import { useI18n } from "@/libs/i18n/i18n-provider";

export default function ProfilePage() {
  const { t } = useI18n();
  return <div>{t.profile.title}</div>;
}
