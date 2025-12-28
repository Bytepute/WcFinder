import { WC } from "@/components/Map/WCMap";

export default function WCDetailView({ wc }: { wc: WC }) {
  return (
    <div className="bg-blue-400 p-10 flex flex-col gap-2 h-screen">
      <h2>{wc.name}</h2>
      <p>Latitude: {wc.latitude}</p>
      <p>Longitude: {wc.longitude}</p>
      <p>Status: {wc.status}</p>
    </div>
  );
}
