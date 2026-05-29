import { BookingCareTargetDetail } from "@/dto/booking";
import { RelativeMember } from "@/dto/register";

export function toNullableNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const numberValue =
    typeof value === "number" ? value : Number(String(value).trim());

  if (Number.isNaN(numberValue)) {
    return null;
  }

  return numberValue;
}

export function hasValidLatLong(latitude?: number | null, longitude?: number | null) {
  return typeof latitude === "number" && typeof longitude === "number";
}

export function buildAddressText(data: {
  addressLine?: string | null;
  subdistrict?: string | null;
  district?: string | null;
  province?: string | null;
  postalCode?: string | null;
}) {
  return [
    data.addressLine,
    data.subdistrict,
    data.district,
    data.province,
    data.postalCode,
  ]
    .filter(Boolean)
    .join(" ");
}

export function getUserFromMeResponse(data: Record<string, any>) {
  return data?.user ?? data?.profile ?? data?.information ?? data;
}

export  function getRelationshipLabel(value?: string) {
  switch (value) {
    case "father":
      return "พ่อ";
    case "mother":
      return "แม่";
    case "grandfather":
      return "ปู่ / ตา";
    case "grandmother":
      return "ย่า / ยาย";
    case "sibling":
      return "พี่น้อง";
    case "child":
      return "ลูก";
    case "spouse":
      return "คู่สมรส";
    case "other":
      return "อื่น ๆ";
    default:
      return "สมาชิกในครอบครัว";
  }
}

export function getFullName(firstName?: string, lastName?: string, fullName?: string) {
  const name = fullName?.trim();

  if (name) {
    return name;
  }

  return [firstName, lastName].filter(Boolean).join(" ").trim();
}

export function getInitials(member: RelativeMember) {
  const name = member.firstName || member.firstName || "?";
  return name.slice(0, 1);
}

export function getFirstName(name: string) {
  return name.slice(0, 1);
}

export function getDateString(value: unknown): string | null {
  if (!value) return null;

  if (typeof value === "string") {
    return value;
  }

  return null;
}

export function normalizeSelfCareTargetDetail(user: Record<string, any>) {
  const information = user?.information ?? user;

  return {
    id: user?.id ?? information?.id,
    type: "self" as const,

    firstName: information?.firstName ?? null,
    lastName: information?.lastName ?? null,
    fullName:
      [information?.firstName, information?.lastName]
        .filter(Boolean)
        .join(" ")
        .trim() ||
      user?.name ||
      null,
    nickname: information?.nickname ?? null,
    gender: information?.gender ?? null,
    dateOfBirth: getDateString(information?.dateOfBirth),

    email: information?.email ?? null,
    phone: information?.phone ?? user?.phone ?? null,

    addressLine: information?.addressLine ?? null,
    subdistrict: information?.subdistrict ?? null,
    district: information?.district ?? null,
    province: information?.province ?? null,
    postalCode: information?.postalCode ?? null,
    latitude:
      toNullableNumber(information?.latitude) ?? toNullableNumber(user?.latitude),
    longitude:
      toNullableNumber(information?.longitude) ?? toNullableNumber(user?.longitude),

    emergencyContactName: information?.emergencyContactName ?? null,
    emergencyContactPhone: information?.emergencyContactPhone ?? null,
    emergencyContactRelationship:
      information?.emergencyContactRelationship ?? null,

    bloodType: information?.bloodType ?? null,
    allergies: information?.allergies ?? null,
    congenitalDiseases: information?.congenitalDiseases ?? null,
    currentMedications: information?.currentMedications ?? null,
    careNote: information?.careNote ?? null,

    relationship: "self",
  } satisfies BookingCareTargetDetail;
}

export function normalizeRelativeCareTargetDetail(relative: Record<string, any>) {
  return {
    id: relative?.id ?? relative?.relativeId,
    type: "relative" as const,

    firstName: relative?.firstName ?? null,
    lastName: relative?.lastName ?? null,
    fullName:
      relative?.fullName ??
      [relative?.firstName, relative?.lastName].filter(Boolean).join(" ").trim() ??
      null,
    nickname: relative?.nickname ?? null,
    gender: relative?.gender ?? null,
    dateOfBirth: getDateString(relative?.dateOfBirth),

    email: relative?.email ?? null,
    phone: relative?.phone ?? null,

    addressLine: relative?.addressLine ?? null,
    subdistrict: relative?.subdistrict ?? null,
    district: relative?.district ?? null,
    province: relative?.province ?? null,
    postalCode: relative?.postalCode ?? null,
    latitude: toNullableNumber(relative?.latitude),
    longitude: toNullableNumber(relative?.longitude),

    emergencyContactName: relative?.emergencyContactName ?? null,
    emergencyContactPhone: relative?.emergencyContactPhone ?? null,
    emergencyContactRelationship:
      relative?.emergencyContactRelationship ?? null,

    bloodType: relative?.bloodType ?? null,
    allergies: relative?.allergies ?? null,
    congenitalDiseases: relative?.congenitalDiseases ?? null,
    currentMedications: relative?.currentMedications ?? null,
    careNote: relative?.careNote ?? null,

    relationship: relative?.relationship ?? null,
  } satisfies BookingCareTargetDetail;
}


export function valueOrDash(value?: string | number | null) {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  return String(value);
}