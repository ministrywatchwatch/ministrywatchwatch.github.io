# Alert Banner Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a color-coded SVG alert banner to each post page that stamps the WatchScore recommendation as a bold verdict above the existing WatchScore detail box.

**Architecture:** A new `AlertBanner.astro` component renders a pure SVG banner using existing WatchScore props. A new `recommendationToAlertStyle` utility function (tested in vitest) maps each recommendation enum value to its alert colors. `PostLayout.astro` is updated to import and render the banner between the post header and the `<WatchScore />` component.

**Tech Stack:** Astro 7, TypeScript, vitest (existing), pure SVG (no new dependencies)

## Global Constraints

- No new npm dependencies
- No new frontmatter fields — use only existing `watchScore` props
- Follow existing file naming conventions (`camelCase` utils, `PascalCase` components)
- All six `WatchRecommendation` enum values must be handled explicitly — no fallthrough defaults
- Colors: navy `#1a2744`, gold `#c9a84c` per existing brand

---

### Task 1: Add `recommendationToAlertStyle` utility and tests

**Files:**
- Modify: `src/utils/watchScore.ts`
- Modify: `src/utils/watchScore.test.ts`

**Interfaces:**
- Produces: `recommendationToAlertStyle(rec: WatchRecommendation): { bg: string; text: string }`

- [ ] **Step 1: Write the failing tests**

Add to `src/utils/watchScore.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { scoreToColor, recommendationToSentence, recommendationToAlertStyle } from './watchScore';

// ... existing tests unchanged above ...

describe('recommendationToAlertStyle', () => {
  it('returns red scheme for PANIC IMMEDIATELY', () => {
    const style = recommendationToAlertStyle('PANIC IMMEDIATELY');
    expect(style.bg).toBe('#c0392b');
    expect(style.text).toBe('#ffffff');
  });

  it('returns orange scheme for CONCERNED BUT FUNCTIONAL', () => {
    const style = recommendationToAlertStyle('CONCERNED BUT FUNCTIONAL');
    expect(style.bg).toBe('#e67e22');
    expect(style.text).toBe('#ffffff');
  });

  it('returns amber scheme for CONCERNED AND TAKING IT PERSONALLY', () => {
    const style = recommendationToAlertStyle('CONCERNED AND TAKING IT PERSONALLY');
    expect(style.bg).toBe('#d35400');
    expect(style.text).toBe('#ffffff');
  });

  it('returns yellow scheme for CAUTIOUSLY OPTIMISTIC', () => {
    const style = recommendationToAlertStyle('CAUTIOUSLY OPTIMISTIC');
    expect(style.bg).toBe('#f39c12');
    expect(style.text).toBe('#1a2744');
  });

  it('returns sage green scheme for ALLEGEDLY FINE', () => {
    const style = recommendationToAlertStyle('ALLEGEDLY FINE');
    expect(style.bg).toBe('#7daa6f');
    expect(style.text).toBe('#ffffff');
  });

  it('returns bright green scheme for UNPRECEDENTED BREAKTHROUGH', () => {
    const style = recommendationToAlertStyle('UNPRECEDENTED BREAKTHROUGH');
    expect(style.bg).toBe('#27ae60');
    expect(style.text).toBe('#ffffff');
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx vitest run src/utils/watchScore.test.ts
```

Expected: FAIL — `recommendationToAlertStyle is not a function` (or similar import error)

- [ ] **Step 3: Implement the utility**

Add to the bottom of `src/utils/watchScore.ts`:

```typescript
export function recommendationToAlertStyle(rec: WatchScore['recommendation']): { bg: string; text: string } {
  const styles: Record<WatchScore['recommendation'], { bg: string; text: string }> = {
    'PANIC IMMEDIATELY':                  { bg: '#c0392b', text: '#ffffff' },
    'CONCERNED BUT FUNCTIONAL':           { bg: '#e67e22', text: '#ffffff' },
    'CONCERNED AND TAKING IT PERSONALLY': { bg: '#d35400', text: '#ffffff' },
    'CAUTIOUSLY OPTIMISTIC':              { bg: '#f39c12', text: '#1a2744' },
    'ALLEGEDLY FINE':                     { bg: '#7daa6f', text: '#ffffff' },
    'UNPRECEDENTED BREAKTHROUGH':         { bg: '#27ae60', text: '#ffffff' },
  };
  return styles[rec];
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run src/utils/watchScore.test.ts
```

Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/utils/watchScore.ts src/utils/watchScore.test.ts
git commit -m "feat: add recommendationToAlertStyle utility"
```

---

### Task 2: Create AlertBanner.astro component

**Files:**
- Create: `src/components/AlertBanner.astro`

**Interfaces:**
- Consumes: `recommendationToAlertStyle(rec)` from `../utils/watchScore` — returns `{ bg: string; text: string }`
- Consumes: `WatchScore` type from `../lib/types` — fields `recommendation`, `urgencyIndex`, `watchfulnessQuotient`
- Produces: Astro component accepting props `{ recommendation, urgencyIndex, watchfulnessQuotient }`

- [ ] **Step 1: Create the component**

Create `src/components/AlertBanner.astro` with this exact content:

```astro
---
import { recommendationToAlertStyle } from '../utils/watchScore';
import type { WatchScore } from '../lib/types';

type Props = Pick<WatchScore, 'recommendation' | 'urgencyIndex' | 'watchfulnessQuotient'>;

const { recommendation, urgencyIndex, watchfulnessQuotient } = Astro.props;
const { bg, text } = recommendationToAlertStyle(recommendation);
---

<div class="alert-banner" role="img" aria-label={`MWW Alert: ${recommendation}`}>
  <svg viewBox="0 0 720 148" xmlns="http://www.w3.org/2000/svg" width="100%" style="display:block">
    <!-- Outer border -->
    <rect x="1" y="1" width="718" height="146" fill="none" stroke="#1a2744" stroke-width="2"/>

    <!-- Header bar -->
    <rect x="0" y="0" width="720" height="30" fill="#1a2744"/>

    <!-- Header: label left -->
    <text
      x="14" y="20"
      fill="#c9a84c"
      font-family="'Courier New', Courier, monospace"
      font-size="10"
      font-weight="700"
      letter-spacing="1.8"
    >&#9670; MINISTRYWATCHWATCH OFFICIAL ALERT</text>

    <!-- Header: badge right -->
    <text
      x="706" y="20"
      fill="white"
      font-family="'Courier New', Courier, monospace"
      font-size="9"
      letter-spacing="1"
      text-anchor="end"
      opacity="0.45"
    >MWW</text>

    <!-- Colored content area -->
    <rect x="2" y="30" width="716" height="116" fill={bg}/>

    <!-- Recommendation hero text — textLength forces fit for all enum values -->
    <text
      x="360" y="88"
      fill={text}
      font-family="Georgia, 'Times New Roman', serif"
      font-size="30"
      font-weight="700"
      text-anchor="middle"
      letter-spacing="3"
      textLength="640"
      lengthAdjust="spacingAndGlyphs"
    >{recommendation}</text>

    <!-- Divider -->
    <line x1="24" y1="102" x2="696" y2="102" stroke={text} stroke-opacity="0.25" stroke-width="1"/>

    <!-- Urgency Index label -->
    <text
      x="180" y="120"
      fill={text}
      font-family="'Courier New', Courier, monospace"
      font-size="8"
      letter-spacing="1.5"
      text-anchor="middle"
      opacity="0.75"
    >URGENCY INDEX</text>

    <!-- Urgency Index value -->
    <text
      x="180" y="136"
      fill={text}
      font-family="'Courier New', Courier, monospace"
      font-size="15"
      font-weight="700"
      text-anchor="middle"
    >{urgencyIndex}/10</text>

    <!-- Watchfulness Quotient label -->
    <text
      x="540" y="120"
      fill={text}
      font-family="'Courier New', Courier, monospace"
      font-size="8"
      letter-spacing="1.5"
      text-anchor="middle"
      opacity="0.75"
    >WATCHFULNESS QUOTIENT</text>

    <!-- Watchfulness Quotient value -->
    <text
      x="540" y="136"
      fill={text}
      font-family="'Courier New', Courier, monospace"
      font-size="15"
      font-weight="700"
      text-anchor="middle"
    >{watchfulnessQuotient}/10</text>
  </svg>
</div>

<style>
  .alert-banner {
    margin: 1.5rem 0;
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/AlertBanner.astro
git commit -m "feat: add AlertBanner SVG component"
```

---

### Task 3: Wire AlertBanner into PostLayout

**Files:**
- Modify: `src/layouts/PostLayout.astro`

**Interfaces:**
- Consumes: `AlertBanner` component from `../components/AlertBanner.astro`
- Consumes: existing `watchScore` prop already destructured in PostLayout

- [ ] **Step 1: Add the import**

In `src/layouts/PostLayout.astro`, add the import after the existing imports (line 3):

```astro
import AlertBanner from '../components/AlertBanner.astro';
```

So the import block reads:

```astro
import BaseLayout from './BaseLayout.astro';
import WatchScore from '../components/WatchScore.astro';
import SeriesNav from '../components/SeriesNav.astro';
import AlertBanner from '../components/AlertBanner.astro';
import type { WatchScore as WatchScoreType } from '../lib/types';
```

- [ ] **Step 2: Render AlertBanner between header and WatchScore**

In the template section, add `<AlertBanner />` after the closing `</header>` tag and before `<WatchScore />`. The relevant block (currently lines 32–49) should become:

```astro
<BaseLayout title={title} description={description}>
  <article class="post">
    <header class="post-header">
      <div class="post-tags">
        <span class="mode-tag">{modeLabel[mode] ?? mode.toUpperCase()}</span>
        {series && (
          <span class="series-tag">{series.name.toUpperCase()} · PART {series.episode}</span>
        )}
      </div>
      <h1>{title}</h1>
      <div class="post-byline">
        <span>By {author}</span>
        <time datetime={pubDate.toISOString()}>{formattedDate}</time>
      </div>
      <p class="post-description">{description}</p>
    </header>

    <AlertBanner
      recommendation={watchScore.recommendation}
      urgencyIndex={watchScore.urgencyIndex}
      watchfulnessQuotient={watchScore.watchfulnessQuotient}
    />

    <WatchScore {...watchScore} />

    <div class="post-body">
      <slot />
    </div>

    {series && (
      <SeriesNav
        seriesName={series.name}
        prev={seriesPrev}
        next={seriesNext}
      />
    )}
  </article>
</BaseLayout>
```

- [ ] **Step 3: Build and verify**

```bash
npx astro build
```

Expected: Build completes with no errors. Check `dist/` contains post HTML files.

- [ ] **Step 4: Run dev server and inspect visually**

```bash
npx astro dev
```

Open any post URL (e.g. `http://localhost:4321/posts/[any-slug]`). Verify:
- Alert banner appears between post header and WatchScore box
- Background color matches the post's recommendation (red for PANIC IMMEDIATELY, etc.)
- Recommendation text renders large and legible
- Urgency Index and Watchfulness Quotient show correct values
- Banner does not overflow the 720px post width

- [ ] **Step 5: Commit**

```bash
git add src/layouts/PostLayout.astro
git commit -m "feat: wire AlertBanner into PostLayout above WatchScore"
```
