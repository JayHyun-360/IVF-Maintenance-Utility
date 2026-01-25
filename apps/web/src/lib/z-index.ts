// Z-index management system to prevent overlaying issues
export const Z_INDEX = {
  // Base layers
  BASE: 0,
  DROPDOWN: 10,
  DROPDOWN_CONTENT: 11, // For dropdown content to appear above dropdown trigger
  STICKY: 20,

  // Overlay layers
  MODAL_BACKDROP: 1000,
  MODAL: 1001,
  TOOLTIP: 1002,
  NOTIFICATION: 1003,

  // Highest priority
  MAX: 9999,
} as const;

// CSS custom properties for consistent z-index usage
export const Z_INDEX_VARS = {
  "--z-base": Z_INDEX.BASE,
  "--z-dropdown": Z_INDEX.DROPDOWN,
  "--z-sticky": Z_INDEX.STICKY,
  "--z-modal-backdrop": Z_INDEX.MODAL_BACKDROP,
  "--z-modal": Z_INDEX.MODAL,
  "--z-tooltip": Z_INDEX.TOOLTIP,
  "--z-notification": Z_INDEX.NOTIFICATION,
  "--z-max": Z_INDEX.MAX,
} as const;
