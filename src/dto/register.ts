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