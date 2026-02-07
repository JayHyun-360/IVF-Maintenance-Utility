export type Theme = "standard" | "light" | "dark";

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
    displayName: "Academic Minimalist",
    colors: {
      primary: "#0F766E", // Modern teal green
      secondary: "#FFFFFF", // Pure white
      accent: "#6366F1", // Professional indigo
      accent_amber: "#F59E0B", // Amber accent
      background: "#F8FAFC", // Soft light gray
      surface: "#FFFFFF", // Pure white
      text: "#1E293B", // Dark slate
      textSecondary: "#64748B", // Slate
      border: "#E2E8F0", // Light gray border
      success: "#10B981", // Emerald green
      warning: "#F59E0B", // Amber
      error: "#EF4444", // Red
    },
  },
  light: {
    name: "light",
    displayName: "Academic Light",
    colors: {
      primary: "#0891B2", // Cyan blue
      secondary: "#FFFFFF", // Pure white
      accent: "#0EA5E9", // Sky blue
      accent_amber: "#F59E0B", // Amber accent
      background: "#F0F9FF", // Very light blue tint
      surface: "#FFFFFF", // Pure white
      text: "#0C4A6E", // Deep blue
      textSecondary: "#64748B", // Slate
      border: "#BAE6FD", // Light blue border
      success: "#10B981", // Emerald green
      warning: "#F59E0B", // Amber
      error: "#EF4444", // Red
    },
  },
  dark: {
    name: "dark",
    displayName: "Academic Dark",
    colors: {
      primary: "#1B4332", // Deep forest green
      secondary: "#FFFFFF", // Pure white
      accent: "#64748B", // Slate
      accent_amber: "#F59E0B", // Amber accent
      background: "#0F172A", // Dark slate
      surface: "#1E293B", // Darker surface
      text: "#F8FAFC", // Light text
      textSecondary: "#CBD5E1", // Muted light text
      border: "#334155", // Dark border
      success: "#1B4332", // Primary green
      warning: "#F59E0B", // Amber
      error: "#EF4444", // Red
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
