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

  const geojson: FeatureCollection = useMemo(() => {
    return {
      type: "FeatureCollection",
      features: wcs.map((wc) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [wc.longitude, wc.latitude],
        },
        properties: {
          id: wc.id,
          name: wc.name,
          status: wc.status,
        },
      })),
    };
  }, [wcs]);

  const layerStyle: SymbolLayer = {
    id: "wc-points",
    type: "symbol",
    layout: {
      "text-field": "🚽",
      "text-size": 40,
      "text-anchor": "bottom",
      "text-allow-overlap": true,
      "text-offset": [0, 0],
    },
    paint: {
      "text-color": "#235",
      "text-halo-color": "#ffffff",
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
        interactiveLayerIds={["wc-points"]}
        onClick={handleClick}
        cursor="pointer"
      >
        <GeolocateControl position="top-right" />
        <NavigationControl position="bottom-right" showCompass={false} />

        {/* The Data Source */}
        <Source type="geojson" data={geojson}>
          {/*  The Visual Layer */}
          <Layer {...layerStyle} />
        </Source>

        {selectedWC && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-lg z-50 animate-in fade-in slide-in-from-top-2">
            Selected: {selectedWC}
          </div>
        )}
      </Map>
    </div>
  );
}
