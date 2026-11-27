// app/(site)/(pages)/contact/components/LeafletLocationsMap.tsx
"use client";

import { JSX, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L, { DivIcon, LatLngTuple } from "leaflet";

type Lang = "en" | "de";

type LocationPin = {
  id: string;
  name: Record<Lang, string>;
  lines: string[];
  position: LatLngTuple; // [lat, lng]
};

/* ---------- Locations ----------
 * Only STELZ's own sites, with the official addresses sent by STELZ (2026-11-25).
 * Coordinates are from OpenStreetMap for each address's locality.
 */
const LOCATIONS: LocationPin[] = [
  {
    id: "blr-office",
    name: { en: "Bengaluru – Head Office", de: "Bengaluru – Hauptsitz" },
    lines: [
      "No. 1595, 2nd Floor, Shree Venkateshwara Arcade,",
      "5th Stage, BEML Layout, Raja Rajeshwari Nagar,",
      "Bangalore - 560098",
    ],
    position: [12.9084, 77.5209], // BEML Layout 5th Stage, Rajarajeshwari Nagar
  },
  {
    id: "blr-factory",
    name: { en: "Bengaluru – Factory", de: "Bengaluru – Werk" },
    lines: [
      "Sy. No. 56/2, Mrs Rama and Sri. M. Ramakrishnappa Layout,",
      "Kere Road, Dasanapura Hobli, Machohalli Village,",
      "Bengaluru 560091",
    ],
    position: [13.0066, 77.4521], // Machohalli village (OpenStreetMap, PIN 560091)
  },
  {
    id: "pune",
    name: { en: "Pune – Regional Office", de: "Pune – Regionalbüro" },
    lines: [
      "Office No. 202, Sona Heights, Survey No. 13/1,",
      "Laxmi Nagar, Baner Balewadi Road,",
      "Balewadi, Pune 411045",
    ],
    position: [18.5762, 73.7797], // Balewadi Gaon
  },
  {
    id: "chennai",
    name: { en: "Chennai – Regional Office", de: "Chennai – Regionalbüro" },
    lines: ["No. 3, Nakkiren Street, Periyar Nagar,", "Pallikaranai, Chennai 600100"],
    position: [12.9305, 80.2078], // Pallikaranai (address confirmed by STELZ 2026-11-25)
  },
];

const UI: Record<Lang, { all: string; credit: string; creditButton: string }> = {
  en: { all: "All locations", credit: "Map tiles © Esri — Esri, DeLorme, NAVTEQ", creditButton: "Map credits" },
  de: { all: "Alle Standorte", credit: "Kartenkacheln © Esri — Esri, DeLorme, NAVTEQ", creditButton: "Kartenhinweise" },
};

const FOCUS_ZOOM = 13; // close enough that the Bengaluru office and factory pins separate
const FIT_PADDING: [number, number] = [70, 70];

/* ---------- Custom pin HTML / icon ---------- */

function createPinIcon(loc: LocationPin, lang: Lang, index: number, isActive: boolean): DivIcon {
  const delay = `${index * 0.8}s`; // stagger pulse per pin
  // One flowing paragraph: fixed line breaks wrapped awkwardly inside the 280px card.
  const tooltipHtml = `<p>${loc.lines.join(" ")}</p>`;

  const html = `
    <div class="map-pin-root ${isActive ? "is-active" : ""}">
      <div class="map-pin-tooltip">
        <div class="map-pin-tooltip-inner">
          <h3>${loc.name[lang]}</h3>
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

  return L.divIcon({ html, className: "", iconSize: [40, 40], iconAnchor: [20, 20] });
}

/* ---------- Moves the map when a location is chosen ---------- */

function FocusController({ focusId, bounds }: { focusId: string | null; bounds: L.LatLngBounds }) {
  const map = useMap();
  useEffect(() => {
    const loc = LOCATIONS.find((l) => l.id === focusId);
    if (loc) map.flyTo(loc.position, FOCUS_ZOOM, { duration: 0.8 });
    else map.flyToBounds(bounds, { padding: FIT_PADDING, duration: 0.8 });
  }, [focusId, bounds, map]);
  return null;
}

/* ---------- Small "i" button instead of a visible third-party credit line ----------
 * The tile provider's credit is kept (their terms ask for attribution) but only shown when
 * the visitor opens it, so no third-party name is displayed on the map itself.
 */
function MapCredit({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="absolute bottom-2 right-2 z-[1000] flex items-center gap-2">
      {open && (
        <span className="rounded bg-white/95 px-2 py-1 text-[11px] text-neutral-600 shadow">{UI[lang].credit}</span>
      )}
      <button
        type="button"
        aria-label={UI[lang].creditButton}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="grid size-6 place-items-center rounded-full bg-white/90 text-[12px] font-semibold text-neutral-500 shadow hover:text-[#006DDB]"
      >
        i
      </button>
    </div>
  );
}

/* ---------- Map component ---------- */

export default function LeafletLocationsMap(): JSX.Element {
  const pathname = usePathname() || "/";
  const lang: Lang = pathname === "/de" || pathname.startsWith("/de/") ? "de" : "en";
  const [activeId, setActiveId] = useState<string | null>(null); // pin showing its address
  const [focusId, setFocusId] = useState<string | null>(null); // location the map is zoomed to
  const bounds = useMemo(() => L.latLngBounds(LOCATIONS.map((l) => l.position)), []);

  const choose = (id: string | null) => {
    setFocusId(id);
    setActiveId(id);
  };

  const chip = (selected: boolean) =>
    [
      "px-3 py-1.5 text-[13.5px] tablet:px-4 tablet:py-2 tablet:text-[15px] font-medium border transition-colors",
      selected
        ? "bg-[#006DDB] border-[#006DDB] text-white"
        : "bg-[#E7F0FF] border-[#d0ddf4] text-[#174b92] hover:bg-[#d0ddf4]",
    ].join(" ");

  return (
    <div>
      {/* Location buttons: jump to each site (the two Bengaluru sites are ~13 km apart and
          would overlap when the whole map is shown). */}
      <div className="mb-4 flex flex-wrap justify-center gap-2" role="group" aria-label={UI[lang].all}>
        <button type="button" className={chip(focusId === null)} aria-pressed={focusId === null} onClick={() => choose(null)}>
          {UI[lang].all}
        </button>
        {LOCATIONS.map((loc) => (
          <button
            key={loc.id}
            type="button"
            className={chip(focusId === loc.id)}
            aria-pressed={focusId === loc.id}
            onClick={() => choose(loc.id)}
          >
            {loc.name[lang]}
          </button>
        ))}
      </div>

      <div className="relative">
        <MapContainer
          bounds={bounds}
          boundsOptions={{ padding: FIT_PADDING }}
          scrollWheelZoom={false}
          className="h-[520px] w-full relative z-0"
          attributionControl={false}
          preferCanvas={false}
        >
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
            maxZoom={16}
            opacity={0.7}
          />
          <FocusController focusId={focusId} bounds={bounds} />

          {LOCATIONS.map((loc, index) => (
            <Marker
              key={loc.id}
              position={loc.position}
              icon={createPinIcon(loc, lang, index, activeId === loc.id)}
              zIndexOffset={activeId === loc.id ? 1000 : 0} // open address card stays on top
              eventHandlers={{
                mouseover: () => setActiveId(loc.id),
                mouseout: () => setActiveId((prev) => (prev === loc.id && focusId !== loc.id ? null : prev)),
                click: () => choose(focusId === loc.id ? null : loc.id),
              }}
            />
          ))}
        </MapContainer>
        <MapCredit lang={lang} />
      </div>
    </div>
  );
}
