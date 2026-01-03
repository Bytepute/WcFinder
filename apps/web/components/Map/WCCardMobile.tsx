"use client";
import { WCDataModel } from "@/models/WCDataModel";
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
import { X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function WCCardMobile({ wc }: { wc: WCDataModel | undefined }) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  function handleClose() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("wcId");
    router.replace(`${pathName}/${params.toString()}`, { scroll: false });
  }

  if (!wc) return null;
  return (
    <div
      className="flex flex-col gap-2 py-4 px-2 border-b border-gray-200 rounded-2xl bg-white"
      key={wc?.id}
    >
      <div className="flex gap-2 items-center">
        <Image src={poopIcon} alt={"Poop Icon"} width={24} height={24} />
        <h2 className="flex-1 text-gray-900 font-bold text-[16px]">
          {wc?.name}
        </h2>
        <X
          onClick={handleClose}
          className="justify-self-end cursor-pointer text-gray-600"
        />
      </div>
      <div className="flex gap-2 items-center">
        <MapPointIcon />
        <p className="text-[14px] text-gray-800">{wc?.address}</p>
      </div>
      <div className="flex gap-2 items-center ">
        <StarIcon />
        <p className="text-[14px] text-gray-800">
          {wc?.rating ? toPersianNum(wc.rating) : "N/A"} از ۵ (
          {wc?.ratingCount ? toPersianNum(wc.ratingCount) : "N/A"}) رای
        </p>
      </div>
      <div className="flex gap-2">
        {wc?.isClean && (
          <Badge variant="primary">
            <StarMinimalIcon />
            تمیز
          </Badge>
        )}
        {wc?.isFree && (
          <Badge variant="success">
            <PriceTagIcon />
            رایگان
          </Badge>
        )}
        {wc?.isUncrowded && (
          <Badge variant="secondary">
            <UserHandUpIcon />
            خلوت
          </Badge>
        )}
      </div>
    </div>
  );
}
