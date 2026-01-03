import { WCDataModel } from "@/models/WCDataModel";

export default function WCDetailView({ wc }: { wc: WCDataModel }) {
  return (
    <div className="bg-blue-400 p-10 flex flex-col gap-2 h-screen">
      <h2>{wc.name}</h2>
      <p>Latitude: {wc.latitude}</p>
      <p>Longitude: {wc.longitude}</p>
      <p>Status: {wc.status}</p>
    </div>
  );
}
