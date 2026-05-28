export type HealthInformationForm = {
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;
  bloodType: string;
  allergies: string;
  congenitalDiseases: string;
  currentMedications: string;
  careNote: string;
};

export type HealthInformationResponse = {
  user_id?: string;
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
  emergency_contact_relationship: string | null;
  blood_type: string | null;
  allergies: string | null;
  congenital_diseases: string | null;
  current_medications: string | null;
  care_note: string | null;
  has_health_information?: boolean;
};