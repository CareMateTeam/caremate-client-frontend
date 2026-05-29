"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/libs/i18n/i18n-provider";
import { unwrapApiData } from "@/libs/user/map-user-profile";
import { BackendCareService, CareServicesData } from "@/dto/service";
import BookingTopBar from "@/components/booking/booking-top-bar";
import BookingHero from "@/components/booking/booking-hero";
import ServiceSection from "@/components/booking/service-section";

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

        setSelectedServiceId("");
      } catch (error) {
        console.error("Fetch care services error:", error);
        setServiceError(t.booking.fetchServiceError);
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
      <BookingTopBar appName={t.common.appName} />

      <BookingHero
        title={t.booking.title}
        headerDescription={t.booking.headerDescription}
      />

      <ServiceSection
        services={services}
        displayServices={displayServices}
        selectedService={selectedService}
        selectedServiceId={selectedServiceId}
        selectionSettled={selectionSettled}
        loadingServices={loadingServices}
        serviceError={serviceError}
        onSelectService={handleSelectService}
        onContinueBooking={handleContinueBooking}
        text={{
          chooseServiceTitle: t.booking.chooseServiceTitle,
          hintSelected: t.booking.hintSelected,
          hintDefault: t.booking.hintDefault,
          selectedBadge: t.booking.selectedBadge,
          serviceCount: t.booking.serviceCount,
          noServices: t.booking.noServices,
          startingPrice: t.booking.startingPrice,
          available: t.booking.available,
          unavailable: t.booking.unavailable,
          continueBooking: t.booking.continueBooking,
        }}
      />
    </section>
  );
}