"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X, Sparkles } from "lucide-react";

const QUICK_SUGGESTIONS = ["Lipstick", "Perfume", "Serum", "Sofa", "Watches"];

export default function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchRef = useRef(null);

  // Sync state with URL query params if present
  useEffect(() => {
    const query = searchParams.get("product") || searchParams.get("query") || "";
    setSearchText(query);
  }, [searchParams]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e?.preventDefault();
    const query = searchText.trim();
    if (!query) return;

    setIsFocused(false);
    router.push(`/products?product=${encodeURIComponent(query)}`);
  };

  const handleClear = () => {
    setSearchText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsFocused(false);
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md mx-auto">
      {/* SEARCH FORM */}
      <form
        onSubmit={handleSearch}
        className={`relative flex items-center w-full rounded-full bg-gray-50 border transition-all duration-200 ${
          isFocused
            ? "bg-white border-accent ring-2 ring-accent/20 shadow-lg"
            : "border-gray-200 hover:border-gray-300 shadow-xs"
        }`}
      >
        {/* Search Icon */}
        <div className="pl-4 pr-2 text-gray-400 flex items-center pointer-events-none">
          <Search size={18} />
        </div>

        {/* Text Input */}
        <input
          type="text"
          value={searchText}
          onFocus={() => setIsFocused(true)}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search products, brands, categories..."
          className="w-full py-2.5 pr-2 bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
        />

        {/* Clear Input Button */}
        {searchText && (
          <button
            type="button"
            onClick={handleClear}
            className="p-1.5 mr-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
            title="Clear search"
          >
            <X size={16} />
          </button>
        )}

        {/* Submit Action Button */}
        <button
          type="submit"
          disabled={!searchText.trim()}
          className="mr-1.5 px-4 py-1.5 bg-accent hover:bg-accent/90 disabled:opacity-50 disabled:hover:bg-accent text-white text-xs font-semibold rounded-full transition-all shadow-xs cursor-pointer disabled:cursor-not-allowed"
        >
          Search
        </button>
      </form>

      {/* DROPDOWN / QUICK SUGGESTIONS */}
      {isFocused && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">
            <Sparkles size={13} className="text-accent" />
            <span>Popular Searches</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {QUICK_SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => {
                  setSearchText(suggestion);
                  router.push(`/products?product=${encodeURIComponent(suggestion)}`);
                  setIsFocused(false);
                }}
                className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-accent/10 hover:text-accent rounded-lg border border-gray-100 transition-colors cursor-pointer"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}