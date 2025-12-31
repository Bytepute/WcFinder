"use client";

import { useMemo, useState } from "react";

import Map, {
  NavigationControl,
  GeolocateControl,
  Marker,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

import { MapMarkerIcon } from "@repo/ui/icons";

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
  const [selectedWC, setSelectedWC] = useState<number | null>(null);

  const onMarkerClick = (wc: WC) => {
    console.log("Clicked:", wc.id);
    const params = new URLSearchParams(searchParams.toString());
    params.set("wcId", wc.id.toString());
    setSelectedWC(wc.id);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const markers = useMemo(() => {
    return wcs.map((wc) => (
      <Marker
        key={wc.id}
        longitude={wc.longitude}
        latitude={wc.latitude}
        anchor="bottom"
        onClick={(e) => {
          e.originalEvent.stopPropagation();

          onMarkerClick(wc);
        }}
      >
        <div className="cursor-pointer transition-transform hover:scale-110">
          <MapMarkerIcon
            className={`w-12 h-12 drop-shadow-md transition-colors ${
              selectedWC === wc.id
                ? "text-amber-600 animate-bounce"
                : "text-amber-900 hover:text-amber-700"
            }`}
          />
        </div>
      </Marker>
    ));
  }, [wcs, selectedWC]);

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
        dragRotate={true}
        touchZoomRotate={true}
        cursor="default"
      >
        <GeolocateControl position="top-right" />
        <NavigationControl position="bottom-right" showCompass={false} />

        {markers}

        {selectedWC && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-lg z-50">
            Selected ID: {selectedWC}
          </div>
        )}
      </Map>
    </div>
  );
}
