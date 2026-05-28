import { MapPosition } from "@/app/(protected)/profile/addresses/map-picker";
import { AddressForm } from "@/dto/user";

export function getMapPosition(form: AddressForm): MapPosition | null {
  if (!form.latitude.trim() || !form.longitude.trim()) {
    return null;
  }

  const lat = Number(form.latitude);
  const lng = Number(form.longitude);

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return null;
  }

  return {
    lat,
    lng,
  };
}

export function optional(value: string) {
  const trimmed = value.trim();
  return trimmed === "" ? "" : trimmed;
}

export function calculateAge(dateOfBirth?: string | null) {
  if (!dateOfBirth) return "-";

  const birthDate = new Date(dateOfBirth);

  if (Number.isNaN(birthDate.getTime())) {
    return "-";
  }

  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const hasNotHadBirthdayThisYear =
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() < birthDate.getDate());

  if (hasNotHadBirthdayThisYear) {
    age -= 1;
  }

  return age >= 0 ? `${age} ปี` : "-";
}

export function numberToInputValue(value?: number | null) {
  if (value === null || value === undefined) return "";
  return String(value);
}

export function inputToOptionalNumber(value: string) {
  const trimmed = value.trim();

  if (trimmed === "") {
    return null;
  }

  const numberValue = Number(trimmed);

  if (Number.isNaN(numberValue)) {
    return null;
  }

  return numberValue;
}
