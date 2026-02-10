export type Theme = "standard" | "light" | "dark" | "ocean" | "sunset";

export interface ThemeConfig {
  name: string;
  displayName: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    accent_amber: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
  };
}

export const themes: Record<Theme, ThemeConfig> = {
  standard: {
    name: "standard",
    displayName: "Aerospace Midnight",
    colors: {
      primary: "#0B0E11", // Deep space black
      secondary: "#14b8a6", // Cyan accents
      accent: "#06b6d4", // Light cyan
      accent_amber: "#f59e0b", // Amber
      background: "#0B0E11", // Deep space black
      surface: "rgba(255, 255, 255, 0.03)", // Glassmorphism surface
      text: "#F8FAFC", // Light text
      textSecondary: "#94a3b8", // Muted light text
      border: "rgba(255, 255, 255, 0.1)", // Glass border
      success: "#10b981", // Emerald
      warning: "#f59e0b", // Amber
      error: "#ef4444", // Red
    },
  },
  light: {
    name: "light",
    displayName: "Aerospace Dawn",
    colors: {
      primary: "#F8FAFC", // Light horizon
      secondary: "#0891b2", // Sky blue
      accent: "#0ea5e9", // Sky blue
      accent_amber: "#f59e0b", // Amber
      background: "#F8FAFC", // Light horizon
      surface: "#FFFFFF", // Pure white
      text: "#0c4a6e", // Deep blue
      textSecondary: "#64748b", // Slate
      border: "#e2e8f0", // Light border
      success: "#10b981", // Emerald
      warning: "#f59e0b", // Amber
      error: "#ef4444", // Red
    },
  },
  dark: {
    name: "dark",
    displayName: "Aerospace Nebula",
    colors: {
      primary: "#0F172A", // Cosmic dark
      secondary: "#8b5cf6", // Purple nebula
      accent: "#a78bfa", // Light purple
      accent_amber: "#f59e0b", // Amber
      background: "#0F172A", // Cosmic dark
      surface: "rgba(139, 92, 246, 0.1)", // Purple glass
      text: "#F8FAFC", // Light text
      textSecondary: "#cbd5e1", // Muted light text
      border: "rgba(139, 92, 246, 0.2)", // Purple border
      success: "#10b981", // Emerald
      warning: "#f59e0b", // Amber
      error: "#ef4444", // Red
    },
  },
  ocean: {
    name: "ocean",
    displayName: "Aerospace Ocean",
    colors: {
      primary: "#0c4a6e", // Deep ocean blue
      secondary: "#06b6d4", // Cyan waves
      accent: "#0891b2", // Ocean blue
      accent_amber: "#f59e0b", // Amber
      background: "#0c4a6e", // Deep ocean
      surface: "rgba(6, 182, 212, 0.1)", // Cyan glass
      text: "#F8FAFC", // Light text
      textSecondary: "#cbd5e1", // Muted light text
      border: "rgba(6, 182, 212, 0.2)", // Cyan border
      success: "#10b981", // Emerald
      warning: "#f59e0b", // Amber
      error: "#ef4444", // Red
    },
  },
  sunset: {
    name: "sunset",
    displayName: "Aerospace Sunset",
    colors: {
      primary: "#431407", // Warm sunset
      secondary: "#f97316", // Orange glow
      accent: "#fb923c", // Light orange
      accent_amber: "#fbbf24", // Yellow amber
      background: "#431407", // Warm sunset
      surface: "rgba(249, 115, 22, 0.1)", // Orange glass
      text: "#F8FAFC", // Light text
      textSecondary: "#cbd5e1", // Muted light text
      border: "rgba(249, 115, 22, 0.2)", // Orange border
      success: "#10b981", // Emerald
      warning: "#f59e0b", // Amber
      error: "#ef4444", // Red
    },
  },
};

// Smart theme management functions
export const getStoredTheme = (): Theme => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("ivf-theme") as Theme;
    return stored && themes[stored] ? stored : "standard";
  }
  return "standard";
};

export const setStoredTheme = (theme: Theme): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("ivf-theme", theme);
  }
};

// Smart theme detection based on system preferences and time
export const getSmartTheme = (): Theme => {
  if (typeof window === "undefined") {
    return "standard";
  }

  // Check for system dark/light mode preference
  const prefersDarkScheme = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;
  const prefersLightScheme = window.matchMedia(
    "(prefers-color-scheme: light)",
  ).matches;

  // Get current hour for time-based theming
  const currentHour = new Date().getHours();
  const isMorning = currentHour >= 6 && currentHour < 12;
  const isAfternoon = currentHour >= 12 && currentHour < 18;
  const isEvening = currentHour >= 18 && currentHour < 22;
  const isNight = currentHour >= 22 || currentHour < 6;

  // Smart theme logic
  if (prefersDarkScheme || isNight) {
    return "dark";
  } else if (prefersLightScheme || isMorning) {
    return "light";
  } else if (isAfternoon) {
    return "standard"; // Nature theme for afternoon
  } else {
    return "standard"; // Default to standard for evening
  }
};

// Enhanced theme application with smart features
export const applySmartTheme = (theme?: Theme): void => {
  let selectedTheme: Theme;

  if (theme) {
    // Use explicitly selected theme
    selectedTheme = theme;
  } else {
    // Use smart theme detection
    selectedTheme = getSmartTheme();
  }

  applyTheme(selectedTheme);
  setStoredTheme(selectedTheme);
};

// Listen for system preference changes
export const setupSystemPreferenceListener = (): void => {
  if (typeof window !== "undefined") {
    // Listen for system dark/light mode changes
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const lightModeQuery = window.matchMedia("(prefers-color-scheme: light)");

    darkModeQuery.addEventListener("change", (e) => {
      if (e.matches) {
        applySmartTheme("dark");
      }
    });

    lightModeQuery.addEventListener("change", (e) => {
      if (e.matches) {
        applySmartTheme("light");
      }
    });

    // Set up time-based theme updates (check every hour)
    setInterval(() => {
      const currentStoredTheme = getStoredTheme();
      const smartTheme = getSmartTheme();

      // Only auto-switch if user hasn't manually set a preference
      if (currentStoredTheme === smartTheme) {
        applySmartTheme();
      }
    }, 3600000); // Check every hour
  }
};

export const applyTheme = (
  theme: Theme,
  skipAnimations: boolean = true,
): void => {
  // Only run on client-side
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  const themeConfig = themes[theme];
  const root = document.documentElement;
  const body = document.body;

  // Apply CSS custom properties immediately
  root.style.setProperty("--color-primary", themeConfig.colors.primary);
  root.style.setProperty("--color-secondary", themeConfig.colors.secondary);
  root.style.setProperty("--color-accent", themeConfig.colors.accent);
  root.style.setProperty("--color-background", themeConfig.colors.background);
  root.style.setProperty("--color-surface", themeConfig.colors.surface);
  root.style.setProperty("--color-text", themeConfig.colors.text);
  root.style.setProperty(
    "--color-text-secondary",
    themeConfig.colors.textSecondary,
  );
  root.style.setProperty("--color-border", themeConfig.colors.border);
  root.style.setProperty("--color-success", themeConfig.colors.success);
  root.style.setProperty("--color-warning", themeConfig.colors.warning);
  root.style.setProperty("--color-error", themeConfig.colors.error);

  // Apply theme class to body
  body.className = `theme-${theme}`;

  // Store the theme
  setStoredTheme(theme);
};

// Initialize theme on app load with smart features
export const initializeTheme = (): Theme => {
  // Set up system preference listeners
  setupSystemPreferenceListener();

  // Apply smart theme on initialization
  const storedTheme = getStoredTheme();
  const smartTheme = getSmartTheme();

  // Use stored theme if user has manually set it, otherwise use smart detection
  const initialTheme = storedTheme !== smartTheme ? storedTheme : smartTheme;

  // Defer theme application to avoid blocking initial render
  if (typeof window !== "undefined") {
    // Apply theme after a short delay to allow page to render first
    setTimeout(() => {
      applyTheme(initialTheme, true); // Skip animations on initial load
    }, 100);
  }

  return initialTheme;
};
