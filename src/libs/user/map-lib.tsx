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