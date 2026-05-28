"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useI18n } from "@/libs/i18n/i18n-provider";
import LanguageSwitcher from "@/components/language-switcher";
import { unwrapApiData } from "@/libs/user/map-user-profile";
import { BackendCareService, CareServicesData } from "@/dto/service";

const serviceIconMap: Record<string, string> = {
  home: "🏠",
  activity: "🏃",
  stethoscope: "🩺",
  pill: "💊",
  therapy: "🧘",
  car: "🚗",
};

function getServiceIcon(iconName?: string | null) {
  if (!iconName) return "💙";
  return serviceIconMap[iconName] ?? "💙";
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("th-TH", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export default function BookingPage() {
  const router = useRouter();
  const { t } = useI18n();

  const [services, setServices] = useState<BackendCareService[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [serviceError, setServiceError] = useState("");

  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectionSettled, setSelectionSettled] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoadingServices(true);
        setServiceError("");

        const res = await fetch("/api/service", {
          method: "GET",
          cache: "no-store",
        });

        const json = await res.json().catch(() => null);

        if (!res.ok) {
          throw new Error(json?.message ?? "Failed to fetch services");
        }

        const serviceData = unwrapApiData<CareServicesData>(json);
        const serviceList = serviceData.services ?? [];

        setServices(serviceList);

        // ไม่ต้อง auto select แล้วครับ
        // ให้ user เป็นคนกดเลือกเอง
        setSelectedServiceId("");
      } catch (error) {
        console.error("Fetch care services error:", error);
        setServiceError("ไม่สามารถโหลดข้อมูลบริการได้");
      } finally {
        setLoadingServices(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    if (!selectedServiceId) {
      setSelectionSettled(false);
      return;
    }

    setSelectionSettled(false);

    const timer = window.setTimeout(() => {
      setSelectionSettled(true);
    }, 280);

    return () => window.clearTimeout(timer);
  }, [selectedServiceId]);

  const selectedService = useMemo(() => {
    return services.find((service) => service.id === selectedServiceId) ?? null;
  }, [services, selectedServiceId]);

  const displayServices = useMemo(() => {
    if (!selectedServiceId) return services;

    const selected = services.find((service) => service.id === selectedServiceId);
    const others = services.filter((service) => service.id !== selectedServiceId);

    if (!selected) return services;

    if (selectionSettled) {
      return [selected];
    }

    return [selected, ...others];
  }, [services, selectedServiceId, selectionSettled]);

  const handleSelectService = (service: BackendCareService) => {
    if (!service.is_active) return;

    if (selectedServiceId === service.id) {
      setSelectedServiceId("");
      setSelectionSettled(false);
      return;
    }

    setSelectedServiceId(service.id);
  };

  const handleContinueBooking = () => {
    if (!selectedService) return;

    router.push(
      `/booking/detail?serviceId=${selectedService.id}&service=${selectedService.slug}`,
    );
  };

  return (
    <section className="mx-auto max-w-md space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="overflow-hidden rounded-full bg-white p-1 shadow-lg">
              <Image
                src="/icon/caremate-icon.png"
                alt="Caremate Icon"
                width={32}
                height={32}
              />
            </div>

            <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-950">
              {t.common.appName}
            </h1>
          </div>
        </div>

        <LanguageSwitcher />
      </header>

      <header className="rounded-[2rem] border border-white/80 bg-white/85 p-5 shadow-sm backdrop-blur">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-cyan-600">CareMate</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
              {t.booking.title}
            </h1>
          </div>

          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-100 text-2xl">
            🩺
          </div>
        </div>

        <p className="text-sm leading-6 text-slate-600">
          เลือกบริการดูแลที่เหมาะกับคนสำคัญของคุณ พร้อมเลือกวัน เวลา
          และผู้ดูแลที่ต้องการได้ง่าย ๆ
        </p>
      </header>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-950">
              เลือกประเภทบริการ
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              {selectedService
                ? "แตะการ์ดเดิมอีกครั้งเพื่อยกเลิกการเลือก"
                : "เลือกบริการที่ต้องการให้ CareMate ช่วยดูแล"}
            </p>
          </div>

          <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700">
            {selectedService ? "เลือกแล้ว" : `${services.length} บริการ`}
          </span>
        </div>

        {loadingServices ? (
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-[168px] animate-pulse rounded-[1.75rem] border border-white bg-white/70 p-4 shadow-sm"
              >
                <div className="mb-4 h-12 w-12 rounded-2xl bg-slate-100" />
                <div className="mb-2 h-4 w-24 rounded-full bg-slate-100" />
                <div className="h-3 w-16 rounded-full bg-slate-100" />
                <div className="mt-5 h-6 w-20 rounded-full bg-slate-100" />
              </div>
            ))}
          </div>
        ) : serviceError ? (
          <div className="rounded-3xl border border-red-100 bg-red-50 p-5 text-sm font-medium text-red-600">
            {serviceError}
          </div>
        ) : services.length === 0 ? (
          <div className="rounded-3xl border border-white bg-white/80 p-5 text-sm font-medium text-slate-500 shadow-sm">
            ยังไม่มีข้อมูลบริการ
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
                const fadingOut = selectedServiceId && !active && !selectionSettled;

                return (
                  <button
                    key={service.id}
                    type="button"
                    disabled={disabled}
                    onClick={() => handleSelectService(service)}
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
                              เริ่มต้น
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
                            {service.is_active ? "พร้อมให้บริการ" : "ไม่พร้อมให้บริการ"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedService && selectionSettled && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <button
                  type="button"
                  onClick={handleContinueBooking}
                  className="mt-2 h-14 w-full rounded-2xl bg-cyan-500 px-5 text-sm font-extrabold text-white shadow-lg shadow-cyan-100 transition hover:bg-cyan-600 active:scale-[0.98]"
                >
                  กดเพื่อจองต่อ
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </section>
  );
}