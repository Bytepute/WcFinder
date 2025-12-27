import { cn } from "./lib/utils";
import React from "react";

interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <div className={cn(className, "flex flex-col")} dir="rtl">
        {label && (
          <label className="text-sm font-medium text-gray-700">{label}</label>
        )}
        <input
          ref={ref}
          className={cn(
            "px-4 py-2 border-[1px] border-gray-200 rounded-[8px] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-[#CBCBCB] text-text-primary",
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);
