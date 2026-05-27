"use client";

import { useI18n } from "@/libs/i18n/i18n-provider";

export default function BookingPage() {
  const { t } = useI18n();
  return <div>{t.booking.title}</div>;
}
