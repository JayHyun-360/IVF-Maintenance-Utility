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
    displayName: "Standard Theme",
    colors: {
      primary: "#1B4332",
      secondary: "#FFFFFF",
      accent: "#F59E0B",
      background: "#F9FAFB",
      surface: "#FFFFFF",
      text: "#111827",
      textSecondary: "#6B7280",
      border: "#E5E7EB",
      success: "#10B981",
      warning: "#F59E0B",
      error: "#EF4444",
    },
  },
  light: {
    name: "light",
    displayName: "Light Theme",
    colors: {
      primary: "#3B82F6",
      secondary: "#FFFFFF",
      accent: "#60A5FA",
      background: "#FFFFFF",
      surface: "#F3F4F6",
      text: "#1F2937",
      textSecondary: "#6B7280",
      border: "#D1D5DB",
      success: "#10B981",
      warning: "#F59E0B",
      error: "#EF4444",
    },
  },
  dark: {
    name: "dark",
    displayName: "Dark Theme",
    colors: {
      primary: "#60A5FA",
      secondary: "#1F2937",
      accent: "#818CF8",
      background: "#111827",
      surface: "#1F2937",
      text: "#F9FAFB",
      textSecondary: "#9CA3AF",
      border: "#374151",
      success: "#34D399",
      warning: "#FBBF24",
      error: "#F87171",
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
