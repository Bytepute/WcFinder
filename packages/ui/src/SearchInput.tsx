"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import { cn } from "./lib/utils";
import { Input } from "./components/input";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  onSearch?: (value: string) => void;
  containerClassName?: string;
}

export function SearchInput({
  label = "نام مکان",
  placeholder = "جستجو کن",
  className,
  containerClassName,
  value,
  onChange,
  onSearch,
  ...props
}: SearchInputProps) {
  const [internalValue, setInternalValue] = React.useState("");

  const isControlled = value !== undefined;
  const currentValue = isControlled ? String(value) : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!isControlled) setInternalValue(newValue);
    onChange?.(e);
    onSearch?.(newValue);
  };

  const handleClear = () => {
    const newValue = "";
    if (!isControlled) setInternalValue(newValue);

    const event = {
      target: { value: newValue },
    } as React.ChangeEvent<HTMLInputElement>;

    onChange?.(event);
    onSearch?.(newValue);
  };

  return (
    <div className={cn("relative w-full", containerClassName)} dir="rtl">
      <label
        htmlFor="search-input"
        className="absolute -top-2.5 right-4 z-10 bg-white px-1 text-[12px]  text-gray-800 transition-colors peer-focus:text-blue-600"
      >
        {label}
      </label>

      <div className="relative">
        <Input
          id="search-input"
          value={currentValue}
          onChange={handleChange}
          placeholder={placeholder}
          className={cn(
            "bg-white text-gray-800 peer h-12 rounded-[12px] border-[1px] placeholder:text-gray-400 placeholder:text-[16px] placeholder:text-gray-400 border-gray-400 pl-10 pr-4 text-right hover:border-gray-500",
            className,
          )}
          {...props}
        />

        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {currentValue && (
            <button
              onClick={handleClear}
              type="button"
              className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <Search className="h-5 w-5 text-gray-400" />
        </div>
      </div>
    </div>
  );
}
