"use client";
import { FormInput } from "@/components/input/form-input";
import { UserProfileResponse } from "@/dto/user";
import {
  formatBirthDateTH,
  normalizeDateForInput,
  unwrapApiData,
} from "@/libs/user/map-user-profile";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SaveSuccessPopUp from "@/components/card/save-success-pop-up";
type PersonalInformationForm = {
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  avatarUrl?: string;
  username?: string;
};

type EditableInformation = Partial<{
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  birthDate: string;
  gender: string;
  email: string;
}>;

const initialForm: PersonalInformationForm = {
  firstName: "",
  lastName: "",
  phone: "",
  dateOfBirth: "",
  gender: "",
  email: "",
};

const genderOptions = [
  { label: "ชาย", value: "male" },
  { label: "หญิง", value: "female" },
  { label: "ไม่ระบุ", value: "unspecified" },
];

export default function PersonalInformationPage() {
  const [form, setForm] = useState<PersonalInformationForm>(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [editingBirthDate, setEditingBirthDate] = useState(false);

  const router = useRouter();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  useEffect(() => {
    const fetchMe = async () => {
      try {
        setLoading(true);
        setMessage("");

        const res = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json().catch(() => null);

        if (!res.ok) {
          throw new Error(data?.message ?? "Failed to fetch user profile");
        }

        const profile = unwrapApiData<UserProfileResponse>(data);
        const information = (profile.information ?? {}) as EditableInformation;

        setForm({
          firstName: information.firstName ?? "",
          lastName: information.lastName ?? "",
          phone: profile.phone ?? "",
          dateOfBirth: normalizeDateForInput(
            information.dateOfBirth ?? information.birthDate ?? "",
          ),
          gender: information.gender ?? "",
          email: information.email ?? "",
          avatarUrl: profile.avatarUrl ?? "",
          username: profile.name ?? "",
        });
      } catch (error) {
        console.error("Fetch personal information error:", error);
        setMessage("โหลดข้อมูลส่วนตัวไม่สำเร็จ");
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, []);

  const updateForm = <K extends keyof PersonalInformationForm>(
    key: K,
    value: PersonalInformationForm[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setSaving(true);
      setMessage("");

      if (!form.firstName.trim()) {
        setMessage("กรุณากรอกชื่อจริง");
        return;
      }

      if (!form.lastName.trim()) {
        setMessage("กรุณากรอกนามสกุล");
        return;
      }

      if (!form.phone.trim()) {
        setMessage("กรุณากรอกเบอร์โทร");
        return;
      }

      const payload = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        phone: form.phone.trim(),
        dateOfBirth: form.dateOfBirth,
        gender: form.gender,
        email: form.email.trim(),
      };

      const res = await fetch("/api/user/personal-information", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.message ?? "Failed to update profile");
      }

      setMessage("บันทึกข้อมูลส่วนตัวเรียบร้อยแล้ว");

      setShowSuccessPopup(true);
    } catch (error) {
      console.error("Update personal information error:", error);
      setMessage("บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-md space-y-5">
        <div className="h-28 animate-pulse rounded-[2rem] bg-white/80" />
        <div className="h-96 animate-pulse rounded-[2rem] bg-white/80" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md space-y-5">
      <section className="rounded-[2rem] border border-white/80 bg-white/85 p-5 shadow-sm backdrop-blur">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-cyan-600">Profile</p>
            <h1 className="mt-1 text-2xl font-extrabold text-slate-950">
              ข้อมูลส่วนตัว
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              แก้ไขข้อมูลพื้นฐานสำหรับการใช้งาน
            </p>
          </div>

          {form.avatarUrl ? (
            <img
              src={form.avatarUrl}
              alt={form.username}
              className="h-16 w-16 rounded-3xl object-cover shadow-lg shadow-emerald-100"
            />
          ) : (
            <div className="grid h-16 w-16 place-items-center rounded-3xl bg-gradient-to-br from-emerald-400 to-cyan-400 text-2xl font-black text-white shadow-lg shadow-emerald-100">
              {form.username?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </section>

      <form
        onSubmit={handleSubmit}
        className="rounded-[2rem] border border-white/80 bg-white/85 p-5 shadow-sm"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <FormInput
              label="ชื่อจริง"
              value={form.firstName}
              placeholder="กรอกชื่อจริง"
              onChange={(value) => updateForm("firstName", value)}
            />

            <FormInput
              label="นามสกุล"
              value={form.lastName}
              placeholder="กรอกนามสกุล"
              onChange={(value) => updateForm("lastName", value)}
            />
          </div>

          <FormInput
            label="เบอร์โทร"
            value={form.phone}
            placeholder="เช่น 0812345678"
            inputMode="tel"
            onChange={(value) => updateForm("phone", value)}
          />

          <FormInput
            label="อีเมล"
            value={form.email}
            placeholder="example@email.com"
            type="email"
            onChange={(value) => updateForm("email", value)}
          />

          <div className="block">
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="block text-sm font-semibold text-slate-700">
                วันเกิด
              </span>

              {form.dateOfBirth ? (
                <button
                  type="button"
                  onClick={() => setEditingBirthDate((prev) => !prev)}
                  className="text-xs font-bold text-cyan-600 hover:text-cyan-700"
                >
                  {editingBirthDate ? "ยกเลิก" : "แก้ไข"}
                </button>
              ) : null}
            </div>
            
            {editingBirthDate || !form.dateOfBirth ? (
              <input
                type="date"
                value={form.dateOfBirth}
                onChange={(event) =>
                  updateForm("dateOfBirth", event.target.value)
                }
                className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
              />
            ) : (
              <div className="flex h-12 items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4">
                <span className="text-sm font-semibold text-slate-800">
                  {formatBirthDateTH(form.dateOfBirth)}
                </span>

                <span className="text-xs text-slate-400">
                  กดแก้ไขเพื่อเปลี่ยน
                </span>
              </div>
            )}
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">
              เพศ
            </span>

            <select
              value={form.gender}
              onChange={(event) => updateForm("gender", event.target.value)}
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
            >
              <option value="">เลือกเพศ</option>
              {genderOptions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {message ? (
          <div className="mt-5 rounded-2xl bg-cyan-50 px-4 py-3 text-sm font-semibold text-cyan-700">
            {message}
          </div>
        ) : null}

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="h-12 flex-1 rounded-2xl border border-slate-200 bg-white text-sm font-bold text-slate-600 transition hover:bg-slate-50 active:scale-[0.99]"
          >
            ย้อนกลับ
          </button>

          <button
            type="submit"
            disabled={saving}
            className="h-12 flex-1 rounded-2xl bg-cyan-500 text-sm font-bold text-white shadow-md shadow-cyan-100 transition hover:bg-cyan-600 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
          </button>
        </div>
      </form>
      {showSuccessPopup ? (
        <SaveSuccessPopUp
          label="ข้อมูลส่วนตัว"
          backto="หน้าโปรไฟล์"
          backtoHref="/profile"
        />
      ) : null}
    </div>
  );
}
