"use client";

type AddressRequiredPopupProps = {
  open: boolean;
  title: string;
  description: string;
  href: string;
  target?: string;
  onConfirm: (href: string) => void;
  onClose: () => void;
};
export default function AddressRequiredPopup({
  open,
  title,
  description,
  href,
  target,
  onConfirm,
  onClose,
}: AddressRequiredPopupProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 px-5 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-[2rem] bg-white p-5 shadow-2xl">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-amber-50 text-3xl">
          📍
        </div>

        <div className="mt-4 text-center">
          <h3 className="text-xl font-black text-slate-950">{title}</h3>

          {target && (
            <p className="mt-2 text-sm font-bold text-slate-700">{target}</p>
          )}

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {description}
          </p>
        </div>

        <div className="mt-5 grid gap-3">
          <button
            type="button"
            onClick={() => onConfirm(href)}
            className="h-12 rounded-2xl bg-cyan-500 text-sm font-black text-white shadow-lg shadow-cyan-100 active:scale-[0.98]"
          >
            ไปตั้งค่าที่อยู่
          </button>

          <button
            type="button"
            onClick={onClose}
            className="h-12 rounded-2xl bg-slate-100 text-sm font-black text-slate-600 active:scale-[0.98]"
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  );
}