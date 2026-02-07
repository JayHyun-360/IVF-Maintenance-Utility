"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { LoadingSpinner } from "./LoadingSpinner";

interface SearchInputProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
  debounceMs?: number;
  isLoading?: boolean;
}

export function SearchInput({
  onSearch,
  placeholder = "Search...",
  className = "",
  debounceMs = 300,
  isLoading = false,
}: SearchInputProps) {
  const { themeConfig } = useTheme();
  const [query, setQuery] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onSearch(query);
    }, debounceMs);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [query, onSearch, debounceMs]);

  return (
    <div
      className={`flex items-center rounded-full border transition-all focus-within:ring-2 ${className}`}
      style={{
        backgroundColor: `${themeConfig.colors.text}08`,
        borderColor: `${themeConfig.colors.border}20`,
        // @ts-expect-error - ringColor is a valid CSS property but not in TypeScript's CSSProperties
        ringColor: `${themeConfig.colors.primary}40`,
      }}
    >
      <div className="flex-1 flex items-center">
        <svg
          className="w-4 h-4 opacity-30 mr-2 ml-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent border-none outline-none text-sm font-bold flex-1 py-2 pr-4"
          style={{ color: themeConfig.colors.text }}
        />
      </div>

      {isLoading && (
        <div className="mr-3">
          <LoadingSpinner size="sm" />
        </div>
      )}
    </div>
  );
}
