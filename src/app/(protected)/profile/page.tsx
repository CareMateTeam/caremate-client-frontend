import React from "react";

const user = {
  name: "ภัทรจาริน นภากาญจน์",
  role: "สมาชิก CareMate",
  phone: "081-234-5678",
  email: "gabel@example.com",
  location: "กรุงเทพมหานคร",
  avatarText: "G",
};

const profileStats = [
  {
    label: "การจองทั้งหมด",
    value: "12",
  },
  {
    label: "กำลังดำเนินการ",
    value: "2",
  },
  {
    label: "คะแนนรีวิว",
    value: "4.9",
  },
];

const menuItems = [
  {
    title: "ข้อมูลส่วนตัว",
    description: "แก้ไขชื่อ เบอร์โทร อีเมล และที่อยู่",
    icon: "👤",
  },
  {
    title: "ประวัติการจอง",
    description: "ดูรายการจองบริการดูแลย้อนหลัง",
    icon: "📋",
  },
  {
    title: "ผู้ป่วย / ผู้รับการดูแล",
    description: "จัดการข้อมูลคนในครอบครัวที่ต้องการดูแล",
    icon: "🫶",
  },
  {
    title: "ที่อยู่ของฉัน",
    description: "บันทึกบ้าน โรงพยาบาล หรือสถานที่ดูแล",
    icon: "📍",
  },
  {
    title: "การชำระเงิน",
    description: "จัดการช่องทางการชำระเงินและใบเสร็จ",
    icon: "💳",
  },
  {
    title: "ตั้งค่าและความปลอดภัย",
    description: "จัดการบัญชี รหัสผ่าน และการแจ้งเตือน",
    icon: "⚙️",
  },
];

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-md space-y-5">
      <section className="rounded-[2rem] border border-white/80 bg-white/85 p-5 shadow-sm backdrop-blur">
        <div className="flex items-center gap-4">
          <div className="grid h-20 w-20 shrink-0 place-items-center rounded-[1.75rem] bg-gradient-to-br from-cyan-400 to-sky-500 text-3xl font-extrabold text-white shadow-md shadow-cyan-100">
            {user.avatarText}
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-cyan-600">
              {user.role}
            </p>
            <h1 className="mt-1 truncate text-xl font-extrabold text-slate-950">
              {user.name}
            </h1>
            <p className="mt-1 text-sm text-slate-500">{user.phone}</p>
          </div>
        </div>

        <button
          type="button"
          className="mt-5 h-12 w-full rounded-2xl bg-cyan-500 text-sm font-bold text-white shadow-md shadow-cyan-100 transition hover:bg-cyan-600 active:scale-[0.99]"
        >
          แก้ไขโปรไฟล์
        </button>
      </section>

      <section className="grid grid-cols-3 gap-3">
        {profileStats.map((item) => (
          <div
            key={item.label}
            className="rounded-3xl border border-white/80 bg-white/85 p-4 text-center shadow-sm"
          >
            <p className="text-xl font-extrabold text-slate-950">
              {item.value}
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              {item.label}
            </p>
          </div>
        ))}
      </section>

      <section className="rounded-[2rem] border border-white/80 bg-white/85 p-5 shadow-sm">
        <h2 className="text-lg font-bold text-slate-950">ข้อมูลบัญชี</h2>

        <div className="mt-4 space-y-3">
          <InfoRow label="อีเมล" value={user.email} />
          <InfoRow label="เบอร์โทร" value={user.phone} />
          <InfoRow label="พื้นที่" value={user.location} />
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-950">เมนูของฉัน</h2>
          <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700">
            Account
          </span>
        </div>

        <div className="space-y-3">
          {menuItems.map((item) => (
            <button
              key={item.title}
              type="button"
              className="w-full rounded-3xl border border-white/80 bg-white/85 p-4 text-left shadow-sm transition hover:border-cyan-200 hover:bg-white active:scale-[0.99]"
            >
              <div className="flex items-center gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-cyan-50 text-2xl">
                  {item.icon}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-slate-950">{item.title}</h3>
                  <p className="mt-1 text-sm leading-5 text-slate-500">
                    {item.description}
                  </p>
                </div>

                <span className="text-xl text-slate-300">›</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <button
        type="button"
        className="h-12 w-full rounded-2xl border border-red-100 bg-red-50 text-sm font-bold text-red-600 transition hover:bg-red-100 active:scale-[0.99]"
      >
        ออกจากระบบ
      </button>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="truncate text-right text-sm font-semibold text-slate-800">
        {value}
      </span>
    </div>
  );
}