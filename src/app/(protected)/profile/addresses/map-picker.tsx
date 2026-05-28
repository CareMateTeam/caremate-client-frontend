"use client";

import L from "leaflet";
import { useEffect } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

export type MapPosition = {
  lat: number;
  lng: number;
};

type MapPickerProps = {
  position: MapPosition | null;
  onChange: (position: MapPosition) => void;
};

const defaultBangkokPosition: MapPosition = {
  lat: 13.756331,
  lng: 100.501762,
};

const markerIcon = L.divIcon({
  className: "",
  html: `
    <div style="
      width: 38px;
      height: 38px;
      display: grid;
      place-items: center;
      border-radius: 999px;
      background: white;
      box-shadow: 0 10px 25px rgba(15, 23, 42, 0.2);
      border: 3px solid #06b6d4;
      font-size: 20px;
      transform: translateY(-4px);
    ">
      📍
    </div>
  `,
  iconSize: [38, 38],
  iconAnchor: [19, 36],
});

function normalizePosition(position: MapPosition): MapPosition {
  return {
    lat: Number(position.lat.toFixed(7)),
    lng: Number(position.lng.toFixed(7)),
  };
}

function MapClickHandler({
  onChange,
}: {
  onChange: (position: MapPosition) => void;
}) {
  useMapEvents({
    click(event) {
      onChange(
        normalizePosition({
          lat: event.latlng.lat,
          lng: event.latlng.lng,
        }),
      );
    },
  });

  return null;
}

function safeInvalidateMapSize(map: L.Map) {
  const container = map.getContainer();

  if (!container || !container.isConnected) {
    return;
  }

  map.invalidateSize({
    pan: false,
  });
}

function RecenterMap({ position }: { position: MapPosition | null }) {
  const map = useMap();

  useEffect(() => {
    if (!position) return;

    let cancelled = false;
    let frameId: number | null = null;

    map.setView([position.lat, position.lng], 16);

    frameId = window.requestAnimationFrame(() => {
      if (cancelled) return;

      safeInvalidateMapSize(map);
    });

    return () => {
      cancelled = true;

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [map, position]);

  return null;
}

function MapSizeFixer() {
  const map = useMap();

  useEffect(() => {
    let cancelled = false;
    let frameId: number | null = null;

    const container = map.getContainer();

    const invalidate = () => {
      if (cancelled) return;

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = null;

        if (cancelled) return;

        safeInvalidateMapSize(map);
      });
    };

    invalidate();

    const timeoutId = window.setTimeout(() => {
      invalidate();
    }, 300);

    const resizeObserver = new ResizeObserver(() => {
      invalidate();
    });

    resizeObserver.observe(container);

    window.addEventListener("resize", invalidate);

    return () => {
      cancelled = true;

      window.clearTimeout(timeoutId);
      window.removeEventListener("resize", invalidate);
      resizeObserver.disconnect();

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [map]);

  return null;
}

export default function MapPicker({ position, onChange }: MapPickerProps) {
  const center = position ?? defaultBangkokPosition;

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-100">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={position ? 16 : 12}
        scrollWheelZoom
        className="h-[320px] w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapSizeFixer />
        <MapClickHandler onChange={onChange} />
        <RecenterMap position={position} />

        {position ? (
          <Marker
            draggable
            icon={markerIcon}
            position={[position.lat, position.lng]}
            eventHandlers={{
              dragend(event) {
                const marker = event.target as L.Marker;
                const nextPosition = marker.getLatLng();

                onChange(
                  normalizePosition({
                    lat: nextPosition.lat,
                    lng: nextPosition.lng,
                  }),
                );
              },
            }}
          />
        ) : null}
      </MapContainer>
    </div>
  );
}
