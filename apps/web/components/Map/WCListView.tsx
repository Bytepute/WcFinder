"use client";
import { WC } from "@/components/Map/WCMap";
import searchImage from "@/assets/searchImage.png";
import Image from "next/image";
import { Button, SearchInput } from "@repo/ui";
import { useState } from "react";

export default function WCListView({ wcs }: { wcs: WC[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWcs = wcs.filter((wc) => wc.name.includes(searchQuery));

  return (
    <div className="bg-white h-screen pt-4 px-4 flex flex-col gap-4">
      <div className="flex gap-4">
        <Image src={searchImage} alt="WC Search Image" />
        <div className="flex flex-col gap-2 justify-center">
          <h1 className="text-[16px] text-gray-900 font-medium">
            سرویس بهداشتی‌های تهران
          </h1>
          <p className="text-gray-800 text-[14px] flex gap-1">
            برای WC نزدیکت، لوکیشن رو
            <Button variant="link" className="underline">
              روشن کن
            </Button>
            😌
          </p>
        </div>
      </div>
      <SearchInput
        label="نام مکان"
        placeholder="جستجو کن"
        value={searchQuery}
        onSearch={(value) => setSearchQuery(value)}
      />
      {/* WCs List */}
      {filteredWcs.map((wc) => (
        <div key={wc.id}>
          <h2>{wc.name}</h2>
          <p>Latitude: {wc.latitude}</p>
          <p>Longitude: {wc.longitude}</p>
          <p>Status: {wc.status}</p>
        </div>
      ))}
    </div>
  );
}
