export type RegisterForm = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  registerAs: string;
  addressLine: string;
  province: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  careNote: string;
  username: string;
};

export type LineProfile = {
  lineId: string;
  name: string;
  picture: string;
  email: string;
};

export type RelativeMember = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  registerAs: string;
  addressLine: string;
  province: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  careNote: string;
  relationship: string;
  isDefault: boolean;
  isActive: boolean;
  seq: number;
  createdAt: string;
};

export type GetRelativesData = {
  total: number;
  relatives: RelativeMember[];
};

export type CreateRelativeForm = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  registerAs: string;
  addressLine: string;
  province: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  careNote: string;
  relationship: string;
  isDefault: boolean;
};

export type Nullable<T> = T | null;

export type RelativeByIDMember = {
  id: string;
  userId: string;
  informationId: string;

  relationship: string;
  isDefault: boolean;
  isActive: boolean;
  seq: number;

  firstName: string;
  lastName: string;
  nickname?: Nullable<string>;
  fullName?: Nullable<string>;
  gender?: Nullable<string>;
  dateOfBirth?: Nullable<string>;

  email?: Nullable<string>;
  phone?: Nullable<string>;

  addressLine?: Nullable<string>;
  subdistrict?: Nullable<string>;
  district?: Nullable<string>;
  province?: Nullable<string>;
  postalCode?: Nullable<string>;
  latitude?: Nullable<number>;
  longitude?: Nullable<number>;

  emergencyContactName?: Nullable<string>;
  emergencyContactPhone?: Nullable<string>;
  emergencyContactRelationship?: Nullable<string>;

  bloodType?: Nullable<string>;
  allergies?: Nullable<string>;
  congenitalDiseases?: Nullable<string>;
  currentMedications?: Nullable<string>;
  careNote?: Nullable<string>;

  relativeCreatedAt?: Nullable<string>;
  informationCreatedAt?: Nullable<string>;
  informationUpdatedAt?: Nullable<string>;
};

export type GetRelativeByIDData = {
  relative: RelativeByIDMember;
};
export type MemberSettingForm = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  registerAs: string;
  relationship: string;

  addressLine: string;
  subdistrict: string;
  district: string;
  province: string;
  postalCode: string;
  latitude: string;
  longitude: string;

  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;

  bloodType: string;
  allergies: string;
  congenitalDiseases: string;
  currentMedications: string;
  careNote: string;

  isDefault: boolean;
};


