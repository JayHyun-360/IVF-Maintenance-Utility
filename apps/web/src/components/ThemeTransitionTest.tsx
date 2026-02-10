"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { type Theme } from "@/lib/theme";

export default function ThemeTransitionTest() {
  const { theme, themeConfig, setTheme } = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const testThemeTransition = (newTheme: Theme) => {
    if (theme === newTheme) return;

    setIsTransitioning(true);
    setTheme(newTheme);

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
  };

  return (
    <div
      className="p-6 space-y-4"
      style={{
        backgroundColor: themeConfig.colors.surface,
        color: themeConfig.colors.text,
        border: `1px solid ${themeConfig.colors.border}`,
        borderRadius: "0.5rem",
      }}
    >
      <h3 className="text-lg font-semibold mb-4">Theme Transition Test</h3>

      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={() => testThemeTransition("dark")}
          disabled={isTransitioning}
          className={`px-4 py-2 rounded-lg transition-all duration-300 ${
            theme === "dark" ? "ring-2 ring-green-500" : ""
          }`}
          style={{
            backgroundColor:
              theme === "dark"
                ? themeConfig.colors.primary
                : themeConfig.colors.background,
            color: theme === "dark" ? "#FFFFFF" : themeConfig.colors.text,
            border: `1px solid ${themeConfig.colors.border}`,
            opacity: isTransitioning ? 0.6 : 1,
          }}
        >
          � Dark
        </button>

        <button
          onClick={() => testThemeTransition("light")}
          disabled={isTransitioning}
          className={`px-4 py-2 rounded-lg transition-all duration-300 ${
            theme === "light" ? "ring-2 ring-blue-500" : ""
          }`}
          style={{
            backgroundColor:
              theme === "light"
                ? themeConfig.colors.primary
                : themeConfig.colors.background,
            color: theme === "light" ? "#FFFFFF" : themeConfig.colors.text,
            border: `1px solid ${themeConfig.colors.border}`,
            opacity: isTransitioning ? 0.6 : 1,
          }}
        >
          🌊 Light
        </button>

        <button
          onClick={() => testThemeTransition("dark")}
          disabled={isTransitioning}
          className={`px-4 py-2 rounded-lg transition-all duration-300 ${
            theme === "dark" ? "ring-2 ring-blue-600" : ""
          }`}
          style={{
            backgroundColor:
              theme === "dark"
                ? themeConfig.colors.primary
                : themeConfig.colors.background,
            color: theme === "dark" ? "#FFFFFF" : themeConfig.colors.text,
            border: `1px solid ${themeConfig.colors.border}`,
            opacity: isTransitioning ? 0.6 : 1,
          }}
        >
          🌃 Dark
        </button>
      </div>

      <div
        className="mt-4 p-4 rounded-lg"
        style={{
          backgroundColor: themeConfig.colors.background,
          border: `1px solid ${themeConfig.colors.border}`,
        }}
      >
        <p className="text-sm">
          <strong>Current Theme:</strong> {themeConfig.displayName}
          <br />
          <strong>Primary Color:</strong>{" "}
          <span style={{ color: themeConfig.colors.primary }}>
            {themeConfig.colors.primary}
          </span>
          <br />
          <strong>Background:</strong>{" "}
          <span style={{ color: themeConfig.colors.background }}>
            {themeConfig.colors.background}
          </span>
          <br />
          <strong>Text:</strong>{" "}
          <span style={{ color: themeConfig.colors.text }}>
            {themeConfig.colors.text}
          </span>
        </p>
      </div>

      {isTransitioning && (
        <div
          className="mt-2 p-2 rounded-lg"
          style={{
            backgroundColor: `${themeConfig.colors.primary}20`,
            color: themeConfig.colors.primary,
            border: `1px solid ${themeConfig.colors.primary}30`,
          }}
        >
          <p className="text-sm font-medium">🔄 Transitioning theme...</p>
        </div>
      )}
    </div>
  );
}
