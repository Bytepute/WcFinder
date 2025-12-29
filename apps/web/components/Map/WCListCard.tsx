import { WC } from "./WCMap";
import Image from "next/image";
import poopIcon from "../../assets/poop.svg?url";
import { MapPointIcon } from "@repo/ui/icons";

export function WCListCard({ wc }: { wc: WC }) {
  return (
    <div
      className="flex flex-col gap-2 py-4 px-2 border-b border-gray-200"
      key={wc.id}
    >
      <div className="flex gap-2 items-center">
        <Image src={poopIcon} alt={"Poop Icon"} width={24} height={24} />
        <h2 className="text-gray-900 font-bold text-[16px]">{wc.name}</h2>
      </div>
      <MapPointIcon />

      <p>Latitude: {wc.latitude}</p>
      <p>Longitude: {wc.longitude}</p>
      <p>Status: {wc.status}</p>
    </div>
  );
}
