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
  backgroundImage?: string;
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
      textSecondary: "#4B5563", // Darker medium gray - improved contrast
      border: "#E5E7EB", // Light gray border
      success: "#10B981", // Emerald green
      warning: "#F59E0B", // Amber
      error: "#EF4444", // Red
    },
    backgroundImage:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop", // Mountain landscape with better aspect ratio
  },
  light: {
    name: "light",
    displayName: "Ocean Light",
    colors: {
      primary: "#0891B2", // Deep ocean cyan - more distinct from green
      secondary: "#0E7490", // Darker ocean blue
      accent: "#06B6D4", // Bright cyan accent
      background: "#F0FDF4", // Very light aqua background - distinct from pure white
      surface: "#ECFEFF", // Light cyan surface - noticeable ocean tint
      text: "#134E4A", // Deep teal text - very distinct from green
      textSecondary: "#0F766E", // Darker teal secondary text
      border: "#5EEAD4", // Mint cyan border - distinctive ocean feel
      success: "#059669", // Emerald green
      warning: "#EA580C", // Dark orange - better contrast
      error: "#DC2626", // Red
    },
    backgroundImage:
      "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920&h=1080&fit=crop", // Ocean scene with better aspect ratio
  },
  dark: {
    name: "dark",
    displayName: "Midnight Dark",
    colors: {
      primary: "#6366F1", // Indigo - more vibrant than blue
      secondary: "#4F46E5", // Darker indigo
      accent: "#818CF8", // Light indigo accent
      background: "#0F172A", // Slate background - kept for depth
      surface: "#1E293B", // Dark slate surface - kept
      text: "#F1F5F9", // Light slate text - kept
      textSecondary: "#CBD5E1", // Much lighter muted text for better contrast
      border: "#334155", // Lighter border for better visibility on dark backgrounds
      success: "#10B981", // Emerald green
      warning: "#F59E0B", // Amber
      error: "#EF4444", // Red
    },
    backgroundImage:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&h=1080&fit=crop&crop=bottom", // Original midnight image cropped to show mountain half
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
  // Only run on client-side
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  const themeConfig = themes[theme];
  const root = document.documentElement;
  const body = document.body;

  // Add transitioning class for consistent animations
  body.classList.add("theme-transitioning");

  // Apply CSS custom properties immediately - consistent color morphing
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
  body.className = `theme-${theme} theme-transitioning`;

  // Apply theme to dashboard elements with consistent transitions
  const dashboardElements = document.querySelectorAll(".dashboard-theme");
  dashboardElements.forEach((element) => {
    const htmlElement = element as HTMLElement;
    htmlElement.style.transition =
      "background-color 0.8s ease-in-out, color 0.8s ease-in-out, border-color 0.8s ease-in-out";
    htmlElement.style.backgroundColor = themeConfig.colors.background;
    htmlElement.style.color = themeConfig.colors.text;
    htmlElement.style.borderColor = themeConfig.colors.border;
  });

  // Apply theme to cards with consistent transitions
  const cardElements = document.querySelectorAll(".theme-card");
  cardElements.forEach((element) => {
    const htmlElement = element as HTMLElement;
    htmlElement.style.transition =
      "background-color 0.8s ease-in-out, color 0.8s ease-in-out, border-color 0.8s ease-in-out";
    htmlElement.style.backgroundColor = themeConfig.colors.surface;
    htmlElement.style.color = themeConfig.colors.text;
    htmlElement.style.borderColor = themeConfig.colors.border;
  });

  // NO filter effects on background images - consistent color morphing only
  const elementsWithBackgroundImages = document.querySelectorAll(
    '[style*="background-image"]',
  );
  elementsWithBackgroundImages.forEach((element) => {
    const htmlElement = element as HTMLElement;
    if (
      htmlElement.style.backgroundImage &&
      htmlElement.style.backgroundImage !== "none"
    ) {
      // Consistent transition timing - let CSS handle the color morphing naturally
      htmlElement.style.transition = "background-color 0.8s ease-in-out";
    }
  });

  // NO filter effects on headers - consistent color morphing only
  const headerElements = document.querySelectorAll("header");
  headerElements.forEach((header) => {
    const htmlHeader = header as HTMLElement;
    // Consistent transition timing - let CSS handle the color morphing naturally
    htmlHeader.style.transition = "background-color 0.8s ease-in-out";
  });

  // NO effects on images - consistent static behavior
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    const htmlImg = img as HTMLImageElement;
    // Consistent - NO transitions on images to prevent any visual changes
    htmlImg.style.transition = "none";
  });

  // NO effects on SVGs - consistent color changes through CSS
  const svgs = document.querySelectorAll("svg");
  svgs.forEach((svg) => {
    const htmlSvg = svg as SVGElement;
    // Consistent timing - NO scale or filter transitions
    htmlSvg.style.transition = "color 0.8s ease-in-out";
  });

  // Apply theme to all interactive elements with consistent transitions
  const interactiveElements = document.querySelectorAll(
    "button, input, select, textarea, a",
  );
  interactiveElements.forEach((element) => {
    const htmlElement = element as HTMLElement;
    htmlElement.style.transition =
      "background-color 0.8s ease-in-out, color 0.8s ease-in-out, border-color 0.8s ease-in-out";

    if (!htmlElement.style.backgroundColor) {
      htmlElement.style.backgroundColor = "transparent";
    }
    if (!htmlElement.style.color) {
      htmlElement.style.color = "inherit";
    }
  });

  // Remove transitioning class after consistent animations complete
  setTimeout(() => {
    body.classList.remove("theme-transitioning");
  }, 900); // Consistent timing - slightly longer than 0.8s for smooth completion

  // Store the theme
  setStoredTheme(theme);
};

// Initialize theme on app load
export const initializeTheme = (): Theme => {
  const theme = getStoredTheme();
  applyTheme(theme);
  return theme;
};
