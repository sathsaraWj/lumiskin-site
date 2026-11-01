/*
 * Lumiskin site configuration — the single source of truth for store links
 * and platform availability. Every element with [data-download] gets its
 * href from here (see site.js).
 */
window.LUMISKIN_CONFIG = {
  android: {
    available: true,
    url: 'https://play.google.com/store/apps/details?id=com.lumiskin.app'
  },
  ios: {
    // Not published. Keep url null until there is a live App Store listing.
    available: false,
    url: null,
    statusLabel: 'iOS coming soon'
  }
};
