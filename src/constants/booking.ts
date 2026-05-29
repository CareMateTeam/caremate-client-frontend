import {
  CalendarDays,
  CreditCard,
  MapPin,
  StickyNote,
  UsersRound,
} from "lucide-react";

export const timeSlots = [
  "08:00 - 10:00",
  "10:00 - 12:00",
  "13:00 - 15:00",
  "15:00 - 17:00",
  "18:00 - 20:00",
  "20:00 - 22:00",
];

export const stepsForBooking = [
  { id: 1, title: "เลือกเวลา" },
  { id: 2, title: "หมายเหตุ" },
  { id: 3, title: "สถานที่" },
  { id: 4, title: "ชำระเงิน" },
];

export const bookingSteps = [
  {
    id: 1,
    title: "วันเวลา",
    icon: CalendarDays,
  },
  {
    id: 2,
    title: "ผู้รับดูแล",
    icon: UsersRound,
  },
  {
    id: 3,
    title: "รายละเอียด",
    icon: StickyNote,
  },
  {
    id: 4,
    title: "ที่อยู่",
    icon: MapPin,
  },
  {
    id: 5,
    title: "ชำระเงิน",
    icon: CreditCard,
  },
];
