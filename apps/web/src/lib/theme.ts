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

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  // Check for mobile device
  const isMobile = window.innerWidth <= 640;

  // Determine timing based on preferences and device
  const baseDuration = prefersReducedMotion ? 0.1 : isMobile ? 0.2 : 1.2;
  const imageDuration = prefersReducedMotion ? 0.1 : isMobile ? 0.2 : 1.5;
  const svgDuration = prefersReducedMotion ? 0.1 : isMobile ? 0.2 : 0.8;
  const interactiveDuration = prefersReducedMotion ? 0.1 : isMobile ? 0.2 : 1.0;
  const totalDuration = prefersReducedMotion ? 200 : isMobile ? 400 : 1600;

  const easing = prefersReducedMotion
    ? "linear"
    : "cubic-bezier(0.4, 0, 0.2, 1)";

  const themeConfig = themes[theme];
  const root = document.documentElement;
  const body = document.body;

  // Add transitioning class for beautiful animations
  body.classList.add("theme-transitioning");

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
  body.className = `theme-${theme} theme-transitioning`;

  // Apply theme to dashboard elements with optimized transitions
  const dashboardElements = document.querySelectorAll(".dashboard-theme");
  dashboardElements.forEach((element) => {
    const htmlElement = element as HTMLElement;
    htmlElement.style.transition = `background-color ${baseDuration}s ${easing}, color ${baseDuration}s ${easing}, border-color ${baseDuration}s ${easing}, box-shadow ${baseDuration}s ${easing}`;
    htmlElement.style.backgroundColor = themeConfig.colors.background;
    htmlElement.style.color = themeConfig.colors.text;
    htmlElement.style.borderColor = themeConfig.colors.border;
  });

  // Apply theme to cards with optimized transitions
  const cardElements = document.querySelectorAll(".theme-card");
  cardElements.forEach((element) => {
    const htmlElement = element as HTMLElement;
    htmlElement.style.transition = `background-color ${baseDuration}s ${easing}, color ${baseDuration}s ${easing}, border-color ${baseDuration}s ${easing}, box-shadow ${baseDuration}s ${easing}`;
    htmlElement.style.backgroundColor = themeConfig.colors.surface;
    htmlElement.style.color = themeConfig.colors.text;
    htmlElement.style.borderColor = themeConfig.colors.border;
  });

  // Optimized background image transitions with deduplication
  const headerElements = document.querySelectorAll("header");
  headerElements.forEach((header) => {
    const htmlHeader = header as HTMLElement;
    htmlHeader.style.transition = `background-image ${imageDuration}s ${easing}, filter ${imageDuration}s ${easing}`;

    if (!prefersReducedMotion) {
      setTimeout(() => {
        if (theme === "standard") {
          htmlHeader.style.filter = "brightness(1.02) saturate(1.05)";
        } else if (theme === "light") {
          htmlHeader.style.filter = "brightness(1.01) saturate(1.02)";
        } else if (theme === "dark") {
          htmlHeader.style.filter = "brightness(0.98) contrast(1.02)";
        }

        // Align filter reset with transition duration
        setTimeout(() => {
          htmlHeader.style.filter = "brightness(1) saturate(1) contrast(1)";
        }, imageDuration * 1000);
      }, 50);
    }
  });

  // Optimized image transitions with capped stagger
  const images = document.querySelectorAll("img");
  const maxImageDelay = 200; // Cap total delay to 200ms
  const imageDelay = Math.min(images.length * 20, maxImageDelay);

  images.forEach((img, index) => {
    const htmlImg = img as HTMLImageElement;
    htmlImg.style.transition = `transform ${baseDuration}s ${easing}, filter ${baseDuration}s ${easing}`;

    if (!prefersReducedMotion) {
      setTimeout(
        () => {
          htmlImg.style.transform = "scale(1.01)";
          htmlImg.style.filter = "brightness(1.02)";

          setTimeout(() => {
            htmlImg.style.transform = "scale(1)";
            htmlImg.style.filter = "brightness(1)";
          }, baseDuration * 500);
        },
        Math.min(index * 20, maxImageDelay),
      );
    }
  });

  // Optimized SVG transitions with capped stagger
  const svgs = document.querySelectorAll("svg");
  const maxSvgDelay = 150; // Cap total delay to 150ms
  const svgDelay = Math.min(svgs.length * 15, maxSvgDelay);

  svgs.forEach((svg, index) => {
    const htmlSvg = svg as SVGElement;
    htmlSvg.style.transition = `transform ${svgDuration}s ${easing}, color ${svgDuration}s ${easing}`;

    if (!prefersReducedMotion) {
      setTimeout(
        () => {
          htmlSvg.style.transform = "scale(1.05) rotate(2deg)";

          setTimeout(() => {
            htmlSvg.style.transform = "scale(1) rotate(0deg)";
          }, svgDuration * 500);
        },
        Math.min(index * 15, maxSvgDelay),
      );
    }
  });

  // Optimized interactive element transitions
  const interactiveElements = document.querySelectorAll(
    "button, input, select, textarea, a",
  );
  interactiveElements.forEach((element) => {
    const htmlElement = element as HTMLElement;
    htmlElement.style.transition = `background-color ${interactiveDuration}s ${easing}, color ${interactiveDuration}s ${easing}, border-color ${interactiveDuration}s ${easing}, transform 0.3s ${easing}`;

    if (!htmlElement.style.backgroundColor) {
      htmlElement.style.backgroundColor = "transparent";
    }
    if (!htmlElement.style.color) {
      htmlElement.style.color = "inherit";
    }
  });

  // Remove transitioning class after optimized animations complete
  setTimeout(() => {
    body.classList.remove("theme-transitioning");
  }, totalDuration);

  // Store the theme
  setStoredTheme(theme);
};

// Initialize theme on app load
export const initializeTheme = (): Theme => {
  const theme = getStoredTheme();
  applyTheme(theme);
  return theme;
};
