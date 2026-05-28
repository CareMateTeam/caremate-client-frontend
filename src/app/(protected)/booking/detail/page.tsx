"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { unwrapApiData } from "@/libs/user/map-user-profile";
import { BackendCareService, CareServicesData } from "@/dto/service";
import { stepsForBooking, timeSlots } from "@/constants/booking";
import { PaymentButton } from "@/components/button/payment-button";
import {
  SummaryRowDark,
  SummaryRowLight,
} from "@/components/format/summary-row";
import { formatMoney } from "@/libs/general/currency-format";
import { ArrowLeft } from "lucide-react";

export default function BookingDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const serviceId = searchParams.get("serviceId") ?? "";
  const serviceSlug = searchParams.get("service") ?? "";

  const today = new Date().toISOString().slice(0, 10);

  const [currentStep, setCurrentStep] = useState(1);

  const [services, setServices] = useState<BackendCareService[]>([]);
  const [loadingService, setLoadingService] = useState(true);
  const [serviceError, setServiceError] = useState("");

  const [date, setDate] = useState(today);
  const [selectedTime, setSelectedTime] = useState("");
  const [note, setNote] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("promptpay");

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

  const selectedService = useMemo(() => {
    return (
      services.find((item) => item.id === serviceId) ??
      services.find((item) => item.slug === serviceSlug) ??
      null
    );
  }, [services, serviceId, serviceSlug]);

  const canGoNext = useMemo(() => {
    if (currentStep === 1) return Boolean(date && selectedTime);
    if (currentStep === 2) return true;
    if (currentStep === 3) return address.trim().length > 0;
    if (currentStep === 4) return Boolean(paymentMethod);
    return false;
  }, [currentStep, date, selectedTime, address, paymentMethod]);

  const serviceFee = selectedService?.base_fee ?? 0;
  const platformFee = 20;
  const totalPrice = serviceFee + platformFee;

  const handleNext = () => {
    if (!canGoNext) return;

    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
      return;
    }

    alert("จองสำเร็จแบบจำลอง");
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      return;
    }

    router.back();
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-cyan-50 via-white to-white px-5 py-6">
      <section className="mx-auto max-w-md space-y-5">
        <header className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            className="grid px-4 py-1 text-base place-items-center rounded-2xl bg-white shadow-sm"
          >
            <ArrowLeft className="h-5 w-5 text-slate-700" />
          </button>

          <div className="text-center">
            <p className="text-xs font-semibold text-cyan-600">CareMate</p>
            <h1 className="text-lg font-black text-slate-950">
              รายละเอียดการจอง
            </h1>
          </div>

          <div className="h-11 w-11" />
        </header>

        <section className="rounded-lg border border-white bg-white/90 p-5 shadow-sm">
          {loadingService ? (
            <div className="animate-pulse space-y-3">
              <div className="h-5 w-36 rounded-full bg-slate-100" />
              <div className="h-4 w-24 rounded-full bg-slate-100" />
              <div className="h-8 w-full rounded-full bg-slate-100" />
            </div>
          ) : serviceError ? (
            <p className="text-sm font-semibold text-red-500">{serviceError}</p>
          ) : selectedService ? (
            <div>
              <p className="text-xs font-semibold text-slate-400">
                บริการที่เลือก
              </p>

              <div className="mt-2 flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-black text-slate-950">
                    {selectedService.name_th}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {selectedService.name_en}
                  </p>
                </div>

                <div className="rounded-2xl bg-cyan-50 px-3 py-2 text-right">
                  <p className="text-[10px] font-semibold text-cyan-600">
                    เริ่มต้น
                  </p>
                  <p className="text-base font-black text-cyan-700">
                    {formatMoney(selectedService.base_fee)} ฿
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p className="font-bold text-slate-900">ไม่พบข้อมูลบริการ</p>
              <p className="mt-1 text-sm text-slate-500">
                กรุณากลับไปเลือกบริการใหม่อีกครั้ง
              </p>
            </div>
          )}
        </section>

        <section className="rounded-lg border border-white bg-white/80 p-4 shadow-sm">
          <div className="grid grid-cols-4 gap-2">
            {stepsForBooking.map((step) => {
              const active = currentStep === step.id;
              const completed = currentStep > step.id;

              return (
                <div key={step.id} className="text-center">
                  <div
                    className={[
                      "mx-auto grid h-9 w-9 place-items-center rounded-full text-sm font-black transition",
                      active
                        ? "bg-cyan-500 text-white shadow-md shadow-cyan-100"
                        : completed
                          ? "bg-emerald-500 text-white"
                          : "bg-slate-100 text-slate-400",
                    ].join(" ")}
                  >
                    {completed ? "✓" : step.id}
                  </div>
                  <p
                    className={[
                      "mt-2 text-[10px] font-bold",
                      active ? "text-cyan-700" : "text-slate-400",
                    ].join(" ")}
                  >
                    {step.title}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-xl mb-6 border border-white bg-white/90 p-5 shadow-lg">
          {currentStep === 1 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-black text-slate-950">
                  เลือกวันและเวลา
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  เลือกช่วงเวลาที่ต้องการรับบริการ
                </p>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-slate-700">
                  วันที่
                </span>
                <input
                  type="date"
                  min={today}
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  className="h-13 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                />
              </label>

              <div>
                <p className="mb-3 text-sm font-bold text-slate-700">
                  ช่วงเวลา
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map((slot) => {
                    const active = selectedTime === slot;

                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
                        className={[
                          "p-2 rounded-full border text-sm font-extrabold transition active:scale-[0.98]",
                          active
                            ? "border-cyan-500 bg-cyan-500 text-white shadow-md shadow-cyan-100"
                            : "border-slate-200 bg-white text-slate-600 hover:border-cyan-300",
                        ].join(" ")}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-black text-slate-950">
                  หมายเหตุเพิ่มเติม
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  ระบุรายละเอียดสำคัญให้ผู้ดูแลทราบ
                </p>
              </div>

              <textarea
                rows={7}
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="เช่น ผู้ป่วยเดินไม่สะดวก, ต้องช่วยเตือนกินยา, มีโรคประจำตัว, มีอาหารที่แพ้"
                className="w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-4 text-sm leading-6 outline-none placeholder:text-slate-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
              />

              <p className="rounded-full  bg-cyan-50 px-4 py-1 text-xs leading-5 text-cyan-700">
                ถ้าไม่มีหมายเหตุ สามารถกดถัดไปได้เลย
              </p>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-black text-slate-950">
                  เลือกสถานที่
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  ระบุที่อยู่สำหรับเข้ารับบริการ
                </p>
              </div>

              <textarea
                rows={6}
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                placeholder="เช่น บ้านเลขที่, หมู่บ้าน, คอนโด, ชั้น, ห้อง, จุดสังเกต"
                className="w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-4 text-sm leading-6 outline-none placeholder:text-slate-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
              />

              <button
                type="button"
                className="p-2 h-fit w-full rounded-full border border-cyan-200 bg-cyan-50 text-sm font-extrabold text-cyan-700"
              >
                ใช้ตำแหน่งปัจจุบัน
              </button>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-black text-slate-950">ชำระเงิน</h2>
                <p className="mt-1 text-sm text-slate-500">
                  ตรวจสอบข้อมูลและเลือกช่องทางชำระเงิน
                </p>
              </div>

              <div className="space-y-3 rounded-3xl bg-slate-100 p-4">
                <SummaryRowLight
                  label="บริการ"
                  value={selectedService?.name_th ?? "-"}
                />
                <SummaryRowLight label="วันที่" value={date || "-"} />
                <SummaryRowLight label="เวลา" value={selectedTime || "-"} />
                <SummaryRowLight label="สถานที่" value={address || "-"} />
              </div>

              <div className="space-y-3">
                <PaymentButton
                  active={paymentMethod === "promptpay"}
                  title="PromptPay"
                  subtitle="ชำระผ่าน QR พร้อมเพย์"
                  onClick={() => setPaymentMethod("promptpay")}
                />

                <PaymentButton
                  active={paymentMethod === "cash"}
                  title="ชำระเงินสด"
                  subtitle="ชำระกับผู้ดูแลเมื่อให้บริการเสร็จ"
                  onClick={() => setPaymentMethod("cash")}
                />
              </div>

              <div className="rounded-xl bg-cyan-950 p-4 text-white">
                <SummaryRowDark
                  label="ค่าบริการ"
                  value={`${formatMoney(serviceFee)} ฿`}
                />
                <div className="mt-3">
                  <SummaryRowDark
                    label="ค่าธรรมเนียมระบบ"
                    value={`${formatMoney(platformFee)} ฿`}
                  />
                </div>

                <div className="mt-4 border-t border-white/10 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-cyan-100">
                      ยอดรวม
                    </span>
                    <span className="text-2xl font-black">
                      {formatMoney(totalPrice)} ฿
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        <footer className="sticky  bottom-4 z-20 flex gap-3">
          <button
            type="button"
            onClick={handleBack}
            className="py-3 h-fit w-24 rounded-xl bg-white text-sm font-extrabold text-slate-600 shadow-md"
          >
            กลับ
          </button>

          <button
            type="button"
            disabled={!canGoNext || !selectedService}
            onClick={handleNext}
            className={[
              "py-3 h-fit flex-1 rounded-xl text-sm font-extrabold shadow-lg transition active:scale-[0.98]",
              canGoNext && selectedService
                ? "bg-cyan-500 text-white shadow-cyan-100 hover:bg-cyan-600"
                : "cursor-not-allowed bg-slate-200 text-slate-400 shadow-none",
            ].join(" ")}
          >
            {currentStep === 5 ? "ยืนยันและชำระเงิน" : "ถัดไป"}
          </button>
        </footer>
      </section>
    </main>
  );
}
