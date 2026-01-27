"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import {
  Theme,
  ThemeConfig,
  themes,
  initializeTheme,
  applyTheme,
} from "@/lib/theme";

interface ThemeContextType {
  theme: Theme;
  themeConfig: ThemeConfig;
  setTheme: (theme: Theme) => void;
  availableThemes: ThemeConfig[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => initializeTheme());

  const setTheme = (newTheme: Theme) => {
    // Only apply theme if it's different
    if (theme !== newTheme) {
      setThemeState(newTheme);
      applyTheme(newTheme);
    }
  };

  const themeConfig = themes[theme];
  const availableThemes = Object.values(themes);

  return (
    <ThemeContext.Provider
      value={{ theme, themeConfig, setTheme, availableThemes }}
    >
      <div className={`theme-${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
}
