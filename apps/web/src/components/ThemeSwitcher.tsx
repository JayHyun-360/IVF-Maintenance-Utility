"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/components/ThemeProvider";
import {
  getStoredTheme,
  setStoredTheme,
  applyTheme,
  type Theme,
} from "@/lib/theme";

const themes: {
  value: Theme;
  label: string;
  icon: string;
  colors: { primary: string; secondary: string };
  description: string;
}[] = [
  {
    value: "standard",
    label: "Aerospace Midnight",
    icon: "🚀",
    colors: { primary: "#0B0E11", secondary: "#14b8a6" },
    description: "Deep space black with cyan accents",
  },
  {
    value: "light",
    label: "Aerospace Dawn",
    icon: "✨",
    colors: { primary: "#F8FAFC", secondary: "#0891b2" },
    description: "Light horizon with sky blue highlights",
  },
  {
    value: "dark",
    label: "Aerospace Nebula",
    icon: "🌌",
    colors: { primary: "#0F172A", secondary: "#8b5cf6" },
    description: "Cosmic dark with purple nebula accents",
  },
  {
    value: "ocean",
    label: "Aerospace Ocean",
    icon: "�",
    colors: { primary: "#0c4a6e", secondary: "#06b6d4" },
    description: "Deep ocean blue with cyan waves",
  },
  {
    value: "sunset",
    label: "Aerospace Sunset",
    icon: "🌅",
    colors: { primary: "#431407", secondary: "#f97316" },
    description: "Warm sunset with orange glow",
  },
];

export default function ThemeSwitcher() {
  const { themeConfig, setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<Theme>(() =>
    getStoredTheme(),
  );
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleThemeChange = (theme: Theme) => {
    // Prevent rapid theme switching
    if (currentTheme === theme) return;

    // Update theme
    setCurrentTheme(theme);
    setStoredTheme(theme);
    applyTheme(theme);
    setTheme(theme);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentThemeData = themes.find((t) => t.value === currentTheme);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-2 py-1.5 rounded-lg transition-all duration-200 hover:shadow-sm active:scale-95"
        style={{
          backgroundColor: themeConfig.colors.surface,
          border: `1px solid ${themeConfig.colors.border}`,
          color: themeConfig.colors.text,
        }}
      >
        <span className="text-sm">{currentThemeData?.icon}</span>
        <span className="text-xs font-medium hidden sm:inline">
          {currentThemeData?.label}
        </span>
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute top-full right-0 mt-1.5 w-48 rounded-lg shadow-sm border"
          style={{
            backgroundColor: themeConfig.colors.surface,
            borderColor: themeConfig.colors.border,
            zIndex: 9999,
          }}
        >
          <div className="p-1.5">
            {themes.map((theme) => (
              <button
                key={theme.value}
                onClick={() => handleThemeChange(theme.value)}
                className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded-md transition-all duration-200 ${
                  currentTheme === theme.value
                    ? "bg-primary/10"
                    : "hover:bg-surface"
                }`}
                style={{
                  color: themeConfig.colors.text,
                }}
              >
                <div className="flex items-center space-x-1.5">
                  <span className="text-sm">{theme.icon}</span>
                  <div className="flex space-x-1">
                    <div
                      className="w-3 h-3 rounded-full border"
                      style={{
                        backgroundColor: theme.colors.primary,
                        borderColor: themeConfig.colors.border,
                      }}
                    />
                    <div
                      className="w-3 h-3 rounded-full border"
                      style={{
                        backgroundColor: theme.colors.secondary,
                        borderColor: themeConfig.colors.border,
                      }}
                    />
                  </div>
                </div>
                <div className="flex-1 text-left">
                  <div className="text-xs font-medium">{theme.label}</div>
                  <div
                    className="text-xs"
                    style={{ color: themeConfig.colors.textSecondary }}
                  >
                    {theme.description}
                  </div>
                </div>
                {currentTheme === theme.value && (
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
