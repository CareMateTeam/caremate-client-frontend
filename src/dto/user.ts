export type UserInformation = {
  displayName: string;
  fullName: string;
  avatarUrl: string;
  role: string;
  phone: string;
  memberStatus: string;
  latitude?: number;
  longitude?: number;
};

export type UserProfileResponse = {
  id: string;
  lineId: string;
  name: string;
  phone: string;
  avatarUrl: string;
  isActive: boolean;
  information?: UserInformationProfile | null;
};

export type UserInformationProfile = {
  id: string;
  firstName: string;
  lastName: string;
  nickname?: string | null;
  gender?: string | null;
  dateOfBirth?: string | null;
  email?: string | null;
  addressLine?: string | null;
  subdistrict?: string | null;
  district?: string | null;
  province?: string | null;
  postalCode?: string | null;
  emergencyContactName?: string | null;
  emergencyContactPhone?: string | null;
  emergencyContactRelationship?: string | null;
  bloodType?: string | null;
  allergies?: string | null;
  congenitalDiseases?: string | null;
  currentMedications?: string | null;
  careNote?: string | null;
};

export type AddressForm = {
  addressLine: string;
  subdistrict: string;
  district: string;
  province: string;
  postalCode: string;
  latitude: string;
  longitude: string;
};
