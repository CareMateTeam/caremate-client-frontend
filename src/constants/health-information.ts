import type { Dictionary } from "@/libs/i18n/dictionaries/en";

export const bloodTypeValues = ["", "A", "B", "AB", "O"] as const;

export type BloodTypeValue = (typeof bloodTypeValues)[number];

export function getBloodTypeOptions(t: Dictionary) {
  return [
    { label: t.bloodType.none, value: "" },
    { label: "A", value: "A" },
    { label: "B", value: "B" },
    { label: "AB", value: "AB" },
    { label: "O", value: "O" },
  ];
}

export function getRelationshipOptions(t: Dictionary) {
  return [
    { label: t.relationship.none, value: "" },
    { label: t.relationship.father, value: "father" },
    { label: t.relationship.mother, value: "mother" },
    { label: t.relationship.grandfather, value: "grandfather" },
    { label: t.relationship.grandmother, value: "grandmother" },
    { label: t.relationship.spouse, value: "spouse" },
    { label: t.relationship.child, value: "child" },
    { label: t.relationship.sibling, value: "sibling" },
    { label: t.relationship.relative, value: "relative" },
    { label: t.relationship.other, value: "other" },
  ];
}

export function getGenderOptions(t: Dictionary) {
  return [
    { value: "male", label: t.gender.male },
    { value: "female", label: t.gender.female },
    { value: "other", label: t.gender.other },
  ];
}

export function getRegisterAsOptions(t: Dictionary) {
  return [{ value: "client", label: t.registerAsRoles.client }];
}
