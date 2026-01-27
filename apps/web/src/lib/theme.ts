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

  // Add transitioning class for smooth animations
  body.classList.add("theme-transitioning");

  // Apply CSS custom properties immediately with smooth transitions
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

  // Apply theme to dashboard elements with smooth transitions
  const dashboardElements = document.querySelectorAll(".dashboard-theme");
  dashboardElements.forEach((element) => {
    const htmlElement = element as HTMLElement;
    htmlElement.style.transition =
      "background-color 1.2s cubic-bezier(0.4, 0, 0.2, 1), color 1.2s cubic-bezier(0.4, 0, 0.2, 1), border-color 1.2s cubic-bezier(0.4, 0, 0.2, 1)";
    htmlElement.style.backgroundColor = themeConfig.colors.background;
    htmlElement.style.color = themeConfig.colors.text;
    htmlElement.style.borderColor = themeConfig.colors.border;
  });

  // Apply theme to cards with smooth transitions
  const cardElements = document.querySelectorAll(".theme-card");
  cardElements.forEach((element) => {
    const htmlElement = element as HTMLElement;
    htmlElement.style.transition =
      "background-color 1.2s cubic-bezier(0.4, 0, 0.2, 1), color 1.2s cubic-bezier(0.4, 0, 0.2, 1), border-color 1.2s cubic-bezier(0.4, 0, 0.2, 1)";
    htmlElement.style.backgroundColor = themeConfig.colors.surface;
    htmlElement.style.color = themeConfig.colors.text;
    htmlElement.style.borderColor = themeConfig.colors.border;
  });

  // Apply subtle smooth effects to background images
  const elementsWithBackgroundImages = document.querySelectorAll(
    '[style*="background-image"]',
  );
  elementsWithBackgroundImages.forEach((element, index) => {
    const htmlElement = element as HTMLElement;
    if (
      htmlElement.style.backgroundImage &&
      htmlElement.style.backgroundImage !== "none"
    ) {
      htmlElement.style.transition = "filter 1.5s cubic-bezier(0.4, 0, 0.2, 1)";

      setTimeout(() => {
        if (theme === "standard") {
          htmlElement.style.filter = "brightness(0.98)";
        } else if (theme === "light") {
          htmlElement.style.filter = "brightness(0.98) saturate(1.02)";
        } else if (theme === "dark") {
          htmlElement.style.filter = "brightness(0.96)";
        }

        setTimeout(() => {
          htmlElement.style.filter = "";
        }, 1500);
      }, index * 100);
    }
  });

  // Apply smooth header transitions
  const headerElements = document.querySelectorAll("header");
  headerElements.forEach((header) => {
    const htmlHeader = header as HTMLElement;
    htmlHeader.style.transition = "filter 1.2s cubic-bezier(0.4, 0, 0.2, 1)";

    setTimeout(() => {
      if (theme === "standard") {
        htmlHeader.style.filter = "brightness(0.99)";
      } else if (theme === "light") {
        htmlHeader.style.filter = "brightness(0.99) saturate(1.01)";
      } else if (theme === "dark") {
        htmlHeader.style.filter = "brightness(0.97)";
      }

      setTimeout(() => {
        htmlHeader.style.filter = "";
      }, 1200);
    }, 200);
  });

  // Apply smooth transitions to images
  const images = document.querySelectorAll("img");
  images.forEach((img, index) => {
    const htmlImg = img as HTMLImageElement;
    htmlImg.style.transition =
      "transform 1.2s cubic-bezier(0.4, 0, 0.2, 1), filter 1.2s cubic-bezier(0.4, 0, 0.2, 1)";

    setTimeout(() => {
      htmlImg.style.transform = "scale(1.02)";
      htmlImg.style.filter = "brightness(1.05)";

      setTimeout(() => {
        htmlImg.style.transform = "scale(1)";
        htmlImg.style.filter = "brightness(1)";
      }, 600);
    }, index * 80);
  });

  // Apply smooth transitions to SVG icons
  const svgs = document.querySelectorAll("svg");
  svgs.forEach((svg, index) => {
    const htmlSvg = svg as SVGElement;
    htmlSvg.style.transition =
      "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), color 0.8s cubic-bezier(0.4, 0, 0.2, 1)";

    setTimeout(() => {
      htmlSvg.style.transform = "scale(1.1)";

      setTimeout(() => {
        htmlSvg.style.transform = "scale(1)";
      }, 400);
    }, index * 50);
  });

  // Apply theme to all interactive elements
  const interactiveElements = document.querySelectorAll(
    "button, input, select, textarea, a",
  );
  interactiveElements.forEach((element) => {
    const htmlElement = element as HTMLElement;
    htmlElement.style.transition =
      "background-color 1s cubic-bezier(0.4, 0, 0.2, 1), color 1s cubic-bezier(0.4, 0, 0.2, 1), border-color 1s cubic-bezier(0.4, 0, 0.2, 1)";

    if (!htmlElement.style.backgroundColor) {
      htmlElement.style.backgroundColor = "transparent";
    }
    if (!htmlElement.style.color) {
      htmlElement.style.color = "inherit";
    }
  });

  // Remove transitioning class after smooth animations complete
  setTimeout(() => {
    body.classList.remove("theme-transitioning");
  }, 2000);

  // Store the theme
  setStoredTheme(theme);
};

// Initialize theme on app load
export const initializeTheme = (): Theme => {
  const theme = getStoredTheme();
  applyTheme(theme);
  return theme;
};
