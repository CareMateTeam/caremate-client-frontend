import { BILLING_STEP_MINUTES } from "@/constants/booking";

export function toDateInputValue(value?: string | null) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value.slice(0, 10);
  }

  return date.toISOString().slice(0, 10);
}

export function timeToMinutes(time: string) {
  const [hourRaw, minuteRaw] = time.split(":");

  const hour = Number(hourRaw);
  const minute = Number(minuteRaw);

  if (Number.isNaN(hour) || Number.isNaN(minute)) {
    return null;
  }

  return hour * 60 + minute;
}

export function getDurationMinutes(startTime: string, endTime: string) {
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);

  if (startMinutes === null || endMinutes === null) {
    return 0;
  }

  if (endMinutes <= startMinutes) {
    return 0;
  }

  return endMinutes - startMinutes;
}

export function roundUpToBillingStep(minutes: number) {
  if (minutes <= 0) {
    return 0;
  }

  return Math.ceil(minutes / BILLING_STEP_MINUTES) * BILLING_STEP_MINUTES;
}

export function minutesToHours(minutes: number) {
  return minutes / 60;
}

export function extractTimeRangeFromSlot(slot: string) {
  const matches = slot.match(/\d{1,2}:\d{2}/g);

  if (!matches || matches.length < 2) {
    return null;
  }

  return {
    startTime: matches[0],
    endTime: matches[1],
  };
}

export function formatDuration(minutes: number) {
  if (minutes <= 0) {
    return "-";
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours > 0 && remainingMinutes > 0) {
    return `${hours} ชม. ${remainingMinutes} นาที`;
  }

  if (hours > 0) {
    return `${hours} ชม.`;
  }

  return `${remainingMinutes} นาที`;
}