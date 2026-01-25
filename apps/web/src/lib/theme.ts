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
      primary: "#FF6B6B",
      secondary: "#4ECDC4",
      accent: "#FFE66D",
      background: "#FFF8F3",
      surface: "#FFFFFF",
      text: "#2D3436",
      textSecondary: "#636E72",
      border: "#E8F4F8",
      success: "#00B894",
      warning: "#FDCB6E",
      error: "#FF7675",
    },
  },
  light: {
    name: "light",
    displayName: "Cool Breeze",
    colors: {
      primary: "#74B9FF",
      secondary: "#A29BFE",
      accent: "#FD79A8",
      background: "#F8F9FA",
      surface: "#FFFFFF",
      text: "#2D3436",
      textSecondary: "#636E72",
      border: "#E8F4FD",
      success: "#00CEC9",
      warning: "#FDCB6E",
      error: "#FF7675",
    },
  },
  dark: {
    name: "dark",
    displayName: "Midnight Velvet",
    colors: {
      primary: "#E17055",
      secondary: "#74B9FF",
      accent: "#A29BFE",
      background: "#2D3436",
      surface: "#34495E",
      text: "#F8F9FA",
      textSecondary: "#B2BEC3",
      border: "#4A5568",
      success: "#00CEC9",
      warning: "#FDCB6E",
      error: "#FF7675",
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
