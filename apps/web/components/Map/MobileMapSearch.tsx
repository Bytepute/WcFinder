"use client";
import { SearchInput } from "@repo/ui";
import { useState } from "react";

export default function MobileMapSearch() {
  const [isSearchPanelOpen, setIsSearchPanelOpen] = useState(false);
  const [query, setQuery] = useState("");

  function handleFocus() {
    setIsSearchPanelOpen(true);
  }

  function handleBlur() {
    if (!query.trim()) setIsSearchPanelOpen(false);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    if (e.target.value === "") setIsSearchPanelOpen(false);
  }

  return (
    <div className="p-4">
      <SearchInput
        value={query}
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={handleFocus}
      />
      {isSearchPanelOpen && <div className="bg-white h-screen"></div>}
    </div>
  );
}
