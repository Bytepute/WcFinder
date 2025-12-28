"use client";

import { useMemo, useState } from "react";
import Map, {
  Source,
  Layer,
  NavigationControl,
  GeolocateControl,
  MapLayerMouseEvent,
  SymbolLayer,
} from "react-map-gl/maplibre";

import type { FeatureCollection } from "geojson";
import { useRouter, useSearchParams } from "next/navigation";

export interface WC {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  status: "open" | "closed" | "maintenance";
}

interface WCMapProps {
  wcs: WC[];
}

export default function WCMap({ wcs }: WCMapProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedWC, setSelectedWC] = useState<string | null>(null);

  // 1. Transform your data into GeoJSON (The format MapLibre understands natively)
  const geojson: FeatureCollection = useMemo(() => {
    return {
      type: "FeatureCollection",
      features: wcs.map((wc) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [wc.longitude, wc.latitude], // [Lng, Lat] order
        },
        properties: {
          id: wc.id,
          name: wc.name,
          status: wc.status,
        },
      })),
    };
  }, [wcs]);

  // 2. Define the Layer Style (How the points look)
  // We render the Emoji as a "Text Label" inside the map engine.
  const layerStyle: SymbolLayer = {
    id: "wc-points",
    type: "symbol",
    layout: {
      "text-field": "🚽", // Render the emoji directly
      "text-size": 40, // Size of the emoji
      "text-anchor": "bottom", // Pin the bottom of the emoji to the coordinate
      "text-allow-overlap": true, // Allow them to stack if needed
      "text-offset": [0, 0], // Fine-tune position if needed
    },
    paint: {
      "text-color": "#235",
      "text-halo-color": "#ffffff", // White outline (Halo) around emoji
      "text-halo-width": 2,
    },
  };

  const handleClick = (e: MapLayerMouseEvent) => {
    const feature = e.features?.[0];
    if (feature && feature.properties?.id) {
      const id = feature.properties.id;
      console.log("Clicked:", id);
      const params = new URLSearchParams(searchParams.toString());
      params.set("wcId", id.toString());
      setSelectedWC(id);
      router.push(`?${params.toString()}`, { scroll: false });
    }
  };

  return (
    <div className="w-full h-dvh relative">
      <Map
        initialViewState={{
          longitude: 51.389,
          latitude: 35.689,
          zoom: 14,
        }}
        mapLib={import("maplibre-gl")}
        mapStyle="https://tiles.openfreemap.org/styles/bright"
        style={{ width: "100%", height: "100%" }}
        // Optimization:
        dragRotate={true}
        touchZoomRotate={true}
        // Interaction:
        interactiveLayerIds={["wc-points"]} // Enable clicks ONLY on this layer
        onClick={handleClick}
        cursor="pointer"
      >
        <GeolocateControl position="top-right" />
        <NavigationControl position="bottom-right" showCompass={false} />

        {/* 3. The Data Source */}
        <Source type="geojson" data={geojson}>
          {/* 4. The Visual Layer */}
          <Layer {...layerStyle} />
        </Source>

        {/* Optional: Show a simple Popup when clicked (Since layers don't have children) */}
        {selectedWC && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-lg z-50 animate-in fade-in slide-in-from-top-2">
            Selected: {selectedWC}
          </div>
        )}
      </Map>
    </div>
  );
}
