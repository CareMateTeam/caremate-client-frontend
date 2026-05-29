const serviceIconMap: Record<string, string> = {
  home: "🏠",
  activity: "🏃",
  stethoscope: "🩺",
  pill: "💊",
  therapy: "🧘",
  car: "🚗",
};

export function getServiceIcon(iconName?: string | null) {
  if (!iconName) return "💙";
  return serviceIconMap[iconName] ?? "💙";
}

export function formatMoney(value: number) {
  return new Intl.NumberFormat("th-TH", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}