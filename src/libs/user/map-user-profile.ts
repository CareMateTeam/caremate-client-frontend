import { ApiResponse } from "@/dto/api";
import type { UserInformation, UserProfileResponse } from "@/dto/user";

export function mapUserProfileToTopInformation(
  profile: UserProfileResponse,
): UserInformation {
  const firstName = profile.information?.firstName?.trim() ?? "";
  const lastName = profile.information?.lastName?.trim() ?? "";
  const fullName = `${firstName} ${lastName}`.trim();

  return {
    displayName: profile.name || firstName || "CareMate User",
    fullName: fullName || profile.name || "-",
    avatarUrl: profile.avatarUrl || "",
    role: "Member",
    phone: profile?.phone || profile.phone || "-",
    memberStatus: profile.isActive ? "Verified" : "Inactive",
  };
}

export function unwrapApiData<T>(data: ApiResponse<T> | T): T {
  const maybeWrapped = data as ApiResponse<T>;

  return maybeWrapped.data ?? maybeWrapped.Data ?? maybeWrapped.result ?? (data as T);
}

export function normalizeDateForInput(value?: string | null) {
  const raw = String(value ?? "").trim();

  if (!raw) return "";

  const datePart = raw.includes("T") ? raw.split("T")[0] : raw;

  if (/^\d{4}-\d{2}-\d{2}$/.test(datePart)) {
    return datePart;
  }

  return "";
}

export function formatBirthDateTH(value: string) {
  if (!value) return "-";

  const [year, month, day] = value.split("-");

  if (!year || !month || !day) return value;

  const months = [
    "",
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  const monthName = months[Number(month)] ?? month;
  const buddhistYear = Number(year) + 543;

  return `${Number(day)} ${monthName} ${buddhistYear}`;
}