# Site images

All app imagery comes from the Lumiskin Google Play listing (com.lumiskin.app), captured Nov 2026.
The screens use sample data and model photos; the page labels them "shown with sample data".

| File(s)                         | Source                                         | Used in                       |
| ------------------------------- | ---------------------------------------------- | ----------------------------- |
| `scan-*.webp`                   | Play screenshot: guided camera                 | Hero, step 1                  |
| `dashboard-*.webp`              | Play screenshot: home / today's skin status    | Hero, "Understand your skin"  |
| `today-status-*.webp`           | Crop of the dashboard's status panel           | Step 2                        |
| `skin-status-*.webp`            | Crop of routine screen "Skin status: First Scan" | Hero                        |
| `routine-*.webp`                | Play screenshot: morning routine               | Step 3, "Build a routine"     |
| `progress-*.webp`               | Top crop of progress screen (before/after photos intentionally cropped out) | "See changes over time" |
| `since-last-*.webp`             | Crop of routine screen "Since last scan"       | "See changes over time"       |
| `ingredients-*.webp`            | Play screenshot: ingredient scanner            | "Also in Lumiskin"            |
| `icon-*.png/webp`, `apple-touch-icon.png` | Play listing app icon                | Logo, favicons                |
| `google-play-badge.png`         | Official Google Play badge (en_US), transparent margin trimmed | All Android CTAs |
| `qr-google-play.svg`            | Generated; encodes the Play URL in `assets/js/config.js` | Final CTA (desktop)  |
| `og-image.png`                  | Rendered from the hero assets, 1200×630        | Social sharing                |

## Replacing a screenshot

Export at least 960px wide, convert to WebP at 480px and 960px widths, keep the same file names,
and update the `width`/`height` attributes in `index.html` if the aspect ratio changes.
If the Play URL ever changes, regenerate `qr-google-play.svg` from the new URL.
