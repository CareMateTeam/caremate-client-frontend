"use client";

import { TimeMode } from "@/dto/booking";
import { Clock3 } from "lucide-react";

type BookingDateTimeStepProps = {
  today: string;
  date: string;
  timeMode: TimeMode;
  selectedTime: string;
  timeSlots: string[];
  rangeStartTime: string;
  rangeEndTime: string;
  isRangeTimeValid: boolean;
  onDateChange: (value: string) => void;
  onSelectTimeMode: (mode: TimeMode) => void;
  onSelectedTimeChange: (value: string) => void;
  onRangeStartTimeChange: (value: string) => void;
  onRangeEndTimeChange: (value: string) => void;
};

export default function BookingDateTimeStep({
  today,
  date,
  timeMode,
  selectedTime,
  timeSlots,
  rangeStartTime,
  rangeEndTime,
  isRangeTimeValid,
  onDateChange,
  onSelectTimeMode,
  onSelectedTimeChange,
  onRangeStartTimeChange,
  onRangeEndTimeChange,
}: BookingDateTimeStepProps) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-black text-slate-950">เลือกวันและเวลา</h2>
        <p className="mt-2 rounded-lg bg-slate-100 px-2 py-2 text-xs text-slate-700">
          เลือกวันก่อน แล้วเลือกเวลาได้ 1 แบบ
          ระหว่างเวลาสำเร็จรูปหรือกำหนดช่วงเวลาเอง
        </p>
      </div>

      <label className="block">
        <span className="mb-1 block text-sm font-bold text-slate-700">
          วันที่ต้องการรับบริการ
        </span>

        <input
          type="date"
          min={today}
          value={date}
          onChange={(event) => onDateChange(event.target.value)}
          className="h-13 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
        />
      </label>

      <div>
        <p className="mb-3 text-sm font-bold text-slate-700">เลือกรูปแบบเวลา</p>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onSelectTimeMode("fixed")}
            className={[
              "rounded-2xl border p-4 text-left transition active:scale-[0.98]",
              timeMode === "fixed"
                ? "border-cyan-400 bg-cyan-50 shadow-md shadow-sky-200"
                : "border-slate-200 bg-white",
            ].join(" ")}
          >
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-100 text-cyan-700">
              <Clock3 className="h-5 w-5" />
            </div>
            <p className="mt-3 text-sm font-black text-slate-950">แบบฟิกเวลา</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              เลือกจากช่วงเวลาที่ระบบเตรียมไว้
            </p>
          </button>

          <button
            type="button"
            onClick={() => onSelectTimeMode("range")}
            className={[
              "rounded-2xl border p-4 text-left transition active:scale-[0.98]",
              timeMode === "range"
                ? "border-cyan-400 bg-cyan-50 shadow-md shadow-sky-200"
                : "border-slate-200 bg-white",
            ].join(" ")}
          >
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-100 text-cyan-700">
              <Clock3 className="h-5 w-5" />
            </div>
            <p className="mt-3 text-sm font-black text-slate-950">
              แบบกำหนดเอง
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              เลือกเวลาเริ่มต้นและสิ้นสุดเอง
            </p>
          </button>
        </div>
      </div>

      {timeMode === "fixed" && (
        <div>
          <p className="mb-3 text-sm font-bold text-slate-700">
            ช่วงเวลาสำเร็จรูป
          </p>

          <div className="grid grid-cols-2 gap-3">
            {timeSlots.map((slot) => {
              const active = selectedTime === slot;

              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => onSelectedTimeChange(slot)}
                  className={[
                    "rounded-2xl border px-4 py-3 text-sm font-black transition active:scale-[0.98]",
                    active
                      ? "border-cyan-400 bg-cyan-500 text-white shadow-lg shadow-cyan-100"
                      : "border-slate-200 bg-white text-slate-600",
                  ].join(" ")}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {timeMode === "range" && (
        <div className="rounded-xl bg-emerald-300/25 p-4">
          <p className="mb-3 text-sm font-bold text-slate-700">
            กำหนดช่วงเวลาเอง
          </p>

          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="mb-2 block text-xs font-bold text-slate-500">
                เวลาเริ่มต้น
              </span>
              <input
                type="time"
                step={1800}
                value={rangeStartTime}
                onChange={(event) => onRangeStartTimeChange(event.target.value)}
                className="h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-800 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-bold text-slate-500">
                เวลาสิ้นสุด
              </span>
              <input
                type="time"
                step={1800}
                value={rangeEndTime}
                onChange={(event) => onRangeEndTimeChange(event.target.value)}
                className="h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-800 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
              />
            </label>
          </div>

          {!isRangeTimeValid && (
            <p className="mt-3 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-xs font-semibold text-red-600">
              เวลาสิ้นสุดต้องมากกว่าเวลาเริ่มต้น
            </p>
          )}
        </div>
      )}
    </div>
  );
}
