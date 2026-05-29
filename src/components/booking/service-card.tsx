import { BackendCareService } from "@/dto/service";
import { formatMoney, getServiceIcon } from "@/libs/general/service-utils";

type ServiceCardProps = {
  service: BackendCareService;
  active: boolean;
  disabled: boolean;
  fadingOut: boolean;
  selectedServiceId: string;
  startingPriceText: string;
  availableText: string;
  unavailableText: string;
  onSelectService: (service: BackendCareService) => void;
};

export default function ServiceCard({
  service,
  active,
  disabled,
  fadingOut,
  selectedServiceId,
  startingPriceText,
  availableText,
  unavailableText,
  onSelectService,
}: ServiceCardProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onSelectService(service)}
      className={[
        "group relative overflow-hidden rounded-[1.75rem] border p-4 text-left transition-all duration-300 ease-out",
        selectedServiceId ? "min-h-[190px]" : "min-h-[168px]",
        disabled
          ? "cursor-not-allowed border-none bg-slate-100/80 opacity-70 shadow-sm"
          : active
            ? "scale-[1.01] border-cyan-400 bg-white shadow-lg"
            : "border-white bg-white shadow-md hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-white hover:shadow-md",
        fadingOut
          ? "pointer-events-none -translate-y-2 scale-95 opacity-0 blur-sm"
          : "translate-y-0 scale-100 opacity-100 blur-0",
      ].join(" ")}
    >
      <div
        className={[
          "absolute -right-8 -top-8 h-24 w-24 rounded-full transition-all duration-300",
          active ? "bg-cyan-100" : "bg-slate-100",
        ].join(" ")}
      />

      {active && (
        <div className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-cyan-500 text-xs font-bold text-white shadow-sm">
          ✓
        </div>
      )}

      <div className="relative z-10 flex h-full flex-col">
        <div
          className={[
            "mb-4 grid h-12 w-12 place-items-center rounded-2xl text-2xl shadow-sm transition-all duration-300",
            active
              ? "bg-cyan-500 text-white"
              : "bg-cyan-50 text-slate-700 group-hover:bg-cyan-100",
          ].join(" ")}
        >
          {getServiceIcon(service.icon_name)}
        </div>

        <div className="min-h-[54px]">
          <h3 className="line-clamp-2 text-sm font-extrabold leading-5 text-slate-950">
            {service.name_th}
          </h3>

          <p className="mt-1 line-clamp-1 text-[11px] font-medium text-slate-400">
            {service.name_en}
          </p>
        </div>

        <div className="mt-auto pt-4">
          <div className="flex items-end justify-between gap-2">
            <div>
              <p className="text-[10px] font-medium text-slate-400">
                {startingPriceText}
              </p>
              <p
                className={[
                  "text-base font-black",
                  active ? "text-cyan-700" : "text-slate-900",
                ].join(" ")}
              >
                ฿{formatMoney(service.base_fee)}
              </p>
            </div>

            <span
              className={[
                "rounded-full px-2.5 py-1 text-[10px] font-bold",
                service.is_active
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-slate-200 text-slate-500",
              ].join(" ")}
            >
              {service.is_active ? availableText : unavailableText}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}