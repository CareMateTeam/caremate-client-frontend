import { BackendCareService } from "@/dto/service";
import ServiceCard from "@/components/booking/service-card";
import ServiceLoadingGrid from "@/components/booking/service-loading-grid";

type ServiceSectionText = {
  chooseServiceTitle: string;
  hintSelected: string;
  hintDefault: string;
  selectedBadge: string;
  serviceCount: string;
  noServices: string;
  startingPrice: string;
  available: string;
  unavailable: string;
  continueBooking: string;
};

type ServiceSectionProps = {
  services: BackendCareService[];
  displayServices: BackendCareService[];
  selectedService: BackendCareService | null;
  selectedServiceId: string;
  selectionSettled: boolean;
  loadingServices: boolean;
  serviceError: string;
  onSelectService: (service: BackendCareService) => void;
  onContinueBooking: () => void;
  text: ServiceSectionText;
};

export default function ServiceSection({
  services,
  displayServices,
  selectedService,
  selectedServiceId,
  selectionSettled,
  loadingServices,
  serviceError,
  onSelectService,
  onContinueBooking,
  text,
}: ServiceSectionProps) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-950">
            {text.chooseServiceTitle}
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            {selectedService ? text.hintSelected : text.hintDefault}
          </p>
        </div>

        <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700">
          {selectedService
            ? text.selectedBadge
            : `${services.length} ${text.serviceCount}`}
        </span>
      </div>

      {loadingServices ? (
        <ServiceLoadingGrid />
      ) : serviceError ? (
        <div className="rounded-3xl border border-red-100 bg-red-50 p-5 text-sm font-medium text-red-600">
          {serviceError}
        </div>
      ) : services.length === 0 ? (
        <div className="rounded-3xl border border-white bg-white/80 p-5 text-sm font-medium text-slate-500 shadow-sm">
          {text.noServices}
        </div>
      ) : (
        <>
          <div
            className={[
              "grid gap-3 transition-all duration-300",
              selectedServiceId ? "grid-cols-1" : "grid-cols-2",
            ].join(" ")}
          >
            {displayServices.map((service) => {
              const active = selectedServiceId === service.id;
              const disabled = !service.is_active;
              const fadingOut =
                selectedServiceId && !active && !selectionSettled;

              return (
                <ServiceCard
                  key={service.id}
                  service={service}
                  active={active}
                  disabled={disabled}
                  fadingOut={Boolean(fadingOut)}
                  selectedServiceId={selectedServiceId}
                  startingPriceText={text.startingPrice}
                  availableText={text.available}
                  unavailableText={text.unavailable}
                  onSelectService={onSelectService}
                />
              );
            })}
          </div>

          {selectedService && selectionSettled && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <button
                type="button"
                onClick={onContinueBooking}
                className="mt-2 h-14 w-full rounded-2xl bg-cyan-500 px-5 text-sm font-extrabold text-white shadow-lg shadow-cyan-100 transition hover:bg-cyan-600 active:scale-[0.98]"
              >
                {text.continueBooking}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}