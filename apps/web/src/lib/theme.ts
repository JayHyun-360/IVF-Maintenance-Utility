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

  // Set background image as CSS custom property for smooth transitions
  if (themeConfig.backgroundImage) {
    root.style.setProperty(
      "--background-image",
      `url("${themeConfig.backgroundImage}")`,
    );
  } else {
    root.style.setProperty("--background-image", "none");
  }

  // Apply theme class to body
  body.className = `theme-${theme} theme-transitioning`;

  // Apply theme to dashboard elements with enhanced transitions
  const dashboardElements = document.querySelectorAll(".dashboard-theme");
  dashboardElements.forEach((element) => {
    const htmlElement = element as HTMLElement;
    htmlElement.style.transition = `background-color ${baseDuration}s ${easing}, color ${baseDuration}s ${easing}, border-color ${baseDuration}s ${easing}, box-shadow ${baseDuration}s ${easing}`;
    htmlElement.style.backgroundColor = themeConfig.colors.background;
    htmlElement.style.color = themeConfig.colors.text;
    htmlElement.style.borderColor = themeConfig.colors.border;
  });

  // Apply theme to cards with enhanced transitions
  const cardElements = document.querySelectorAll(".theme-card");
  cardElements.forEach((element) => {
    const htmlElement = element as HTMLElement;
    htmlElement.style.transition = `background-color ${baseDuration}s ${easing}, color ${baseDuration}s ${easing}, border-color ${baseDuration}s ${easing}, box-shadow ${baseDuration}s ${easing}, transform ${baseDuration * 0.8}s ${easing}`;
    htmlElement.style.backgroundColor = themeConfig.colors.surface;
    htmlElement.style.color = themeConfig.colors.text;
    htmlElement.style.borderColor = themeConfig.colors.border;
  });

  // Enhanced background image transitions with theme-specific effects
  const headerElements = document.querySelectorAll("header");
  headerElements.forEach((header) => {
    const htmlHeader = header as HTMLElement;
    htmlHeader.style.transition = `background-image ${imageDuration}s ${easing}, filter ${imageDuration}s ${easing}`;

    if (!prefersReducedMotion) {
      setTimeout(() => {
        // Theme-specific personality effects
        if (theme === "standard") {
          htmlHeader.style.filter =
            "brightness(1.02) saturate(1.05) contrast(1.02)";
          addNatureParticles(header);
        } else if (theme === "light") {
          htmlHeader.style.filter =
            "brightness(1.01) saturate(1.02) contrast(1.01)";
          addOceanShimmer(header);
        } else if (theme === "dark") {
          htmlHeader.style.filter =
            "brightness(0.98) contrast(1.02) saturate(1.1)";
          addStarfieldSparkle(header);
        }

        // Align filter reset with transition duration
        setTimeout(() => {
          htmlHeader.style.filter = "brightness(1) saturate(1) contrast(1)";
          removeThemeEffects(header);
        }, imageDuration * 1000);
      }, 50);
    }
  });

  // Enhanced image transitions with theme-specific effects
  const images = document.querySelectorAll("img");
  const maxImageDelay = 200;

  images.forEach((img, index) => {
    const htmlImg = img as HTMLImageElement;
    htmlImg.style.transition = `transform ${baseDuration}s ${easing}, filter ${baseDuration}s ${easing}`;

    if (!prefersReducedMotion) {
      setTimeout(
        () => {
          // Theme-specific image effects
          if (theme === "standard") {
            htmlImg.style.transform = "scale(1.01)";
            htmlImg.style.filter = "brightness(1.02) saturate(1.05)";
          } else if (theme === "light") {
            htmlImg.style.transform = "scale(1.005)";
            htmlImg.style.filter = "brightness(1.01) hue-rotate(5deg)";
          } else if (theme === "dark") {
            htmlImg.style.transform = "scale(1.015)";
            htmlImg.style.filter = "brightness(0.98) contrast(1.05)";
          }

          setTimeout(() => {
            htmlImg.style.transform = "scale(1)";
            htmlImg.style.filter =
              "brightness(1) saturate(1) contrast(1) hue-rotate(0deg)";
          }, baseDuration * 500);
        },
        Math.min(index * 20, maxImageDelay),
      );
    }
  });

  // Enhanced SVG transitions with theme-specific rotation
  const svgs = document.querySelectorAll("svg");
  const maxSvgDelay = 150;

  svgs.forEach((svg, index) => {
    const htmlSvg = svg as SVGElement;
    htmlSvg.style.transition = `transform ${svgDuration}s ${easing}, color ${svgDuration}s ${easing}, filter ${svgDuration}s ${easing}`;

    if (!prefersReducedMotion) {
      setTimeout(
        () => {
          // Theme-specific SVG effects
          if (theme === "standard") {
            htmlSvg.style.transform = "scale(1.05) rotate(2deg)";
            htmlSvg.style.filter = "hue-rotate(10deg) saturate(1.1)";
          } else if (theme === "light") {
            htmlSvg.style.transform = "scale(1.03) rotate(1deg)";
            htmlSvg.style.filter = "brightness(1.05) saturate(1.05)";
          } else if (theme === "dark") {
            htmlSvg.style.transform = "scale(1.07) rotate(3deg)";
            htmlSvg.style.filter = "brightness(1.1) saturate(1.2)";
          }

          setTimeout(() => {
            htmlSvg.style.transform = "scale(1) rotate(0deg)";
            htmlSvg.style.filter = "brightness(1) saturate(1) hue-rotate(0deg)";
          }, svgDuration * 500);
        },
        Math.min(index * 15, maxSvgDelay),
      );
    }
  });

  // Enhanced interactive element transitions with hover effects
  const interactiveElements = document.querySelectorAll(
    "button, input, select, textarea, a",
  );
  interactiveElements.forEach((element) => {
    const htmlElement = element as HTMLElement;
    htmlElement.style.transition = `background-color ${interactiveDuration}s ${easing}, color ${interactiveDuration}s ${easing}, border-color ${interactiveDuration}s ${easing}, transform 0.3s ${easing}, box-shadow 0.3s ${easing}`;

    if (!htmlElement.style.backgroundColor) {
      htmlElement.style.backgroundColor = "transparent";
    }
    if (!htmlElement.style.color) {
      htmlElement.style.color = "inherit";
    }

    // Add theme-specific hover effects
    addEnhancedHoverEffects(htmlElement, theme);
  });

  // Remove transitioning class after enhanced animations complete
  setTimeout(() => {
    body.classList.remove("theme-transitioning");
  }, totalDuration);

  // Store the theme
  setStoredTheme(theme);
};

// Enhanced theme personality effects
const addNatureParticles = (header: Element): void => {
  // Add subtle leaf particle effect for Nature theme
  const particles = document.createElement("div");
  particles.className = "nature-particles";
  particles.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    overflow: hidden;
    z-index: 2;
  `;

  for (let i = 0; i < 5; i++) {
    const particle = document.createElement("div");
    particle.style.cssText = `
      position: absolute;
      width: 4px;
      height: 4px;
      background: rgba(16, 185, 129, 0.3);
      border-radius: 50%;
      animation: floatLeaf 3s ease-in-out infinite;
      left: ${Math.random() * 100}%;
      animation-delay: ${Math.random() * 2}s;
    `;
    particles.appendChild(particle);
  }

  header.appendChild(particles);
};

const addOceanShimmer = (header: Element): void => {
  // Add gentle wave shimmer for Ocean theme
  const shimmer = document.createElement("div");
  shimmer.className = "ocean-shimmer";
  shimmer.style.cssText = `
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.2), transparent);
    pointer-events: none;
    z-index: 2;
    animation: shimmerWave 4s ease-in-out infinite;
  `;

  header.appendChild(shimmer);
};

const addStarfieldSparkle = (header: Element): void => {
  // Add subtle starfield sparkle for Dark theme
  const starfield = document.createElement("div");
  starfield.className = "starfield-sparkle";
  starfield.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    overflow: hidden;
    z-index: 2;
  `;

  for (let i = 0; i < 8; i++) {
    const star = document.createElement("div");
    star.style.cssText = `
      position: absolute;
      width: 2px;
      height: 2px;
      background: rgba(255, 255, 255, 0.6);
      border-radius: 50%;
      animation: twinkle 2s ease-in-out infinite;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation-delay: ${Math.random() * 2}s;
    `;
    starfield.appendChild(star);
  }

  header.appendChild(starfield);
};

const removeThemeEffects = (header: Element): void => {
  // Remove all theme-specific effects
  const particles = header.querySelector(".nature-particles");
  const shimmer = header.querySelector(".ocean-shimmer");
  const starfield = header.querySelector(".starfield-sparkle");

  if (particles) particles.remove();
  if (shimmer) shimmer.remove();
  if (starfield) starfield.remove();
};

const addEnhancedHoverEffects = (element: HTMLElement, theme: Theme): void => {
  // Add theme-specific hover effects
  const addHoverListener = () => {
    element.addEventListener("mouseenter", () => {
      if (theme === "standard") {
        element.style.transform = "translateY(-2px)";
        element.style.boxShadow = `0 8px 25px ${themes[theme].colors.primary}30`;
      } else if (theme === "light") {
        element.style.transform = "translateY(-1px)";
        element.style.boxShadow = `0 6px 20px ${themes[theme].colors.primary}25`;
      } else if (theme === "dark") {
        element.style.transform = "translateY(-3px)";
        element.style.boxShadow = `0 10px 30px ${themes[theme].colors.primary}40`;
      }
    });

    element.addEventListener("mouseleave", () => {
      element.style.transform = "translateY(0)";
      element.style.boxShadow = "";
    });
  };

  addHoverListener();
};

// Preload background images for smoother transitions
const preloadBackgroundImages = (): void => {
  // Only run on client-side
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  Object.values(themes).forEach((theme) => {
    if (theme.backgroundImage) {
      const img = new Image();
      img.src = theme.backgroundImage;
    }
  });
};

// Initialize theme on app load with smart features
export const initializeTheme = (): Theme => {
  // Preload background images for smoother transitions
  preloadBackgroundImages();

  // Set up system preference listeners
  setupSystemPreferenceListener();

  // Apply smart theme on initialization
  const storedTheme = getStoredTheme();
  const smartTheme = getSmartTheme();

  // Use stored theme if user has manually set it, otherwise use smart detection
  const initialTheme = storedTheme !== smartTheme ? storedTheme : smartTheme;

  applyTheme(initialTheme);
  return initialTheme;
};
