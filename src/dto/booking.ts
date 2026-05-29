export type BookingMemberOption = {
  id: string;
  type: CareTargetType;
  name: string;
  subtitle: string;
  phone?: string;
  relationship?: string;
  latitude?: number | null;
  longitude?: number | null;
  addressText?: string;
};
export type RelativeListItem = {
  id?: string;
  relativeId?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  phone?: string;
  relationship?: string;

  latitude?: number | null;
  longitude?: number | null;

  addressLine?: string | null;
  subdistrict?: string | null;
  district?: string | null;
  province?: string | null;
  postalCode?: string | null;
};

export type TimeMode = "" | "fixed" | "range";
export type CareTargetType = "self" | "relative";