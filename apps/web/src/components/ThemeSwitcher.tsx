"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";
import {
  getStoredTheme,
  setStoredTheme,
  applyTheme,
  type Theme,
} from "@/lib/theme";
import { Z_INDEX } from "@/lib/z-index";

const themes: {
  value: Theme;
  label: string;
  icon: string;
  colors: { primary: string; secondary: string };
  description: string;
}[] = [
  {
    value: "standard",
    label: "Nature",
    icon: "🌿",
    colors: { primary: "#10B981", secondary: "#059669" },
    description: "Clean green and white theme",
  },
  {
    value: "light",
    label: "Ocean Light",
    icon: "🌊",
    colors: { primary: "#0EA5E9", secondary: "#06B6D4" },
    description: "Fresh sky blue and cyan theme",
  },
  {
    value: "dark",
    label: "Midnight Dark",
    icon: "🌃",
    colors: { primary: "#3B82F6", secondary: "#1D4ED8" },
    description: "Professional blue slate theme",
  },
];

export default function ThemeSwitcher() {
  const { themeConfig, setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<Theme>(() =>
    getStoredTheme(),
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeChange = (theme: Theme) => {
    // Prevent rapid theme switching
    if (currentTheme === theme) return;

    // Add visual feedback with enhanced animations
    const button = document.activeElement as HTMLElement;
    if (button) {
      button.style.transform = "scale(0.95) rotate(2deg)";
      button.style.transition = "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)";
      setTimeout(() => {
        button.style.transform = "scale(1) rotate(0deg)";
      }, 200);
    }

    // Add ripple effect to theme switcher
    const ripple = document.createElement("div");
    ripple.style.position = "absolute";
    ripple.style.width = "20px";
    ripple.style.height = "20px";
    ripple.style.borderRadius = "50%";
    ripple.style.backgroundColor = themeConfig.colors.primary;
    ripple.style.opacity = "0.6";
    ripple.style.transform = "translate(-50%, -50%) scale(0)";
    ripple.style.transition =
      "transform 0.6s cubic-bezier(0.4, 0, 0.0.1), opacity 0.6s ease-out";
    ripple.style.pointerEvents = "none";
    ripple.style.zIndex = Z_INDEX.MAX.toString();

    if (button) {
      const rect = button.getBoundingClientRect();
      ripple.style.left = `${rect.left + rect.width / 2}px`;
      ripple.style.top = `${rect.top + rect.height / 2}px`;
      document.body.appendChild(ripple);

      // Animate ripple
      setTimeout(() => {
        ripple.style.transform = "translate(-50%, -50%) scale(4)";
        ripple.style.opacity = "0";
      }, 10);

      // Remove ripple
      setTimeout(() => {
        document.body.removeChild(ripple);
      }, 600);
    }

    // Update theme with smooth transition
    setCurrentTheme(theme);
    setStoredTheme(theme);
    applyTheme(theme);
    setTheme(theme);
    setIsOpen(false);
  };

  useEffect(() => {
    // Only run on client-side
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    // Add smooth transition to all elements before changing theme
    document.body.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";

    // Remove transition after theme change is complete
    const timeout = setTimeout(() => {
      if (typeof document !== "undefined") {
        document.body.style.transition = "";
      }
    }, 900);

    return () => clearTimeout(timeout);
  }, [currentTheme]);

  const currentThemeData = themes.find((t) => t.value === currentTheme);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 transform active:scale-95"
        style={{
          backgroundColor: themeConfig.colors.surface,
          border: `1px solid ${themeConfig.colors.border}`,
          color: themeConfig.colors.text,
          transition: "all 0.3s ease-in-out, transform 0.2s ease-in-out",
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
          className="absolute top-full right-0 mt-2 w-64 rounded-xl shadow-lg border"
          style={{
            backgroundColor: themeConfig.colors.surface,
            borderColor: themeConfig.colors.border,
            zIndex: Z_INDEX.TOOLTIP + 1,
          }}
        >
          <div className="p-2">
            {themes.map((theme) => (
              <button
                key={theme.value}
                onClick={() => handleThemeChange(theme.value)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-300 transform ${
                  currentTheme === theme.value
                    ? "scale-105"
                    : "hover:scale-105 active:scale-95"
                }`}
                style={{
                  backgroundColor:
                    currentTheme === theme.value
                      ? `${theme.colors.primary}20`
                      : "transparent",
                  color: themeConfig.colors.text,
                  transition:
                    "all 0.3s ease-in-out, transform 0.2s ease-in-out",
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
