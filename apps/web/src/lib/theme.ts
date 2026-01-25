export type Theme = "standard" | "light" | "dark";

export interface ThemeConfig {
  name: string;
  displayName: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
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
    displayName: "Warm Harmony",
    colors: {
      primary: "#3B82F6", // Modern blue
      secondary: "#10B981", // Emerald green
      accent: "#F59E0B", // Amber
      background: "#F8FAFC", // Light slate background
      surface: "#FFFFFF", // Pure white
      text: "#1E293B", // Dark slate text
      textSecondary: "#64748B", // Muted slate text
      border: "#E2E8F0", // Light border
      success: "#10B981", // Emerald green
      warning: "#F59E0B", // Amber
      error: "#EF4444", // Red
    },
  },
  light: {
    name: "light",
    displayName: "Light Professional",
    colors: {
      primary: "#0EA5E9", // Sky blue
      secondary: "#06B6D4", // Cyan
      accent: "#F97316", // Orange
      background: "#FFFFFF", // Pure white
      surface: "#F8FAFC", // Very light slate
      text: "#0F172A", // Dark slate text
      textSecondary: "#475569", // Muted slate text
      border: "#CBD5E1", // Light border
      success: "#10B981", // Emerald green
      warning: "#F59E0B", // Amber
      error: "#EF4444", // Red
    },
  },
  dark: {
    name: "dark",
    displayName: "Dark Professional",
    colors: {
      primary: "#6366F1", // Modern indigo
      secondary: "#8B5CF6", // Purple accent
      accent: "#EC4899", // Pink accent
      background: "#0F172A", // Deep slate
      surface: "#1E293B", // Dark slate surface
      text: "#F1F5F9", // Light slate text
      textSecondary: "#94A3B8", // Muted slate text
      border: "#334155", // Border slate
      success: "#10B981", // Emerald green
      warning: "#F59E0B", // Amber
      error: "#EF4444", // Red
    },
  },
};

// Theme management functions
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

export const applyTheme = (theme: Theme): void => {
  const themeConfig = themes[theme];
  const root = document.documentElement;

  // Apply CSS custom properties
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
  document.body.className = `theme-${theme}`;

  // Apply theme to dashboard elements by updating their styles
  const dashboardElements = document.querySelectorAll(".dashboard-theme");
  dashboardElements.forEach((element) => {
    (element as HTMLElement).style.backgroundColor =
      themeConfig.colors.background;
    (element as HTMLElement).style.color = themeConfig.colors.text;
  });

  // Apply theme to cards
  const cardElements = document.querySelectorAll(".theme-card");
  cardElements.forEach((element) => {
    (element as HTMLElement).style.backgroundColor = themeConfig.colors.surface;
    (element as HTMLElement).style.color = themeConfig.colors.text;
    (element as HTMLElement).style.borderColor = themeConfig.colors.border;
  });

  // Store the theme
  setStoredTheme(theme);
};

// Initialize theme on app load
export const initializeTheme = (): Theme => {
  const theme = getStoredTheme();
  applyTheme(theme);
  return theme;
};
