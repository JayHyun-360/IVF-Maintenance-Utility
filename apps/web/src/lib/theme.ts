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
      textSecondary: "#6B7280", // Medium gray
      border: "#E5E7EB", // Light gray border
      success: "#10B981", // Emerald green
      warning: "#F59E0B", // Amber
      error: "#EF4444", // Red
    },
    backgroundImage:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=400&fit=crop", // Temporary test image
  },
  light: {
    name: "light",
    displayName: "Ocean Light",
    colors: {
      primary: "#0EA5E9", // Sky blue
      secondary: "#06B6D4", // Cyan
      accent: "#0891B2", // Darker cyan
      background: "#F0F9FF", // Very light blue background
      surface: "#FFFFFF", // Pure white surface
      text: "#0C4A6E", // Deep blue text
      textSecondary: "#64748B", // Muted text
      border: "#E0F2FE", // Light blue border
      success: "#059669", // Emerald green
      warning: "#D97706", // Orange
      error: "#DC2626", // Red
    },
    backgroundImage:
      "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920&h=400&fit=crop", // Temporary test image
  },
  dark: {
    name: "dark",
    displayName: "Midnight Dark",
    colors: {
      primary: "#3B82F6", // Blue
      secondary: "#1D4ED8", // Darker blue
      accent: "#60A5FA", // Light blue
      background: "#0F172A", // Slate background
      surface: "#1E293B", // Dark slate surface
      text: "#F1F5F9", // Light slate text
      textSecondary: "#94A3B8", // Muted slate text
      border: "#334155", // Slate border
      success: "#10B981", // Emerald green
      warning: "#F59E0B", // Amber
      error: "#EF4444", // Red
    },
    backgroundImage:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&h=400&fit=crop", // Temporary test image
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

  // Apply CSS custom properties with smooth transitions
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

  // Apply theme to dashboard elements by updating their styles
  const dashboardElements = document.querySelectorAll(".dashboard-theme");
  dashboardElements.forEach((element) => {
    const htmlElement = element as HTMLElement;
    htmlElement.style.backgroundColor = themeConfig.colors.background;
    htmlElement.style.color = themeConfig.colors.text;
    htmlElement.style.borderColor = themeConfig.colors.border;
  });

  // Apply theme to cards
  const cardElements = document.querySelectorAll(".theme-card");
  cardElements.forEach((element) => {
    const htmlElement = element as HTMLElement;
    htmlElement.style.backgroundColor = themeConfig.colors.surface;
    htmlElement.style.color = themeConfig.colors.text;
    htmlElement.style.borderColor = themeConfig.colors.border;
  });

  // Apply dynamic effects to images during theme transition
  const images = document.querySelectorAll("img");
  images.forEach((img, index) => {
    const htmlImg = img as HTMLImageElement;
    // Stagger the animation for each image
    setTimeout(() => {
      // Fade out first
      htmlImg.style.transition =
        "opacity 0.75s ease-in-out, transform 0.75s ease-in-out";
      htmlImg.style.opacity = "0";
      htmlImg.style.transform = "scale(0.95)";

      setTimeout(() => {
        // Fade back in with scale
        htmlImg.style.opacity = "1";
        htmlImg.style.transform = "scale(1)";
      }, 750);

      // Clean up transitions after animation
      setTimeout(() => {
        htmlImg.style.transition = "";
      }, 1500);
    }, index * 150);
  });

  // Apply dynamic effects to background images
  const elementsWithBackgroundImages = document.querySelectorAll(
    '[style*="background-image"]',
  );
  elementsWithBackgroundImages.forEach((element, index) => {
    const htmlElement = element as HTMLElement;
    if (
      htmlElement.style.backgroundImage &&
      htmlElement.style.backgroundImage !== "none"
    ) {
      // Don't manipulate opacity of background images directly
      // Let CSS transitions handle the smooth changes
      setTimeout(() => {
        // Apply subtle filter effects instead of opacity changes
        if (theme === "standard") {
          htmlElement.style.filter = "brightness(0.9) saturate(0.9)";
        } else if (theme === "light") {
          htmlElement.style.filter = "brightness(0.9) hue-rotate(-5deg)";
        } else if (theme === "dark") {
          htmlElement.style.filter = "brightness(0.85) contrast(0.9)";
        }

        setTimeout(() => {
          htmlElement.style.filter = "";
        }, 750);
      }, index * 75);
    }
  });

  // Apply fading effect to background image layers
  const backgroundLayers = document.querySelectorAll(
    '.absolute.inset-0[style*="backgroundImage"]',
  );
  backgroundLayers.forEach((layer, index) => {
    const htmlLayer = layer as HTMLElement;

    // Don't manipulate opacity of background layers directly
    // Let CSS transitions handle the smooth changes
    setTimeout(() => {
      // Apply subtle filter effects instead of opacity changes
      if (theme === "standard") {
        htmlLayer.style.filter = "brightness(0.8) saturate(0.8)";
      } else if (theme === "light") {
        htmlLayer.style.filter = "brightness(0.8) hue-rotate(-5deg)";
      } else if (theme === "dark") {
        htmlLayer.style.filter = "brightness(0.7) contrast(0.8)";
      }

      setTimeout(() => {
        htmlLayer.style.filter = "";
      }, 750);
    }, index * 150);
  });

  // Apply theme-specific background image effects
  const headerElements = document.querySelectorAll("header");
  headerElements.forEach((header) => {
    const htmlHeader = header as HTMLElement;

    // Don't manipulate header opacity directly, let CSS handle the transitions
    // Only apply theme-specific filter effects
    setTimeout(() => {
      if (theme === "standard") {
        htmlHeader.style.filter = "brightness(0.8) saturate(0.8)";
      } else if (theme === "light") {
        htmlHeader.style.filter = "brightness(0.8) hue-rotate(-10deg)";
      } else if (theme === "dark") {
        htmlHeader.style.filter = "brightness(0.7) contrast(0.8)";
      }

      setTimeout(() => {
        htmlHeader.style.filter = "";
      }, 750);
    }, 200);
  });

  // Apply dynamic effects to SVG icons
  const svgs = document.querySelectorAll("svg");
  svgs.forEach((svg, index) => {
    const htmlSvg = svg as SVGElement;
    // Stagger the animation for each SVG
    setTimeout(() => {
      // Fade out first
      htmlSvg.style.transition =
        "opacity 0.75s ease-in-out, transform 0.75s ease-in-out";
      htmlSvg.style.opacity = "0";
      htmlSvg.style.transform = "scale(0.9)";

      setTimeout(() => {
        // Fade back in with scale
        htmlSvg.style.opacity = "1";
        htmlSvg.style.transform = "scale(1)";
      }, 750);

      // Clean up transitions after animation
      setTimeout(() => {
        htmlSvg.style.transition = "";
      }, 1500);
    }, index * 75);
  });

  // Apply theme to all interactive elements
  const interactiveElements = document.querySelectorAll(
    "button, input, select, textarea, a",
  );
  interactiveElements.forEach((element) => {
    const htmlElement = element as HTMLElement;
    if (!htmlElement.style.backgroundColor) {
      htmlElement.style.backgroundColor = "transparent";
    }
    if (!htmlElement.style.color) {
      htmlElement.style.color = "inherit";
    }
  });

  // Remove transitioning class after animation completes
  setTimeout(() => {
    body.classList.remove("theme-transitioning");
  }, 1500);

  // Store the theme
  setStoredTheme(theme);
};

// Initialize theme on app load
export const initializeTheme = (): Theme => {
  const theme = getStoredTheme();
  applyTheme(theme);
  return theme;
};
