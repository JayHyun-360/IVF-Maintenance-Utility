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
    displayName: "Nature",
    colors: {
      primary: "#10B981", // Emerald green
      secondary: "#059669", // Darker green
      accent: "#F3F4F6", // Light gray
      background: "#FFFFFF", // Pure white
      surface: "#F9FAFB", // Very light gray
      text: "#111827", // Dark gray
      textSecondary: "#6B7280", // Medium gray
      border: "#E5E7EB", // Light gray border
      success: "#10B981", // Emerald green
      warning: "#F59E0B", // Amber
      error: "#EF4444", // Red
    },
  },
  light: {
    name: "light",
    displayName: "Minimal",
    colors: {
      primary: "#000000", // Pure black
      secondary: "#374151", // Dark gray
      accent: "#9CA3AF", // Medium gray
      background: "#FFFFFF", // Pure white
      surface: "#FAFAFA", // Off-white
      text: "#000000", // Pure black
      textSecondary: "#6B7280", // Medium gray
      border: "#E5E7EB", // Light gray border
      success: "#10B981", // Emerald green
      warning: "#F59E0B", // Amber
      error: "#EF4444", // Red
    },
  },
  dark: {
    name: "dark",
    displayName: "Dark",
    colors: {
      primary: "#FFFFFF", // Pure white
      secondary: "#D1D5DB", // Light gray
      accent: "#374151", // Medium gray
      background: "#000000", // Pure black
      surface: "#111827", // Very dark gray
      text: "#FFFFFF", // Pure white
      textSecondary: "#9CA3AF", // Light gray
      border: "#374151", // Medium gray border
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
