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