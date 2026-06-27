# MWW Alert Banner — Design Spec

**Date:** 2026-06-27  
**Status:** Approved

## Goal

Add a visually immediate, comedically potent alert banner to each post page that delivers the WatchScore recommendation as a verdict the reader sees before anything else — no new data entry required.

## Placement

In `PostLayout.astro`, between the post header and the existing `<WatchScore />` component. The reader flow becomes:

> Header (title, byline, description) → **Alert Banner** → WatchScore detail box → Post body

This mirrors how real alarmist organizations communicate: verdict first, supporting evidence second.

## Component

**New file:** `src/components/AlertBanner.astro`

Accepts the same `watchScore` props already passed to `PostLayout`. No new frontmatter fields needed.

**Props used:**
- `recommendation` (hero — large stamped text)
- `urgencyIndex` (secondary metric)
- `watchfulnessQuotient` (secondary metric)

## Visual Design

Pure SVG rendered at build time. No runtime JS, no external dependencies, no API calls.

**Chrome:** Navy (`#1a2744`) border and header bar with gold (`#c9a84c`) accents. "MINISTRYWATCHWATCH OFFICIAL ALERT" label in the header bar.

**Hero zone:** Center panel with color-coded background. Recommendation text rendered in large, uppercase, bold type as the visual focal point.

**Secondary zone:** Urgency Index and Watchfulness Quotient displayed as labeled numeric readouts below the hero text.

## Color Coding by Recommendation

| Recommendation | Background | Text |
|---|---|---|
| PANIC IMMEDIATELY | `#c0392b` (red) | white |
| CONCERNED BUT FUNCTIONAL | `#e67e22` (orange) | white |
| CONCERNED AND TAKING IT PERSONALLY | `#d35400` (amber) | white |
| CAUTIOUSLY OPTIMISTIC | `#f39c12` (yellow) | navy |
| ALLEGEDLY FINE | `#7daa6f` (sage green) | white |
| UNPRECEDENTED BREAKTHROUGH | `#27ae60` (bright green) | white |

## Integration

`PostLayout.astro` imports `AlertBanner.astro` and renders it between `<header>` and `<WatchScore />`, passing the existing `watchScore` prop object.

## Out of Scope

- PostCard changes (homepage listing stays as-is)
- New frontmatter fields
- Client-side interactivity
- External image generation or APIs
