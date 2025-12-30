import { WC } from "./WCMap";
import Image from "next/image";
import poopIcon from "../../assets/poop.svg?url";
import {
  MapPointIcon,
  PriceTagIcon,
  StarIcon,
  StarMinimalIcon,
  UserHandUpIcon,
} from "@repo/ui/icons";
import { toPersianNum } from "@/utils/toPersianNum";
import { Badge } from "@repo/ui";

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
      <div className="flex gap-2 items-center">
        <MapPointIcon />
        <p className="text-[14px] text-gray-800">{wc.address}</p>
      </div>
      <div className="flex gap-2 items-center ">
        <StarIcon />
        <p className="text-[14px] text-gray-800">
          {toPersianNum(wc.rating)} از ۵ ({toPersianNum(wc.ratingCount)}) رای
        </p>
      </div>
      <div className="flex gap-2">
        {wc.isClean && (
          <Badge variant="primary">
            <StarMinimalIcon />
            تمیز
          </Badge>
        )}
        {wc.isFree && (
          <Badge variant="success">
            <PriceTagIcon />
            رایگان
          </Badge>
        )}
        {wc.isUncrowded && (
          <Badge variant="secondary">
            <UserHandUpIcon />
            خلوت
          </Badge>
        )}
      </div>
    </div>
  );
}
