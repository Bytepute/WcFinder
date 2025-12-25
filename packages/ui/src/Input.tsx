import { ChangeEventHandler } from "react";
import { cn } from "./lib/utils";

interface InputProps {
  className?: string;
  placeholder?: string;
  label?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export function Input({
  label,
  value,
  onChange,
  placeholder = "Input Placeholder",
  className,
}: InputProps) {
  return (
    <div className={cn(className, "flex flex-col")} dir="rtl">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        className="mt-1 px-4 py-2 border-[1px] border-gray-200 rounded-[8px] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-[#CBCBCB]"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
