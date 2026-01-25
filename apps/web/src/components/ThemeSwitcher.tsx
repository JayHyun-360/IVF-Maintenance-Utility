"use client";

import { useState, useEffect } from "react";
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
}[] = [
  {
    value: "standard",
    label: "Warm Harmony",
    icon: "🎨",
    colors: { primary: "#FF6B6B", secondary: "#4ECDC4" },
  },
  {
    value: "dark",
    label: "Dark Mode",
    icon: "🌙",
    colors: { primary: "#1F2937", secondary: "#111827" },
  },
  {
    value: "light",
    label: "Light Mode",
    icon: "☀️",
    colors: { primary: "#FFFFFF", secondary: "#F3F4F6" },
  },
];

export default function ThemeSwitcher() {
  const { themeConfig, setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<Theme>("standard");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const stored = getStoredTheme();
    setCurrentTheme(stored);
  }, []);

  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme);
    setStoredTheme(theme);
    applyTheme(theme);
    setTheme(theme);
    setIsOpen(false);
  };

  const currentThemeData = themes.find((t) => t.value === currentTheme);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105"
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
          className="absolute top-full right-0 mt-2 w-56 rounded-xl shadow-lg border z-50"
          style={{
            backgroundColor: themeConfig.colors.surface,
            borderColor: themeConfig.colors.border,
          }}
        >
          <div className="p-2">
            {themes.map((theme) => (
              <button
                key={theme.value}
                onClick={() => handleThemeChange(theme.value)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                  currentTheme === theme.value ? "scale-105" : "hover:scale-105"
                }`}
                style={{
                  backgroundColor:
                    currentTheme === theme.value
                      ? `${theme.colors.primary}20`
                      : "transparent",
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
