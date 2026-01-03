"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import Map, {
  NavigationControl,
  GeolocateControl,
  Marker,
  MapRef,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

import { MapMarkerIcon } from "@repo/ui/icons";

import { useRouter, useSearchParams } from "next/navigation";
import { WCDataModel } from "@/models/WCDataModel";

interface WCMapProps {
  wcs: WCDataModel[];
}

export default function WCMap({ wcs }: WCMapProps) {
  useEffect(() => {
    import("maplibre-gl").then((maplibregl) => {
      if (maplibregl.getRTLTextPluginStatus() === "unavailable") {
        maplibregl.setRTLTextPlugin(
          "https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.2.3/mapbox-gl-rtl-text.min.js",
          true,
        );
      }
    });
  }, []);

  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedWC, setSelectedWC] = useState<number | null>(null);
  const mapRef = useRef<MapRef>(null);

  const onMarkerClick = (wc: WCDataModel) => {
    console.log("Clicked:", wc.id);
    const params = new URLSearchParams(searchParams.toString());
    mapRef.current?.flyTo({
      center: [wc.longitude, wc.latitude],
      zoom: 16, // Optional: zoom in closer when clicked
      duration: 1500, // Animation duration in milliseconds
      padding: { top: 50, bottom: 0, left: 0, right: 0 }, // Optional: Offset if you have UI covering part of the map
    });

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
        ref={mapRef}
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
