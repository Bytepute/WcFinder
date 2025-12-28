import { WC } from "@/components/Map/WCMap";

export default function WCListView({ wcs }: { wcs: WC[] }) {
  return (
    <div className="bg-red-400 h-screen p-10 flex flex-col gap-2">
      {wcs.map((wc) => (
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
