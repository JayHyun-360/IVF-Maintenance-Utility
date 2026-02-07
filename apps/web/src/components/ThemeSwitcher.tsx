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
    label: "Academic Minimalist",
    icon: "�",
    colors: { primary: "#1B4332", secondary: "#FFFFFF" },
    description: "Clean forest green and white theme",
  },
  {
    value: "light",
    label: "Academic Light",
    icon: "📖",
    colors: { primary: "#1B4332", secondary: "#F8FAFC" },
    description: "Light gray with forest green accents",
  },
  {
    value: "dark",
    label: "Academic Dark",
    icon: "🌃",
    colors: { primary: "#1B4332", secondary: "#0F172A" },
    description: "Dark slate with forest green accents",
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
        className="flex items-center space-x-2 px-3 py-2 rounded-md transition-all duration-200 hover:shadow-sm active:scale-95"
        style={{
          backgroundColor: themeConfig.colors.surface,
          border: `1px solid ${themeConfig.colors.border}`,
          color: themeConfig.colors.text,
        }}
      >
        <span className="text-lg">{currentThemeData?.icon}</span>
        <span className="text-sm font-medium">{currentThemeData?.label}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
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
          className="absolute top-full right-0 mt-2 w-56 rounded-md shadow-sm border"
          style={{
            backgroundColor: themeConfig.colors.surface,
            borderColor: themeConfig.colors.border,
            zIndex: 9999,
          }}
        >
          <div className="p-2">
            {themes.map((theme) => (
              <button
                key={theme.value}
                onClick={() => handleThemeChange(theme.value)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-all duration-200 ${
                  currentTheme === theme.value
                    ? "bg-primary/10"
                    : "hover:bg-surface"
                }`}
                style={{
                  color: themeConfig.colors.text,
                }}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{theme.icon}</span>
                  <div className="flex space-x-1">
                    <div
                      className="w-4 h-4 rounded-full border"
                      style={{
                        backgroundColor: theme.colors.primary,
                        borderColor: themeConfig.colors.border,
                      }}
                    />
                    <div
                      className="w-4 h-4 rounded-full border"
                      style={{
                        backgroundColor: theme.colors.secondary,
                        borderColor: themeConfig.colors.border,
                      }}
                    />
                  </div>
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium">{theme.label}</div>
                  <div
                    className="text-xs"
                    style={{ color: themeConfig.colors.textSecondary }}
                  >
                    {theme.description}
                  </div>
                </div>
                {currentTheme === theme.value && (
                  <svg
                    className="w-4 h-4"
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
