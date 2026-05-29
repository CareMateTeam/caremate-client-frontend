"use client";

type BookingNoteStepProps = {
  note: string;
  onNoteChange: (value: string) => void;
};

export default function BookingNoteStep({
  note,
  onNoteChange,
}: BookingNoteStepProps) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-black text-slate-950">
          รายละเอียดเพิ่มเติม
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          แจ้งข้อมูลสำคัญให้ผู้ดูแลทราบ เช่น อาการ สิ่งที่ต้องระวัง
          หรือคำแนะนำพิเศษ
        </p>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-bold text-slate-700">
          หมายเหตุถึงผู้ดูแล
        </span>

        <textarea
          value={note}
          onChange={(event) => onNoteChange(event.target.value)}
          rows={7}
          placeholder="เช่น ผู้รับบริการเดินไม่สะดวก ต้องช่วยพยุงเวลาเดิน หรือมีอาการแพ้ยา..."
          className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
        />
      </label>
    </div>
  );
}