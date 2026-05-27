"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/libs/i18n/i18n-provider";

type ServiceType = {
  id: string;
  title: string;
  description: string;
  price: number;
  icon: string;
};

type Caregiver = {
  id: string;
  name: string;
  role: string;
  rating: number;
  experience: string;
  pricePerHour: number;
  available: boolean;
};

const services: ServiceType[] = [
  {
    id: "home-care",
    title: "ดูแลผู้ป่วยที่บ้าน",
    description: "ผู้ดูแลไปดูแลที่บ้าน เหมาะสำหรับผู้สูงอายุหรือผู้ป่วยพักฟื้น",
    price: 350,
    icon: "🏠",
  },
  {
    id: "hospital-care",
    title: "เฝ้าไข้ที่โรงพยาบาล",
    description: "ช่วยดูแลระหว่างนอนโรงพยาบาล พร้อมประสานงานเบื้องต้น",
    price: 450,
    icon: "🏥",
  },
  {
    id: "daily-assist",
    title: "ช่วยเหลือรายวัน",
    description: "ช่วยเดินทาง ซื้อของ รับยา หรือดูแลกิจวัตรประจำวัน",
    price: 300,
    icon: "🤝",
  },
];

const caregivers: Caregiver[] = [
  {
    id: "cg-1",
    name: "คุณมะลิ",
    role: "Caregiver ผู้สูงอายุ",
    rating: 4.9,
    experience: "5 ปี",
    pricePerHour: 350,
    available: true,
  },
  {
    id: "cg-2",
    name: "คุณอร",
    role: "ผู้ช่วยพยาบาล",
    rating: 4.8,
    experience: "7 ปี",
    pricePerHour: 450,
    available: true,
  },
  {
    id: "cg-3",
    name: "คุณนิด",
    role: "ดูแลผู้ป่วยพักฟื้น",
    rating: 4.7,
    experience: "4 ปี",
    pricePerHour: 380,
    available: false,
  },
];

const timeSlots = [
  "08:00 - 12:00",
  "12:00 - 16:00",
  "16:00 - 20:00",
  "20:00 - 00:00",
];

export default function BookingPage() {
  const { t } = useI18n();

  const today = new Date().toISOString().slice(0, 10);

  const [selectedServiceId, setSelectedServiceId] = useState("home-care");
  const [selectedCaregiverId, setSelectedCaregiverId] = useState("cg-1");
  const [selectedTime, setSelectedTime] = useState(timeSlots[0]);
  const [date, setDate] = useState(today);
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  const selectedService = useMemo(
    () => services.find((item) => item.id === selectedServiceId) ?? services[0],
    [selectedServiceId],
  );

  const selectedCaregiver = useMemo(
    () =>
      caregivers.find((item) => item.id === selectedCaregiverId) ??
      caregivers[0],
    [selectedCaregiverId],
  );

  const totalPrice = selectedCaregiver.pricePerHour * 4;

  return (
    <section className="mx-auto max-w-md space-y-6">
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
          <h2 className="text-lg font-bold text-slate-950">
            เลือกประเภทบริการ
          </h2>
          <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700">
            Step 1
          </span>
        </div>

        <div className="space-y-3">
          {services.map((service) => {
            const active = selectedServiceId === service.id;

            return (
              <button
                key={service.id}
                type="button"
                onClick={() => setSelectedServiceId(service.id)}
                className={[
                  "w-full rounded-3xl border p-4 text-left transition",
                  active
                    ? "border-cyan-400 bg-white shadow-md shadow-cyan-100"
                    : "border-white bg-white/75 shadow-sm hover:border-cyan-200",
                ].join(" ")}
              >
                <div className="flex gap-4">
                  <div
                    className={[
                      "grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-2xl",
                      active ? "bg-cyan-100" : "bg-slate-100",
                    ].join(" ")}
                  >
                    {service.icon}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-bold text-slate-950">
                        {service.title}
                      </h3>
                      <p className="whitespace-nowrap text-sm font-bold text-cyan-700">
                        ฿{service.price}/ชม.
                      </p>
                    </div>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      {service.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="rounded-[2rem] border border-white bg-white/85 p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-950">วันและเวลา</h2>
          <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700">
            Step 2
          </span>
        </div>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">
            วันที่ต้องการจอง
          </span>
          <input
            type="date"
            min={today}
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
          />
        </label>

        <div className="mt-4">
          <p className="mb-2 text-sm font-semibold text-slate-700">ช่วงเวลา</p>

          <div className="grid grid-cols-2 gap-3">
            {timeSlots.map((slot) => {
              const active = selectedTime === slot;

              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedTime(slot)}
                  className={[
                    "h-12 rounded-2xl border text-sm font-semibold transition",
                    active
                      ? "border-cyan-400 bg-cyan-500 text-white shadow-md shadow-cyan-100"
                      : "border-slate-200 bg-white text-slate-600 hover:border-cyan-300",
                  ].join(" ")}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-950">เลือกผู้ดูแล</h2>
          <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700">
            Step 3
          </span>
        </div>

        <div className="space-y-3">
          {caregivers.map((caregiver) => {
            const active = selectedCaregiverId === caregiver.id;

            return (
              <button
                key={caregiver.id}
                type="button"
                disabled={!caregiver.available}
                onClick={() => setSelectedCaregiverId(caregiver.id)}
                className={[
                  "w-full rounded-3xl border p-4 text-left transition",
                  !caregiver.available
                    ? "cursor-not-allowed border-slate-100 bg-slate-100 opacity-60"
                    : active
                      ? "border-cyan-400 bg-white shadow-md shadow-cyan-100"
                      : "border-white bg-white/80 shadow-sm hover:border-cyan-200",
                ].join(" ")}
              >
                <div className="flex items-center gap-4">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-cyan-100 to-sky-100 text-xl font-bold text-cyan-700">
                    {caregiver.name.slice(3, 4)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-slate-950">
                          {caregiver.name}
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                          {caregiver.role}
                        </p>
                      </div>

                      <span
                        className={[
                          "rounded-full px-3 py-1 text-xs font-semibold",
                          caregiver.available
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-200 text-slate-500",
                        ].join(" ")}
                      >
                        {caregiver.available ? "ว่าง" : "ไม่ว่าง"}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
                      <span className="rounded-full bg-amber-50 px-3 py-1 text-amber-700">
                        ⭐ {caregiver.rating}
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-1">
                        ประสบการณ์ {caregiver.experience}
                      </span>
                      <span className="rounded-full bg-cyan-50 px-3 py-1 text-cyan-700">
                        ฿{caregiver.pricePerHour}/ชม.
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="rounded-[2rem] border border-white bg-white/85 p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-bold text-slate-950">
          รายละเอียดเพิ่มเติม
        </h2>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">
            สถานที่ดูแล
          </span>
          <textarea
            rows={3}
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            placeholder="เช่น บ้านเลขที่, คอนโด, โรงพยาบาล, ชั้น, ห้อง"
            className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
          />
        </label>

        <label className="mt-4 block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">
            หมายเหตุถึงผู้ดูแล
          </span>
          <textarea
            rows={3}
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="เช่น ผู้ป่วยเดินไม่สะดวก, ต้องช่วยเตือนกินยา, มีอาหารที่แพ้"
            className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
          />
        </label>
      </section>

      <section className="rounded-[2rem] border border-cyan-100 bg-cyan-950 p-5 text-white shadow-lg shadow-cyan-100">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">สรุปการจอง</h2>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
            4 ชั่วโมง
          </span>
        </div>

        <div className="space-y-3 text-sm">
          <SummaryRow label="บริการ" value={selectedService.title} />
          <SummaryRow label="ผู้ดูแล" value={selectedCaregiver.name} />
          <SummaryRow label="วันที่" value={date || "-"} />
          <SummaryRow label="เวลา" value={selectedTime} />
        </div>

        <div className="mt-5 border-t border-white/10 pt-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm text-cyan-100">ยอดประมาณการ</p>
              <p className="mt-1 text-xs text-cyan-200">
                คิดจาก {selectedCaregiver.pricePerHour} บาท x 4 ชั่วโมง
              </p>
            </div>

            <p className="text-2xl font-extrabold">฿{totalPrice}</p>
          </div>
        </div>

        <button
          type="button"
          className="mt-5 h-13 w-full rounded-2xl bg-white px-5 py-4 text-sm font-bold text-cyan-900 shadow-sm transition hover:bg-cyan-50 active:scale-[0.99]"
        >
          ยืนยันการจอง
        </button>
      </section>
    </section>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-cyan-100">{label}</span>
      <span className="text-right font-semibold text-white">{value}</span>
    </div>
  );
}
