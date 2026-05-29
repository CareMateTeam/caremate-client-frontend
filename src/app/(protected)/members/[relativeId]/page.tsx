"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import LanguageSwitcher from "@/components/language-switcher";
import React, { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/libs/i18n/i18n-provider";
import { formatBirthDateTH, unwrapApiData } from "@/libs/user/map-user-profile";
import { GetRelativeByIDData, MemberSettingForm } from "@/dto/register";
import { Field } from "@/components/input/field-lable";
import {
  getMapPosition,
  numberToInputValue,
  optional,
} from "@/libs/user/map-lib";
import SaveSuccessPopUp from "@/components/card/save-success-pop-up";
import { SelectField } from "@/components/input/select-field";
import { FormTextarea } from "@/components/input/form-text-area";
import {
  getBloodTypeOptions,
  getGenderOptions,
  getRelationshipOptions,
} from "@/constants/health-information";
import dynamic from "next/dynamic";
import { MapPosition } from "../../profile/addresses/map-picker";
import { toDateInputValue } from "@/libs/general/date";

const MapPicker = dynamic(() => import("../../profile/addresses/map-picker"), {
  ssr: false,
  loading: () => (
    <div className="grid h-72 place-items-center rounded-2xl bg-slate-100 text-sm font-semibold text-slate-500">
      Loading map...
    </div>
  ),
});

const initialForm: MemberSettingForm = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  dateOfBirth: "",
  latitude: "",
  longitude: "",
  gender: "",
  registerAs: "",
  relationship: "",
  addressLine: "",
  subdistrict: "",
  district: "",
  province: "",
  postalCode: "",
  emergencyContactName: "",
  emergencyContactPhone: "",
  emergencyContactRelationship: "",
  bloodType: "",
  allergies: "",
  congenitalDiseases: "",
  currentMedications: "",
  careNote: "",
  isDefault: false,
};

export default function MemberSettingPage() {
  const router = useRouter();
  const params = useParams<{ relativeId: string }>();
  const { t } = useI18n();

  const relativeId = params.relativeId;

  const bloodTypeOptions = useMemo(() => getBloodTypeOptions(t), [t]);
  const genderOptions = useMemo(() => getGenderOptions(t), [t]);
  const relationshipOptions = useMemo(() => getRelationshipOptions(t), [t]);

  const [form, setForm] = useState<MemberSettingForm>(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [locating, setLocating] = useState(false);
  const [editingBirthDate, setEditingBirthDate] = useState(false);
  const position = getMapPosition(form);

  const updateForm = <K extends keyof MemberSettingForm>(
    key: K,
    value: MemberSettingForm[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    const fetchMember = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const res = await fetch(`/api/relative/${relativeId}`, {
          method: "GET",
          cache: "no-store",
        });

        const json = await res.json().catch(() => null);

        if (!res.ok) {
          throw new Error(json?.message ?? t.members.fetchError);
        }

        const data = unwrapApiData<GetRelativeByIDData>(json);
        const member = data.relative;

        if (!member) {
          throw new Error(t.members.fetchError);
        }

        setForm({
          firstName: member.firstName ?? "",
          lastName: member.lastName ?? "",
          phone: member.phone ?? "",
          email: member.email ?? "",
          dateOfBirth: toDateInputValue(member.dateOfBirth),
          gender: member.gender ?? "",
          registerAs: "",
          relationship: member.relationship ?? "",

          addressLine: member.addressLine ?? "",
          subdistrict: member.subdistrict ?? "",
          district: member.district ?? "",
          province: member.province ?? "",
          postalCode: member.postalCode ?? "",
          latitude: numberToInputValue(member.latitude),
          longitude: numberToInputValue(member.longitude),

          emergencyContactName: member.emergencyContactName ?? "",
          emergencyContactPhone: member.emergencyContactPhone ?? "",
          emergencyContactRelationship:
            member.emergencyContactRelationship ?? "",

          bloodType: member.bloodType ?? "",
          allergies: member.allergies ?? "",
          congenitalDiseases: member.congenitalDiseases ?? "",
          currentMedications: member.currentMedications ?? "",
          careNote: member.careNote ?? "",

          isDefault: member.isDefault ?? false,
        });
      } catch (error) {
        console.error("Fetch member setting error:", error);

        setErrorMessage(
          error instanceof Error
            ? error.message
            : t.members.fetchError,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [relativeId, t]);

  const updatePosition = (nextPosition: MapPosition) => {
    setForm((prev) => ({
      ...prev,
      latitude: nextPosition.lat.toFixed(7),
      longitude: nextPosition.lng.toFixed(7),
    }));
  };
  const handleUseCurrentLocation = () => {
    setMessage("");

    if (!navigator.geolocation) {
      setMessage(t.addresses.geoUnsupported);
      return;
    }

    setLocating(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        updatePosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });

        setMessage(t.addresses.geoSuccess);
        setLocating(false);
      },
      (error) => {
        console.error("Geolocation error:", error);

        if (error.code === error.PERMISSION_DENIED) {
          setMessage(t.addresses.geoDenied);
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setMessage(t.addresses.geoUnavailable);
        } else if (error.code === error.TIMEOUT) {
          setMessage(t.addresses.geoTimeout);
        } else {
          setMessage(t.addresses.geoFailed);
        }

        setLocating(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      },
    );
  };

  const canSubmit = useMemo(() => {
    return (
      form.firstName.trim().length > 0 &&
      form.lastName.trim().length > 0 &&
      form.phone.trim().length > 0 &&
      form.relationship.trim().length > 0
    );
  }, [form.firstName, form.lastName, form.phone, form.relationship]);

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSubmit) {
      setErrorMessage(t.validation.firstNameRequired);
      return;
    }

    try {
      setSaving(true);
      setErrorMessage("");
      const latitude = Number(form.latitude);
      const longitude = Number(form.longitude);

      if (!Number.isFinite(latitude) || latitude < -90 || latitude > 90) {
        setMessage(t.addresses.latRange);
        return;
      }

      if (!Number.isFinite(longitude) || longitude < -180 || longitude > 180) {
        setMessage(t.addresses.lngRange);
        return;
      }
      const payload = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        phone: form.phone.trim(),
        email: optional(form.email),
        dateOfBirth: optional(form.dateOfBirth),
        gender: optional(form.gender),
        registerAs: optional(form.registerAs),
        relationship: form.relationship,
        addressLine: optional(form.addressLine),
        subdistrict: optional(form.subdistrict),
        district: optional(form.district),
        province: optional(form.province),
        latitude: latitude,
        longitude: longitude,
        postalCode: optional(form.postalCode),
        emergencyContactName: optional(form.emergencyContactName),
        emergencyContactPhone: optional(form.emergencyContactPhone),
        emergencyContactRelationship: optional(
          form.emergencyContactRelationship,
        ),
        bloodType: optional(form.bloodType),
        allergies: optional(form.allergies),
        congenitalDiseases: optional(form.congenitalDiseases),
        currentMedications: optional(form.currentMedications),
        careNote: optional(form.careNote),
        isDefault: form.isDefault,
      };
      console.log("Saving member with payload:", payload);

      const res = await fetch(`/api/relative/${relativeId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(json?.message ?? t.members.create.saveError);
      }

      setShowSuccessPopup(true);
    } catch (error) {
      console.error("Update member error:", error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : t.members.create.saveError,
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "ต้องการลบสมาชิกคนนี้ใช่ไหม? ข้อมูลจะถูกปิดการใช้งานและไม่แสดงในรายการสมาชิก",
    );

    if (!confirmed) return;

    try {
      setDeleting(true);
      setErrorMessage("");

      const res = await fetch(`/api/relative/${relativeId}`, {
        method: "DELETE",
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(json?.message ?? t.members.create.saveError);
      }

      router.replace("/members");
      router.refresh();
    } catch (error) {
      console.error("Delete member error:", error);

      setErrorMessage(
        error instanceof Error ? error.message : t.members.create.saveError,
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-md space-y-5 pb-8">
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

        <section className="rounded-xl bg-gradient-to-br from-cyan-500 to-sky-300 p-5 text-white shadow-md shadow-sky-300">
          <p className="text-sm font-bold text-white/80">{t.members.create.badge}</p>
          <h2 className="mt-1 text-2xl font-black">{t.members.title}</h2>
          <p className="mt-2 text-sm leading-6 text-white/90">
            {t.members.create.description}
          </p>
        </section>

        {errorMessage && (
          <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
            {errorMessage}
          </p>
        )}

        {loading ? (
          <div className="space-y-3">
            <div className="h-40 animate-pulse rounded-xl bg-white/80" />
            <div className="h-80 animate-pulse rounded-xl bg-white/80" />
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-4">
            <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
              <h3 className="text-lg font-black text-slate-950">
                {t.booking.payment.personalTitle}
              </h3>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Field
                  label={t.members.create.firstNameLabel}
                  value={form.firstName}
                  onChange={(value) => updateForm("firstName", value)}
                  placeholder={t.members.create.firstNamePlaceholder}
                />

                <Field
                  label={t.members.create.lastNameLabel}
                  value={form.lastName}
                  onChange={(value) => updateForm("lastName", value)}
                  placeholder={t.members.create.lastNamePlaceholder}
                />
              </div>

              <div className="mt-4">
                <Field
                  label={t.members.create.phoneLabel}
                  value={form.phone}
                  onChange={(value) => updateForm("phone", value)}
                  placeholder={t.members.create.phonePlaceholder}
                  type="tel"
                />
              </div>

              <div className="mt-4">
                <Field
                  label={t.members.create.emailLabel}
                  value={form.email}
                  onChange={(value) => updateForm("email", value)}
                  placeholder={t.members.create.emailPlaceholder}
                  type="email"
                />
              </div>
              <div className="block">
                <div className="mb-2 mt-3 flex items-center justify-between gap-3">
                  <span className="block text-sm font-semibold text-slate-700">
                    {t.members.create.dobLabel}
                  </span>

                  {form.dateOfBirth ? (
                    <button
                      type="button"
                      onClick={() => setEditingBirthDate((prev) => !prev)}
                      className="text-xs font-bold text-cyan-600 hover:text-cyan-700"
                    >
                      {editingBirthDate ? t.common.cancel : t.common.edit}
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
                      {t.common.edit}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <SelectField
                  label={t.members.create.genderLabel}
                  value={form.gender}
                  onChange={(value) => updateForm("gender", value)}
                  options={genderOptions}
                />
              </div>

              <div className="mt-4 grid gap-3">
                <SelectField
                  label={t.members.create.relationshipLabel}
                  value={form.relationship}
                  onChange={(value) => updateForm("relationship", value)}
                  options={relationshipOptions}
                />
              </div>

              <button
                type="button"
                onClick={() => updateForm("isDefault", !form.isDefault)}
                className={[
                  "mt-5 flex w-full items-center justify-between rounded-xl border p-4 text-left transition",
                  form.isDefault
                    ? "border-emerald-400 bg-emerald-100"
                    : "border-slate-200 bg-white",
                ].join(" ")}
              >
                <div>
                  <p className="font-black text-slate-950">
                    {t.members.create.setDefaultTitle}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {t.members.create.setDefaultDesc}
                  </p>
                </div>

                <div
                  className={[
                    "grid h-7 w-7 place-items-center rounded-full text-xs font-black",
                    form.isDefault
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-100 text-transparent",
                  ].join(" ")}
                >
                  ✓
                </div>
              </button>
            </section>

            <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-100 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-slate-950">
                    {t.addresses.mapTitle}
                  </h2>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {t.addresses.mapDescription}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleUseCurrentLocation}
                  disabled={locating}
                  className="shrink-0 rounded-2xl bg-cyan-50 px-3 py-2 shadow-md text-xs font-bold text-cyan-700 transition hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {locating ? t.addresses.locating : t.addresses.useCurrentLocation}
                </button>
              </div>

              <MapPicker position={position} onChange={updatePosition} />

              {/* <div className=" grid grid-cols-2 gap-3">
                <FormInput
                  label="Latitude"
                  value={form.latitude}
                  placeholder="13.7563310"
                  inputMode="decimal"
                  onChange={(value) => updateForm("latitude", value)}
                />

                <FormInput
                  label="Longitude"
                  value={form.longitude}
                  placeholder="100.5017620"
                  inputMode="decimal"
                  onChange={(value) => updateForm("longitude", value)}
                />
              </div> */}

              <div className="rounded-2xl bg-cyan-50 px-4 py-3 text-xs leading-5 text-cyan-800">
                {t.addresses.tip}
              </div>
            </section>

            <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
              <h3 className="text-lg font-black text-slate-950">{t.addresses.detailsTitle}</h3>

              <div className="mt-4">
                <FormTextarea
                  label={t.addresses.addressLabel}
                  value={form.addressLine}
                  onChange={(value) => updateForm("addressLine", value)}
                  placeholder={t.members.create.addressPlaceholder}
                  rows={4}
                />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Field
                  label={t.addresses.subdistrictLabel}
                  value={form.subdistrict}
                  onChange={(value) => updateForm("subdistrict", value)}
                />

                <Field
                  label={t.addresses.districtLabel}
                  value={form.district}
                  onChange={(value) => updateForm("district", value)}
                />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Field
                  label={t.addresses.provinceLabel}
                  value={form.province}
                  onChange={(value) => updateForm("province", value)}
                />

                <Field
                  label={t.addresses.postalCodeLabel}
                  value={form.postalCode}
                  onChange={(value) => updateForm("postalCode", value)}
                  inputMode="numeric"
                  maxLength={5}
                />
              </div>
            </section>

            <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
              <h3 className="text-lg font-black text-slate-950">
                {t.health.emergencyTitle}
              </h3>

              <div className="mt-4">
                <Field
                  label={t.health.emergencyNameLabel}
                  value={form.emergencyContactName}
                  onChange={(value) =>
                    updateForm("emergencyContactName", value)
                  }
                />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Field
                  label={t.health.emergencyPhoneLabel}
                  value={form.emergencyContactPhone}
                  onChange={(value) =>
                    updateForm("emergencyContactPhone", value)
                  }
                  type="tel"
                />

                <Field
                  label={t.health.relationshipLabel}
                  value={form.emergencyContactRelationship}
                  onChange={(value) =>
                    updateForm("emergencyContactRelationship", value)
                  }
                />
              </div>
            </section>

            <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
              <h3 className="text-lg font-black text-slate-950">
                {t.booking.payment.healthTitle}
              </h3>

              <div className="mt-4">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  {t.health.bloodTypeLabel}
                </span>

                <select
                  value={form.bloodType}
                  onChange={(event) =>
                    updateForm("bloodType", event.target.value)
                  }
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                >
                  {bloodTypeOptions.map((item) => (
                    <option key={item.value || "empty"} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4">
                <FormTextarea
                  label={t.health.allergiesLabel}
                  value={form.allergies}
                  onChange={(value) => updateForm("allergies", value)}
                  placeholder={t.health.allergiesPlaceholder}
                  rows={3}
                />
              </div>

              <div className="mt-4">
                <FormTextarea
                  label={t.health.diseasesLabel}
                  value={form.congenitalDiseases}
                  onChange={(value) => updateForm("congenitalDiseases", value)}
                  placeholder={t.health.diseasesPlaceholder}
                  rows={3}
                />
              </div>

              <div className="mt-4">
                <FormTextarea
                  label={t.health.medicationsLabel}
                  value={form.currentMedications}
                  onChange={(value) => updateForm("currentMedications", value)}
                  placeholder={t.health.medicationsPlaceholder}
                  rows={3}
                />
              </div>

              <div className="mt-4">
                <FormTextarea
                  label={t.health.careNoteLabel}
                  value={form.careNote}
                  onChange={(value) => updateForm("careNote", value)}
                  placeholder={t.health.careNotePlaceholder}
                  rows={4}
                />
              </div>
            </section>
            <footer className="sticky bottom-4 z-20 flex gap-3">
              <button
                type="button"
                onClick={() => router.back()}
                className="py-3 w-20 rounded-xl bg-white text-sm font-black text-slate-600 shadow-md"
              >
                {t.common.back}
              </button>

              <button
                type="submit"
                disabled={!canSubmit || saving}
                className={[
                  "h-14 flex-1 rounded-xl text-sm font-black shadow-lg transition active:scale-[0.98]",
                  canSubmit && !saving
                    ? "bg-cyan-500 text-white shadow-cyan-100"
                    : "cursor-not-allowed bg-slate-200 text-slate-400 shadow-none",
                ].join(" ")}
              >
                {saving ? t.common.saving : t.health.saveButton}
              </button>
            </footer>

            <section className="rounded-xl border border-red-300 bg-red-100 mt-4 px-5 py-3">
              <p className="mt-2 text-xs leading-6 text-red-600">
                เมื่อลบแล้วจะไม่แสดงในรายการและไม่สามารถเลือกใช้ในการจองได้
              </p>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="mt-2 py-3 w-full rounded-xl bg-red-500 text-sm font-black text-white shadow-sm transition active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-red-200"
              >
                {deleting ? t.common.saving : t.common.delete}
              </button>
            </section>
          </form>
        )}
      </section>
      {showSuccessPopup ? (
        <SaveSuccessPopUp
          label={t.members.create.saveSuccessLabel}
          backto={t.members.create.saveSuccessBackto}
          backtoHref="/members"
        />
      ) : null}
    </main>
  );
}
