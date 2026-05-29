import {
  CalendarDays,
  CreditCard,
  MapPin,
  StickyNote,
  UsersRound,
} from "lucide-react";

import type { Dictionary } from "@/libs/i18n/dictionaries/en";

export const timeSlots = [
  "08:00 - 10:00",
  "10:00 - 12:00",
  "13:00 - 15:00",
  "15:00 - 17:00",
  "18:00 - 20:00",
  "20:00 - 22:00",
];

export type BookingStepKey =
  | "dateTime"
  | "careReceiver"
  | "detail"
  | "address"
  | "payment";

export interface BookingStep {
  id: number;
  key: BookingStepKey;
  title: string;
  icon: typeof CalendarDays;
}

export function getBookingSteps(t: Dictionary): BookingStep[] {
  return [
    {
      id: 1,
      key: "dateTime",
      title: t.bookingSteps.dateTime,
      icon: CalendarDays,
    },
    {
      id: 2,
      key: "careReceiver",
      title: t.bookingSteps.careReceiver,
      icon: UsersRound,
    },
    {
      id: 3,
      key: "detail",
      title: t.bookingSteps.detail,
      icon: StickyNote,
    },
    {
      id: 4,
      key: "address",
      title: t.bookingSteps.address,
      icon: MapPin,
    },
    {
      id: 5,
      key: "payment",
      title: t.bookingSteps.payment,
      icon: CreditCard,
    },
  ];
}

export const BILLING_STEP_MINUTES = 30;
