export type BackendCareService = {
  id: string;
  slug: string;
  name_th: string;
  name_en: string;
  base_fee: number;
  icon_name: string | null;
  offer_ttl_minutes: number;
  is_active: boolean;
};

export type CareServicesData = {
  total: number;
  services: BackendCareService[];
};

