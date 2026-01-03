"use client";
import {
  BookMarkIcon,
  ChatRoundIcon,
  MapPointBoldIcon,
  MapPointIcon,
  UserIcon,
} from "@repo/ui/components/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MobileMapNavigation() {
  const navItems = [
    {
      label: "نقشه",
      href: "/map",
      icon: MapPointBoldIcon,
    },
    {
      label: "ذخیره‌ها",
      href: "/saved",
      icon: BookMarkIcon,
    },
    {
      label: "نظرات من",
      href: "/comments",
      icon: ChatRoundIcon,
    },
    {
      label: "پروفایل",
      href: "/profile",
      icon: UserIcon,
    },
  ];

  const pathName = usePathname();

  return (
    <div className="bg-white flex pt-5 pb-5 px-10 justify-between">
      {navItems.map((item, index) => {
        const isActive =
          item.href === "/map"
            ? pathName === "/map"
            : pathName.startsWith(item.href);
        return (
          <Link
            key={index}
            href={item.href}
            className={`flex flex-col items-center gap-2 cursor-pointer `}
          >
            <item.icon
              className={`w-6 h-6 ${isActive ? "fill-[#006DEA] " : "fill-none"}`}
            />
            <span
              className={`text-[12px] font-medium ${isActive ? "text-[#006DEA]" : "text-gray-500"}`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
