"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { unwrapApiData } from "@/libs/user/map-user-profile";
import { BackendCareService, CareServicesData } from "@/dto/service";
import { bookingSteps, timeSlots } from "@/constants/booking";
import { PaymentButton } from "@/components/button/payment-button";
import LanguageSwitcher from "@/components/language-switcher";
import Image from "next/image";
import { useI18n } from "@/libs/i18n/i18n-provider";
import {
  BookingCareTargetDetail,
  BookingMemberOption,
  RelativeListItem,
  TimeMode,
} from "@/dto/booking";
import {
  buildAddressText,
  getFullName,
  getRelationshipLabel,
  getUserFromMeResponse,
  hasValidLatLong,
  normalizeRelativeCareTargetDetail,
  normalizeSelfCareTargetDetail,
  toNullableNumber,
} from "@/libs/general/string-handler";
import AddressRequiredPopup from "@/components/card/address-require-popup";
import BookingDateTimeStep from "@/components/booking/booking-date-time-step";
import BookingCareTargetStep from "@/components/booking/booking-care-target-step";
import BookingNoteStep from "@/components/booking/booking-note-step";
import BookingAddressStep from "@/components/booking/booking-address-step";
import BookingPaymentStep from "@/components/booking/booking-payment-step";
import BookingServiceSummary from "@/components/booking/booking-service-summary";
import BookingStepIndicator from "@/components/booking/booking-step-indicator";

export default function BookingDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useI18n();
  const serviceId = searchParams.get("serviceId") ?? "";
  const serviceSlug = searchParams.get("service") ?? "";
  const today = new Date().toISOString().slice(0, 10);
  const [currentStep, setCurrentStep] = useState(1);
  const [services, setServices] = useState<BackendCareService[]>([]);
  const [loadingService, setLoadingService] = useState(true);
  const [serviceError, setServiceError] = useState("");
  const [memberOptions, setMemberOptions] = useState<BookingMemberOption[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(true);
  const [memberError, setMemberError] = useState("");
  const [date, setDate] = useState(today);
  const [timeMode, setTimeMode] = useState<TimeMode>("");
  const [selectedTime, setSelectedTime] = useState("");
  const [rangeStartTime, setRangeStartTime] = useState("09:00");
  const [rangeEndTime, setRangeEndTime] = useState("12:00");
  const [selectedCareTargetId, setSelectedCareTargetId] = useState("self");
  const [note, setNote] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("promptpay");
  const [selectedCareTargetDetail, setSelectedCareTargetDetail] =
    useState<BookingCareTargetDetail | null>(null);
  const [addressPopup, setAddressPopup] = useState<{
    open: boolean;
    title: string;
    description: string;
    href: string;
    target?: string;
  }>({
    open: false,
    title: "",
    description: "",
    href: "",
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoadingService(true);
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
        setServices(serviceData.services ?? []);
      } catch (error) {
        console.error("Fetch service detail error:", error);
        setServiceError("ไม่สามารถโหลดข้อมูลบริการได้");
      } finally {
        setLoadingService(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoadingMembers(true);
        setMemberError("");

        const selfRes = await fetch("/api/auth/me", {
          method: "GET",
          cache: "no-store",
        });

        const selfJson = await selfRes.json().catch(() => null);

        if (!selfRes.ok) {
          throw new Error(selfJson?.message ?? "ไม่สามารถโหลดข้อมูลผู้ใช้ได้");
        }

        const selfData = unwrapApiData<Record<string, any>>(selfJson);
        const user = getUserFromMeResponse(selfData);

        const selfName =
          user?.displayName ||
          getFullName(user?.firstName, user?.lastName, user?.fullName) ||
          "ตัวฉันเอง";
        const selfLatitude = toNullableNumber(user?.latitude);
        const selfLongitude = toNullableNumber(user?.longitude);

        const options: BookingMemberOption[] = [
          {
            id: "self",
            type: "self",
            name: selfName,
            subtitle: "ดูแลตัวเราเอง",
            phone: user?.phone,
            relationship: "self",
            latitude: selfLatitude,
            longitude: selfLongitude,
            addressText: buildAddressText({
              addressLine: user?.addressLine,
              subdistrict: user?.subdistrict,
              district: user?.district,
              province: user?.province,
              postalCode: user?.postalCode,
            }),
          },
        ];

        const relativeRes = await fetch("/api/relative", {
          method: "GET",
          cache: "no-store",
        });

        const relativeJson = await relativeRes.json().catch(() => null);

        if (relativeRes.ok) {
          const relativeData = unwrapApiData<Record<string, any>>(relativeJson);

          const relatives: RelativeListItem[] =
            relativeData?.relatives ??
            relativeData?.items ??
            relativeData?.data ??
            [];

          relatives.forEach((relative) => {
            const id = relative.id ?? relative.relativeId;

            if (!id) {
              return;
            }

            const name =
              getFullName(
                relative.firstName,
                relative.lastName,
                relative.fullName,
              ) || "สมาชิก";

            options.push({
              id,
              type: "relative",
              name,
              subtitle: getRelationshipLabel(relative.relationship),
              phone: relative.phone,
              relationship: relative.relationship,
              latitude: toNullableNumber(relative.latitude),
              longitude: toNullableNumber(relative.longitude),
              addressText: buildAddressText({
                addressLine: relative.addressLine,
                subdistrict: relative.subdistrict,
                district: relative.district,
                province: relative.province,
                postalCode: relative.postalCode,
              }),
            });
          });
        }

        setMemberOptions(options);

        if (!selectedCareTargetId && options.length > 0) {
          setSelectedCareTargetId(options[0].id);
        }
      } catch (error) {
        console.error("Fetch booking members error:", error);
        setMemberError(
          error instanceof Error
            ? error.message
            : "ไม่สามารถโหลดรายชื่อสมาชิกได้",
        );

        setMemberOptions([
          {
            id: "self",
            type: "self",
            name: "ตัวฉันเอง",
            subtitle: "ดูแลตัวเราเอง",
            relationship: "self",
          },
        ]);
      } finally {
        setLoadingMembers(false);
      }
    };

    fetchMembers();
  }, [selectedCareTargetId]);

  const selectedService = useMemo(() => {
    return (
      services.find((item) => item.id === serviceId) ??
      services.find((item) => item.slug === serviceSlug) ??
      null
    );
  }, [services, serviceId, serviceSlug]);

  const selectedCareTarget = useMemo(() => {
    return (
      memberOptions.find((item) => item.id === selectedCareTargetId) ?? null
    );
  }, [memberOptions, selectedCareTargetId]);

  const isRangeTimeValid = useMemo(() => {
    if (!rangeStartTime || !rangeEndTime) {
      return false;
    }

    return rangeStartTime < rangeEndTime;
  }, [rangeStartTime, rangeEndTime]);

  const selectedTimeLabel = useMemo(() => {
    if (timeMode === "fixed") {
      return selectedTime || "-";
    }

    if (timeMode === "range" && isRangeTimeValid) {
      return `${rangeStartTime} - ${rangeEndTime}`;
    }

    return "-";
  }, [timeMode, selectedTime, rangeStartTime, rangeEndTime, isRangeTimeValid]);

  const canGoNext = useMemo(() => {
    if (currentStep === 1) {
      if (!date || !timeMode) {
        return false;
      }

      if (timeMode === "fixed") {
        return Boolean(selectedTime);
      }

      if (timeMode === "range") {
        return isRangeTimeValid;
      }

      return false;
    }

    if (currentStep === 2) {
      return Boolean(selectedCareTargetId);
    }

    if (currentStep === 3) {
      return true;
    }

    if (currentStep === 4) {
      return address.trim().length > 0;
    }

    if (currentStep === 5) {
      return Boolean(paymentMethod);
    }

    return false;
  }, [
    currentStep,
    date,
    timeMode,
    selectedTime,
    isRangeTimeValid,
    selectedCareTargetId,
    address,
    paymentMethod,
  ]);

  const serviceFee = selectedService?.base_fee ?? 0;
  const platformFee = 20;
  const totalPrice = serviceFee + platformFee;

  const handleSelectTimeMode = (nextMode: TimeMode) => {
    setTimeMode(nextMode);

    if (nextMode === "fixed") {
      setRangeStartTime("09:00");
      setRangeEndTime("12:00");
      return;
    }

    if (nextMode === "range") {
      setSelectedTime("");
    }
  };

  const handleNext = async () => {
    if (!canGoNext) return;

    if (currentStep === 2) {
      const addressReady = await verifySelectedCareTargetAddress();

      if (!addressReady) {
        return;
      }
    }

    if (currentStep < bookingSteps.length) {
      setCurrentStep((prev) => prev + 1);
      return;
    }

    const payload = {
      serviceId: selectedService?.id,
      serviceSlug,
      date,
      timeMode,
      time:
        timeMode === "fixed"
          ? selectedTime
          : {
              startTime: rangeStartTime,
              endTime: rangeEndTime,
            },
      careTarget: {
        id: selectedCareTarget?.id,
        type: selectedCareTarget?.type,
        name: selectedCareTarget?.name,
        relationship: selectedCareTarget?.relationship,
        latitude: selectedCareTarget?.latitude,
        longitude: selectedCareTarget?.longitude,
      },
      note,
      address,
      paymentMethod,
      totalPrice,
    };

    console.log("Mock booking payload:", payload);
    alert("จองสำเร็จแบบจำลอง");
  };
  const openAddressRequiredPopup = (target: BookingMemberOption) => {
    if (target.type === "self") {
      setAddressPopup({
        open: true,
        title: "คุณยังไม่ตั้งค่าที่อยู่ปัจจุบัน",
        description:
          "ระบบยังไม่พบตำแหน่งของคุณ กรุณาไปตั้งค่าที่อยู่ในหน้าโปรไฟล์ก่อนทำการจอง",
        href: "/profile/addresses",
      });
      return;
    }

    setAddressPopup({
      open: true,
      title: `สมาชิกยังไม่ตั้งค่าที่อยู่ปัจจุบัน`,
      target: `${target.name}`,
      description:
        "ระบบยังไม่พบตำแหน่งของสมาชิกคนนี้ กรุณาไปตั้งค่าที่อยู่ของสมาชิกก่อนทำการจอง",
      href: `/members/${target.id}`,
    });
  };

  const verifySelectedCareTargetAddress = async () => {
    const target = selectedCareTarget;

    if (!target) {
      return false;
    }

    try {
      if (target.type === "self") {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          cache: "no-store",
        });

        const json = await res.json().catch(() => null);

        if (!res.ok) {
          throw new Error(json?.message ?? "ไม่สามารถตรวจสอบที่อยู่ของคุณได้");
        }

        const data = unwrapApiData<Record<string, any>>(json);
        const user = getUserFromMeResponse(data);

        const detail = normalizeSelfCareTargetDetail(user);

        const latitude = detail.latitude;
        const longitude = detail.longitude;

        if (!hasValidLatLong(latitude, longitude)) {
          openAddressRequiredPopup(target);
          return false;
        }

        setSelectedCareTargetDetail(detail);

        setMemberOptions((prev) =>
          prev.map((item) =>
            item.id === "self"
              ? {
                  ...item,
                  latitude,
                  longitude,
                  addressText: buildAddressText({
                    addressLine: detail.addressLine,
                    subdistrict: detail.subdistrict,
                    district: detail.district,
                    province: detail.province,
                    postalCode: detail.postalCode,
                  }),
                }
              : item,
          ),
        );

        setAddress(
          buildAddressText({
            addressLine: detail.addressLine,
            subdistrict: detail.subdistrict,
            district: detail.district,
            province: detail.province,
            postalCode: detail.postalCode,
          }),
        );

        return true;
      }
      const res = await fetch(`/api/relative/${target.id}`, {
        method: "GET",
        cache: "no-store",
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(json?.message ?? "ไม่สามารถตรวจสอบที่อยู่สมาชิกได้");
      }

      const data = unwrapApiData<Record<string, any>>(json);
      const relative = data?.relative ?? data;

      const detail = normalizeRelativeCareTargetDetail(relative);

      const latitude = detail.latitude;
      const longitude = detail.longitude;

      if (!hasValidLatLong(latitude, longitude)) {
        openAddressRequiredPopup(target);
        return false;
      }

      setSelectedCareTargetDetail(detail);

      const addressText = buildAddressText({
        addressLine: detail.addressLine,
        subdistrict: detail.subdistrict,
        district: detail.district,
        province: detail.province,
        postalCode: detail.postalCode,
      });

      setMemberOptions((prev) =>
        prev.map((item) =>
          item.id === target.id
            ? {
                ...item,
                latitude,
                longitude,
                addressText,
              }
            : item,
        ),
      );

      setAddress(addressText);

      return true;
    } catch (error) {
      console.error("Verify care target address error:", error);

      setAddressPopup({
        open: true,
        title: "ไม่สามารถตรวจสอบที่อยู่ได้",
        description:
          error instanceof Error
            ? error.message
            : "เกิดข้อผิดพลาดระหว่างตรวจสอบที่อยู่ กรุณาลองใหม่อีกครั้ง",
        href:
          target.type === "self"
            ? "/profile/addresses"
            : `/members/${target.id}`,
      });

      return false;
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      return;
    }

    router.back();
  };

  return (
    <main className="min-h-screen  ">
      <section className="mx-auto max-w-md space-y-5">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
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

        <BookingServiceSummary
          loadingService={loadingService}
          serviceError={serviceError}
          selectedService={selectedService}
        />

        <BookingStepIndicator steps={bookingSteps} currentStep={currentStep} />

        <section className="mb-6 rounded-xl border border-white bg-white/90 p-4 shadow-lg">
          {currentStep === 1 && (
            <BookingDateTimeStep
              today={today}
              date={date}
              timeMode={timeMode}
              selectedTime={selectedTime}
              timeSlots={timeSlots}
              rangeStartTime={rangeStartTime}
              rangeEndTime={rangeEndTime}
              isRangeTimeValid={isRangeTimeValid}
              onDateChange={setDate}
              onSelectTimeMode={handleSelectTimeMode}
              onSelectedTimeChange={setSelectedTime}
              onRangeStartTimeChange={setRangeStartTime}
              onRangeEndTimeChange={setRangeEndTime}
            />
          )}

          {currentStep === 2 && (
            <BookingCareTargetStep
              loadingMembers={loadingMembers}
              memberError={memberError}
              memberOptions={memberOptions}
              selectedCareTargetId={selectedCareTargetId}
              onSelectCareTarget={setSelectedCareTargetId}
            />
          )}

          {currentStep === 3 && (
            <BookingNoteStep note={note} onNoteChange={setNote} />
          )}

          {currentStep === 4 && (
            <BookingAddressStep
              address={address}
              selectedCareTarget={selectedCareTarget}
              onEditAddress={() => {
                if (!selectedCareTarget) return;

                router.push(
                  selectedCareTarget.type === "self"
                    ? "/profile/addresses"
                    : `/members/${selectedCareTarget.id}`,
                );
              }}
            />
          )}

          {currentStep === 5 && (
            <BookingPaymentStep
              selectedService={selectedService}
              date={date}
              selectedTimeLabel={selectedTimeLabel}
              selectedCareTarget={selectedCareTarget}
              selectedCareTargetDetail={selectedCareTargetDetail}
              paymentMethod={paymentMethod}
              serviceFee={serviceFee}
              platformFee={platformFee}
              totalPrice={totalPrice}
              onPaymentMethodChange={setPaymentMethod}
            />
          )}
        </section>

        <section className=" z-20 w-full">
          <div className="mx-auto flex max-w-md gap-3">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="h-12 rounded-xl border border-slate-200 shadow-sm bg-white px-5 text-sm font-black text-slate-700 active:scale-[0.98]"
              >
                กลับ
              </button>
            )}

            <PaymentButton
              type="button"
              disabled={!canGoNext}
              onClick={handleNext}
              className="w-full"
            >
              {currentStep === bookingSteps.length ? "ยืนยันการจอง" : "ถัดไป"}
            </PaymentButton>
          </div>
        </section>

        <div className="h-24" />
      </section>
      {addressPopup.open && (
        <AddressRequiredPopup
          open={addressPopup.open}
          title={addressPopup.title}
          description={addressPopup.description}
          href={addressPopup.href}
          target={addressPopup.target}
          onConfirm={(href) => router.push(href)}
          onClose={() =>
            setAddressPopup({
              open: false,
              title: "",
              description: "",
              href: "",
              target: "",
            })
          }
        />
      )}
    </main>
  );
}
