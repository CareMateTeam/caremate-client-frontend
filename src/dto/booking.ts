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

export type BookingCareTargetDetail = {
  id?: string;
  type: "self" | "relative";

  firstName?: string | null;
  lastName?: string | null;
  fullName?: string | null;
  nickname?: string | null;
  gender?: string | null;
  dateOfBirth?: string | null;

  email?: string | null;
  phone?: string | null;

  addressLine?: string | null;
  subdistrict?: string | null;
  district?: string | null;
  province?: string | null;
  postalCode?: string | null;
  latitude?: number | null;
  longitude?: number | null;

  emergencyContactName?: string | null;
  emergencyContactPhone?: string | null;
  emergencyContactRelationship?: string | null;

  bloodType?: string | null;
  allergies?: string | null;
  congenitalDiseases?: string | null;
  currentMedications?: string | null;
  careNote?: string | null;

  relationship?: string | null;
};
