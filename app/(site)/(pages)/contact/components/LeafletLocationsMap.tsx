// app/(site)/(pages)/contact/components/LeafletLocationsMap.tsx
"use client";

import { JSX, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L, { DivIcon, LatLngExpression } from "leaflet";

type LocationPin = {
  id: string;
  name: string;
  lines: string[];
  position: LatLngExpression; // [lat, lng]
};

/* ---------- Locations ---------- */

const LOCATIONS: LocationPin[] = [
  {
    id: "pune",
    name: "Pune",
    lines: [
      "Sona Heights-Balewadi Rd, Laxmi Nagar,",
      "Balewadi Gaon, Pune, Maharashtra 411045.",
    ],
    position: [17.3246, 75.9786],
  },
  {
    id: "blr",
    name: "Bengaluru",
    lines: [
      "Head Office - 2nd floor, BEML layout, 5th Stage,",
      "Rajarajeshwari Nagar, Bengaluru, Karnataka 560098",
    ],
    position: [10.9437, 78.5153],
  },
  {
    id: "uae",
    name: "UAE",
    lines: [],
    position: [22.2048, 55.5708],
  },
  {
    id: "china",
    name: "CHINA",
    lines: [],
    position: [35.12917, 89.91],
  },
];


const MAP_CENTER: LatLngExpression = [29, 82];

/* ---------- Custom pin HTML / icon ---------- */

function createPinIcon(
  loc: LocationPin,
  index: number,
  isActive: boolean
): DivIcon {
  const delay = `${index * 0.8}s`; // stagger pulse per pin

  const tooltipHtml =
    loc.lines.length > 0
      ? loc.lines.map((l) => `<p>${l}</p>`).join("")
      : "";

  const html = `
    <div class="map-pin-root ${isActive ? "is-active" : ""}">
      <div class="map-pin-tooltip">
        <div class="map-pin-tooltip-inner">
          <h3>${loc.name}</h3>
          ${tooltipHtml}
        </div>
      </div>
      <div class="map-pin-inner">
        <span class="map-pin-pulse" style="animation-delay:${delay};"></span>
        <span class="map-pin-core">
          <span class="map-pin-core-inner"></span>
        </span>
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: "",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
}

/* ---------- Map component ---------- */

export default function LeafletLocationsMap(): JSX.Element {
  const [activeId, setActiveId] = useState<string | null>(null);
  const initialCenter = useMemo(() => MAP_CENTER, []);

  return (
    <MapContainer
      center={initialCenter}
      zoom={4}
      scrollWheelZoom={false}
      className="h-[520px] w-full relative z-0"
      attributionControl={true}
      preferCanvas={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
        opacity={0.7}
      />

      {LOCATIONS.map((loc, index) => (
        <Marker
          key={loc.id}
          position={loc.position}
          icon={createPinIcon(loc, index, activeId === loc.id)}
          eventHandlers={{
            mouseover: () => setActiveId(loc.id),
            mouseout: () =>
              setActiveId((prev) => (prev === loc.id ? null : prev)),
            click: () =>
              setActiveId((prev) => (prev === loc.id ? null : loc.id)),
          }}
        />
      ))}
    </MapContainer>
  );
}
