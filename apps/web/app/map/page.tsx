import { WCDataModel } from "@/models/WCDataModel";
import WCMap from "@/components/Map/WCMap";
import WCDetailView from "@/components/Map/WCDetailView";
import WCListView from "@/components/Map/WCListView";
import MobileMapSearch from "@/components/Map/MobileMapSearch";
import { MobileMapNavigation } from "@/components/Map/MobileMapNavigation";
import { WCListCard } from "@/components/Map/WCListCard";
import WCCardMobile from "@/components/Map/WCCardMobile";

// placeholder service
export const MOCK_WCS: WCDataModel[] = [
  {
    id: 1,
    name: "سرویس بهداشتی پارک ملت",
    address: "نزدیک ورودی مترو",
    rating: 4.5,
    ratingCount: 100,
    latitude: 35.7774,
    longitude: 51.4102,
    status: "open",
    isFree: true,
    isUncrowded: true,
    isClean: true,
  },
  {
    id: 2,
    name: "سرویس برج میلاد",
    address: "نزدیک ورودی مترو",
    rating: 4.3,
    ratingCount: 12,
    latitude: 35.7448,
    longitude: 51.3753,
    status: "open",
    isFree: true,
    isUncrowded: true,
    isClean: false,
  },
  {
    id: 3,
    name: "سرویس عمومی میدان آزادی",
    address: "نزدیک ورودی مترو",
    rating: 4.1,
    ratingCount: 124,
    latitude: 35.6997,
    longitude: 51.338,
    status: "maintenance",
    isFree: false,
    isUncrowded: true,
    isClean: true,
  },
  {
    id: 4,
    name: "سرویس بازار بزرگ",
    address: "نزدیک ورودی مترو",
    rating: 3.5,
    ratingCount: 100,
    latitude: 35.6728,
    longitude: 51.4184,
    status: "open",
    isFree: true,
    isUncrowded: false,
    isClean: true,
  },
  {
    id: 5,
    name: "سرویس پارک لاله",
    address: "نزدیک ورودی مترو",
    rating: 4.5,
    ratingCount: 100,
    latitude: 35.7086,
    longitude: 51.3912,
    status: "open",
    isFree: false,
    isUncrowded: false,
    isClean: true,
  },
  {
    id: 6,
    name: "سرویس مترو تئاتر شهر",
    address: "نزدیک ورودی مترو",
    rating: 4.5,
    ratingCount: 100,
    latitude: 35.7005,
    longitude: 51.4053,
    status: "closed",
    isFree: true,
    isUncrowded: false,
    isClean: false,
  },
  {
    id: 7,
    name: "سرویس پل طبیعت",
    address: "نزدیک ورودی مترو",
    rating: 4.5,
    ratingCount: 100,
    latitude: 35.7547,
    longitude: 51.4204,
    status: "open",
    isFree: true,
    isUncrowded: true,
    isClean: true,
  },
  {
    id: 8,
    name: "سرویس پل طبیع  testت",
    rating: 4.5,
    ratingCount: 100,
    address: "نزدیک ورودی مترو",
    latitude: 35.7347,
    longitude: 51.4204,
    status: "open",
    isFree: true,
    isUncrowded: true,
    isClean: true,
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
    <main
      className="relative w-full h-screen flex md:flex-row overflow-hidden"
      dir="rtl"
    >
      {/* --- DESKTOP SIDEBAR  --- */}
      <div className="hidden md:block w-full md:w-1/4 md:max-w-md shrink-0 h-full z-10 bg-white shadow-xl overflow-y-auto">
        {selectedWC ? (
          <WCDetailView wc={selectedWC} />
        ) : (
          <WCListView wcs={wcs} />
        )}
      </div>

      {/* --- MOBILE OVERLAYS  --- */}

      <div className="md:hidden absolute inset-0 z-20 pointer-events-none flex flex-col justify-between">
        {/* TOP: Search Bar */}
        <div className="pointer-events-auto bg-white">
          <MobileMapSearch />
        </div>

        {/* BOTTOM: Card & Navigation */}
        <div className="pointer-events-auto flex flex-col w-full pb-0 ">
          {selectedWC && (
            <div className="px-4 mb-5 animate-in slide-in-from-bottom-4 fade-in">
              <WCCardMobile wc={selectedWC} />
            </div>
          )}

          <MobileMapNavigation />
        </div>
      </div>

      {/* --- MAP CONTAINER --- */}

      <div className="w-full h-full absolute inset-0 md:relative md:flex-1 z-0">
        <WCMap wcs={wcs} />
      </div>
    </main>
  );
}
