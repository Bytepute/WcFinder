import { WC } from "@/components/Map/WCMap";
import WCMap from "@/components/Map/WCMap";
import WCDetailView from "@/components/Map/WCDetailView";
import WCListView from "@/components/Map/WCListView";

// placeholder service
export const MOCK_WCS: WC[] = [
  {
    id: 1,
    name: "سرویس بهداشتی پارک ملت",
    latitude: 35.7774,
    longitude: 51.4102,
    status: "open",
  },
  {
    id: 2,
    name: "سرویس برج میلاد",
    latitude: 35.7448,
    longitude: 51.3753,
    status: "open",
  },
  {
    id: 3,
    name: "سرویس عمومی میدان آزادی",
    latitude: 35.6997,
    longitude: 51.338,
    status: "maintenance",
  },
  {
    id: 4,
    name: "سرویس بازار بزرگ",
    latitude: 35.6728,
    longitude: 51.4184,
    status: "open",
  },
  {
    id: 5,
    name: "سرویس پارک لاله",
    latitude: 35.7086,
    longitude: 51.3912,
    status: "open",
  },
  {
    id: 6,
    name: "سرویس مترو تئاتر شهر",
    latitude: 35.7005,
    longitude: 51.4053,
    status: "closed",
  },
  {
    id: 7,
    name: "سرویس پل طبیعت",
    latitude: 35.7547,
    longitude: 51.4204,
    status: "open",
  },
];
async function getWCs() {
  return MOCK_WCS;
}

interface MapPageProps {
  searchParams: Promise<{ wcId?: string }>;
}

export default async function MapPage({ searchParams }: MapPageProps) {
  const wcs = await getWCs();
  const { wcId } = await searchParams;
  const selectedWC = wcId
    ? wcs.find((wc) => wc.id === Number(wcId))
    : undefined;
  return (
    <main className="relative w-full h-screen flex overflow-hidden">
      <div className="hidden md:block w-96 h-full z-10 bg-white shadow-xl overflow-y-auto">
        {selectedWC ? (
          <WCDetailView wc={selectedWC} />
        ) : (
          <WCListView wcs={wcs} />
        )}
      </div>
      {/* MAP */}
      <div className="flex-1 relative h-full">
        <WCMap wcs={wcs} />
      </div>
    </main>
  );
}
