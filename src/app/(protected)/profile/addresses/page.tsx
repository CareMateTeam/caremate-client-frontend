"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import type { MapPosition } from "./map-picker";
import { useI18n } from "@/libs/i18n/i18n-provider";
import { unwrapApiData } from "@/libs/user/map-user-profile";
import { AddressForm } from "@/dto/user";
import { getMapPosition } from "@/libs/user/map-lib";
import { FormInput } from "@/components/input/form-input";
import SaveSuccessPopUp from "@/components/card/save-success-pop-up";

const MapPicker = dynamic(() => import("./map-picker"), {
  ssr: false,
  loading: () => (
    <div className="grid h-[320px] place-items-center rounded-[1.5rem] bg-slate-100 text-sm font-semibold text-slate-500">
      Loading map...
    </div>
  ),
});

const initialForm: AddressForm = {
  addressLine: "",
  subdistrict: "",
  district: "",
  province: "",
  postalCode: "",
  latitude: "",
  longitude: "",
};

export default function AddressesPage() {
  const { t } = useI18n();
  const [form, setForm] = useState<AddressForm>(initialForm);
  const [saving, setSaving] = useState(false);
  const [locating, setLocating] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const position = getMapPosition(form);

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        setLoading(true);
        setMessage("");

        const res = await fetch("/api/user/address", {
          method: "GET",
          credentials: "include",
        });

        const json = await res.json().catch(() => null);

        if (!res.ok) {
          throw new Error(json?.message ?? t.addresses.fetchError);
        }

        const address = unwrapApiData(json);

        setForm({
          addressLine: address.address_line ?? "",
          subdistrict: address.subdistrict ?? "",
          district: address.district ?? "",
          province: address.province ?? "",
          postalCode: address.postal_code ?? "",
          latitude:
            address.latitude !== null && address.latitude !== undefined
              ? String(address.latitude)
              : "",
          longitude:
            address.longitude !== null && address.longitude !== undefined
              ? String(address.longitude)
              : "",
        });
      } catch (error) {
        console.error("Fetch address error:", error);
        setMessage(t.addresses.fetchError);
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
  }, [t]);

  const updateForm = <K extends keyof AddressForm>(
    key: K,
    value: AddressForm[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.addressLine.trim()) {
      setMessage(t.addresses.addressRequired);
      return;
    }

    if (!form.latitude || !form.longitude) {
      setMessage(t.addresses.pinRequired);
      return;
    }

    try {
      setSaving(true);
      setMessage("");
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
        address_line: form.addressLine.trim(),
        subdistrict: form.subdistrict.trim(),
        district: form.district.trim(),
        province: form.province.trim(),
        postal_code: form.postalCode.trim(),
        latitude,
        longitude,
      };

      const res = await fetch("/api/user/address", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(json?.message ?? t.addresses.saveError);
      }

      setShowSuccessPopup(true);
    } catch (error) {
      console.error("Save address error:", error);
      setMessage(t.addresses.saveError);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-md space-y-5">
        <div className="h-28 animate-pulse rounded-[2rem] bg-white/80" />
        <div className="h-[620px] animate-pulse rounded-[2rem] bg-white/80" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md space-y-5">
      <section className="rounded-[2rem] border border-white/80 bg-white/85 p-5 shadow-sm backdrop-blur">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-cyan-600">{t.addresses.badge}</p>
            <h1 className="mt-1 text-2xl font-extrabold text-slate-950">
              {t.addresses.title}
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              {t.addresses.description}
            </p>
          </div>

          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-cyan-100 text-2xl">
            📍
          </div>
        </div>
      </section>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-[2rem] border border-white/80 bg-white/85 p-5 shadow-sm"
      >
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-slate-950">
            {t.addresses.detailsTitle}
          </h2>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">
              {t.addresses.addressLabel}
            </span>

            <textarea
              rows={3}
              value={form.addressLine}
              onChange={(event) =>
                updateForm("addressLine", event.target.value)
              }
              placeholder={t.addresses.addressPlaceholder}
              className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <FormInput
              label={t.addresses.subdistrictLabel}
              value={form.subdistrict}
              placeholder={t.addresses.subdistrictPlaceholder}
              onChange={(value) => updateForm("subdistrict", value)}
            />

            <FormInput
              label={t.addresses.districtLabel}
              value={form.district}
              placeholder={t.addresses.districtPlaceholder}
              onChange={(value) => updateForm("district", value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <FormInput
              label={t.addresses.provinceLabel}
              value={form.province}
              placeholder={t.addresses.provincePlaceholder}
              onChange={(value) => updateForm("province", value)}
            />

            <FormInput
              label={t.addresses.postalCodeLabel}
              value={form.postalCode}
              placeholder={t.addresses.postalCodePlaceholder}
              inputMode="numeric"
              maxLength={5}
              onChange={(value) => updateForm("postalCode", value)}
            />
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-950">
                {t.addresses.mapTitle}
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-500">
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

          {/* <div className="grid grid-cols-2 gap-3">
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

        {message ? (
          <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
            {message}
          </div>
        ) : null}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="h-12 flex-1 rounded-2xl border border-slate-200 bg-white text-sm font-bold text-slate-600 transition hover:bg-slate-50 active:scale-[0.99]"
          >
            {t.addresses.backButton}
          </button>

          <button
            type="submit"
            disabled={saving}
            className="h-12 flex-1 rounded-2xl bg-cyan-500 text-sm font-bold text-white shadow-md shadow-cyan-100 transition hover:bg-cyan-600 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? t.addresses.savingButton : t.addresses.saveButton}
          </button>
        </div>
      </form>
      {showSuccessPopup ? <SaveSuccessPopUp label={t.addresses.saveSuccessLabel} backto={t.addresses.saveSuccessBackto} backtoHref="/profile" /> : null}
    </div>
  );
}
