# WatchMinistryWatch Phase 1: Fake Institution Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete, deployable Astro 5 static site for WatchMinistryWatch.com with full fake institutional identity — fake staff bios, fake rating methodology, fake certification badges — ready to publish to GitHub Pages on a custom domain, with 5 seed satirical posts demonstrating all three comedic modes.

**Architecture:** Static Astro site using typed content collections for posts. All institutional identity is baked into static pages and reusable layout components. Deployment is automated via GitHub Actions to GitHub Pages with Cloudflare managing the custom domain. No server-side code; no database; no CMS.

**Tech Stack:** Astro 5.x, TypeScript, Vitest (utility tests), GitHub Actions (CI/deploy), Cloudflare DNS

---

## File Map

```
.github/workflows/deploy.yml           # GitHub Pages deployment
astro.config.mjs                       # Site config, custom domain
package.json                           # Dependencies
tsconfig.json                          # TypeScript config
public/
  CNAME                                # Custom domain for GitHub Pages
  favicon.svg                          # Eye-with-shofar mark (see brand assets)
  logo.svg                             # Full horizontal logo
src/
  lib/
    types.ts                           # Shared constants (modes, recommendations)
    types.test.ts                      # Tests for shared constants
  styles/
    global.css                         # CSS variables, typography, resets
    global.css.test.ts                 # Tests for CSS variable existence
  content/
    config.ts                          # Content collection schema
    posts/
      001-inaugural-launch.md
      002-cornerstone-overreaction.md
      003-blessed-harvest-panic.md
      004-pinnacle-extrapolation.md
      005-summit-allegedly.md
  components/
    Header.astro                       # Site header with certification badge
    Footer.astro                       # Footer with fake legal boilerplate
    PostCard.astro                     # Post preview card for index
    WatchScore.astro                   # Fake rating display component
  layouts/
    BaseLayout.astro                   # HTML shell, fonts, global CSS
    PostLayout.astro                   # Post layout with WatchScore sidebar
  pages/
    index.astro                        # Home: latest posts + mission statement
    about.astro                        # Fake org history, mission, awards
    methodology.astro                  # Fake rating methodology explanation
    staff.astro                        # Fake staff bios
    posts/
      [...slug].astro                  # Dynamic post routing
  utils/
    watchScore.ts                      # Score display utility functions
    watchScore.test.ts                 # Tests for score utilities
```

---

### Task 1: Project Initialization and Deployment Pipeline

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `public/CNAME`
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Initialize Astro project**

```bash
npm create astro@latest . -- --template minimal --typescript strict --no-install --no-git
```

When prompted: accept TypeScript strict, minimal template.

- [ ] **Step 2: Install dependencies and Vitest**

```bash
npm install && npm install -D vitest
```

- [ ] **Step 3: Replace `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://watchministrywatch.com',
  output: 'static',
});
```

- [ ] **Step 4: Add test script to `package.json`**

In `package.json`, add to `"scripts"`:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 5: Create `public/CNAME`**

```
watchministrywatch.com
```

- [ ] **Step 6: Create `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

- [ ] **Step 7: Verify build passes**

```bash
npm run build
```

Expected: `dist/` created, no errors.

- [ ] **Step 8: Commit**

```bash
git init && git add . && git commit -m "feat: initialize Astro project with GitHub Pages deployment"
```

---

### Task 2: Shared Types and Design System

**Files:**
- Create: `src/lib/types.ts`
- Create: `src/lib/types.test.ts`
- Create: `src/styles/global.css`
- Create: `src/styles/global.css.test.ts`

- [ ] **Step 1: Write failing types test**

Create `src/lib/types.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { COMEDIC_MODES, WATCH_RECOMMENDATIONS } from './types';

describe('COMEDIC_MODES', () => {
  it('contains the three satirical modes', () => {
    expect(COMEDIC_MODES).toContain('overreaction');
    expect(COMEDIC_MODES).toContain('extrapolation');
    expect(COMEDIC_MODES).toContain('hallucinatory');
    expect(COMEDIC_MODES).toHaveLength(3);
  });
});

describe('WATCH_RECOMMENDATIONS', () => {
  it('contains all five official recommendations', () => {
    expect(WATCH_RECOMMENDATIONS).toContain('PANIC IMMEDIATELY');
    expect(WATCH_RECOMMENDATIONS).toContain('ALLEGEDLY FINE');
    expect(WATCH_RECOMMENDATIONS).toHaveLength(5);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test
```

Expected: FAIL — `types.ts` not found.

- [ ] **Step 3: Create `src/lib/types.ts`**

```ts
export const COMEDIC_MODES = [
  'overreaction',
  'extrapolation',
  'hallucinatory',
] as const;

export const WATCH_RECOMMENDATIONS = [
  'PANIC IMMEDIATELY',
  'CONCERNED BUT FUNCTIONAL',
  'CAUTIOUSLY OPTIMISTIC',
  'UNPRECEDENTED BREAKTHROUGH',
  'ALLEGEDLY FINE',
] as const;

export type ComedicMode = typeof COMEDIC_MODES[number];
export type WatchRecommendation = typeof WATCH_RECOMMENDATIONS[number];

export type WatchScore = {
  urgencyIndex: number;
  watchfulnessQuotient: number;
  overallScore: 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D' | 'F';
  recommendation: WatchRecommendation;
};
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test
```

Expected: PASS.

- [ ] **Step 5: Write failing CSS test**

Create `src/styles/global.css.test.ts`:

```ts
import { readFileSync } from 'fs';
import { describe, it, expect } from 'vitest';

describe('global.css', () => {
  const css = readFileSync('src/styles/global.css', 'utf-8');

  it('defines color variables', () => {
    expect(css).toContain('--color-navy');
    expect(css).toContain('--color-gold');
    expect(css).toContain('--color-bg');
  });

  it('defines typography variables', () => {
    expect(css).toContain('--font-serif');
    expect(css).toContain('--font-sans');
  });
});
```

- [ ] **Step 6: Run test to verify it fails**

```bash
npm test
```

Expected: FAIL — `global.css` not found.

- [ ] **Step 7: Create `src/styles/global.css`**

```css
:root {
  --color-navy: #1a2744;
  --color-navy-light: #243460;
  --color-gold: #c9a227;
  --color-gold-light: #e8c84a;
  --color-red: #8b1a1a;
  --color-bg: #f8f7f4;
  --color-bg-alt: #eeece8;
  --color-text: #2d2d2d;
  --color-text-muted: #6b6b6b;
  --color-border: #d4d0c8;

  --font-serif: 'Playfair Display', Georgia, serif;
  --font-sans: 'Inter', system-ui, sans-serif;

  --max-width: 860px;
  --spacing-page: 1.5rem;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  color: var(--color-text);
  background: var(--color-bg);
  font-family: var(--font-sans);
  line-height: 1.6;
}

body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 2rem var(--spacing-page);
  width: 100%;
}

h1, h2, h3, h4 {
  font-family: var(--font-serif);
  line-height: 1.2;
}

a {
  color: var(--color-navy);
}

a:hover {
  color: var(--color-gold);
}

p {
  margin-bottom: 1rem;
}
```

- [ ] **Step 8: Run all tests to verify pass**

```bash
npm test
```

Expected: All tests PASS.

- [ ] **Step 9: Commit**

```bash
git add src/ && git commit -m "feat: add shared types, design system CSS"
```

---

### Task 3: Content Collection Schema

**Files:**
- Create: `src/content/config.ts`

- [ ] **Step 1: Create `src/content/config.ts`**

This imports constants from `src/lib/types.ts` to avoid `astro:content` import issues in tests.

```ts
import { defineCollection, z } from 'astro:content';
import { COMEDIC_MODES, WATCH_RECOMMENDATIONS } from '../lib/types';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    mode: z.enum(COMEDIC_MODES),
    sourceUrl: z.string().url().optional(),
    watchScore: z.object({
      urgencyIndex: z.number().min(1).max(10),
      watchfulnessQuotient: z.number().min(1).max(10),
      overallScore: z.enum(['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F']),
      recommendation: z.enum(WATCH_RECOMMENDATIONS),
    }),
    author: z.string().default('Dr. Cornelius T. Watchwright III, CWO'),
  }),
});

export const collections = { posts };
```

- [ ] **Step 2: Verify TypeScript passes**

```bash
npx astro check
```

Expected: No type errors.

- [ ] **Step 3: Commit**

```bash
git add src/content/config.ts && git commit -m "feat: add content collection schema with WatchScore and comedic modes"
```

---

### Task 4: WatchScore Utility and Component

**Files:**
- Create: `src/utils/watchScore.ts`
- Create: `src/utils/watchScore.test.ts`
- Create: `src/components/WatchScore.astro`

- [ ] **Step 1: Write failing test**

Create `src/utils/watchScore.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { scoreToColor, recommendationToSentence } from './watchScore';

describe('scoreToColor', () => {
  it('returns gold for A grades', () => {
    expect(scoreToColor('A+')).toBe('var(--color-gold)');
    expect(scoreToColor('A')).toBe('var(--color-gold)');
    expect(scoreToColor('A-')).toBe('var(--color-gold)');
  });
  it('returns navy for B grades', () => {
    expect(scoreToColor('B+')).toBe('var(--color-navy)');
    expect(scoreToColor('B')).toBe('var(--color-navy)');
  });
  it('returns red for F', () => {
    expect(scoreToColor('F')).toBe('var(--color-red)');
  });
});

describe('recommendationToSentence', () => {
  it('returns urgent language for PANIC IMMEDIATELY', () => {
    const result = recommendationToSentence('PANIC IMMEDIATELY');
    expect(result.toLowerCase()).toContain('immediately');
  });
  it('returns hedged language for ALLEGEDLY FINE', () => {
    const result = recommendationToSentence('ALLEGEDLY FINE');
    expect(result.toLowerCase()).toContain('allegedly');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test
```

Expected: FAIL — `watchScore.ts` not found.

- [ ] **Step 3: Create `src/utils/watchScore.ts`**

```ts
import type { WatchScore } from '../lib/types';

export function scoreToColor(score: WatchScore['overallScore']): string {
  if (score.startsWith('A')) return 'var(--color-gold)';
  if (score.startsWith('B')) return 'var(--color-navy)';
  if (score.startsWith('C')) return '#6b7280';
  return 'var(--color-red)';
}

export function recommendationToSentence(rec: WatchScore['recommendation']): string {
  const sentences: Record<WatchScore['recommendation'], string> = {
    'PANIC IMMEDIATELY': 'Act immediately. The situation demands it.',
    'CONCERNED BUT FUNCTIONAL': 'Proceed with concern. Most organ systems should continue to operate.',
    'CAUTIOUSLY OPTIMISTIC': 'Things appear to be going well. Do not relax.',
    'UNPRECEDENTED BREAKTHROUGH': 'Something unprecedented has occurred. History is being made, allegedly.',
    'ALLEGEDLY FINE': 'Everything is allegedly fine. We cannot fully endorse this.',
  };
  return sentences[rec];
}

export function renderBar(value: number): string {
  return '█'.repeat(value) + '░'.repeat(10 - value);
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test
```

Expected: All tests PASS.

- [ ] **Step 5: Create `src/components/WatchScore.astro`**

```astro
---
import { scoreToColor, recommendationToSentence, renderBar } from '../utils/watchScore';
import type { WatchScore } from '../lib/types';

type Props = WatchScore;
const { urgencyIndex, watchfulnessQuotient, overallScore, recommendation } = Astro.props;
const scoreColor = scoreToColor(overallScore);
const sentence = recommendationToSentence(recommendation);
---

<aside class="watch-score">
  <div class="score-header">
    <span class="score-label">WMW OFFICIAL ASSESSMENT</span>
    <span class="overall-score" style={`color: ${scoreColor}`}>{overallScore}</span>
  </div>
  <div class="score-rows">
    <div class="score-row">
      <span class="metric-name">Urgency Index</span>
      <span class="bar">{renderBar(urgencyIndex)}</span>
      <span class="value">{urgencyIndex}/10</span>
    </div>
    <div class="score-row">
      <span class="metric-name">Watchfulness Quotient</span>
      <span class="bar">{renderBar(watchfulnessQuotient)}</span>
      <span class="value">{watchfulnessQuotient}/10</span>
    </div>
  </div>
  <div class="recommendation">
    <span class="rec-label">Official Recommendation</span>
    <strong class="rec-value">{recommendation}</strong>
    <p class="rec-sentence">{sentence}</p>
  </div>
</aside>

<style>
  .watch-score {
    border: 2px solid var(--color-navy);
    padding: 1.25rem;
    margin: 2rem 0;
    background: var(--color-bg-alt);
  }

  .score-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 0.75rem;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid var(--color-border);
  }

  .score-label {
    font-size: 0.6rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-weight: 700;
    color: var(--color-text-muted);
  }

  .overall-score {
    font-family: var(--font-serif);
    font-size: 2.2rem;
    font-weight: 700;
    line-height: 1;
  }

  .score-rows {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    margin-bottom: 0.75rem;
  }

  .score-row {
    display: grid;
    grid-template-columns: 11rem 1fr 3rem;
    gap: 0.5rem;
    align-items: center;
    font-size: 0.8rem;
  }

  .metric-name {
    color: var(--color-text-muted);
  }

  .bar {
    font-family: monospace;
    color: var(--color-navy);
    letter-spacing: -0.05em;
    font-size: 0.75rem;
  }

  .value {
    text-align: right;
    font-weight: 600;
    font-size: 0.75rem;
  }

  .recommendation {
    padding-top: 0.75rem;
    border-top: 1px solid var(--color-border);
  }

  .rec-label {
    display: block;
    font-size: 0.6rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-text-muted);
    margin-bottom: 0.2rem;
  }

  .rec-value {
    display: block;
    font-size: 0.85rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--color-navy);
    font-weight: 700;
  }

  .rec-sentence {
    font-size: 0.8rem;
    font-style: italic;
    color: var(--color-text-muted);
    margin: 0.25rem 0 0;
  }
</style>
```

- [ ] **Step 6: Commit**

```bash
git add src/utils/ src/components/WatchScore.astro && git commit -m "feat: add WatchScore utility and component"
```

---

### Task 5: Layout Components

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/Header.astro`
- Create: `src/components/Footer.astro`

- [ ] **Step 1: Create `src/layouts/BaseLayout.astro`**

```astro
---
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import '../styles/global.css';

interface Props {
  title: string;
  description?: string;
}

const { title, description = 'Independent accountability for those who hold ministries accountable.' } = Astro.props;
---
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <title>{title} | WatchMinistryWatch</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
  </head>
  <body>
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

- [ ] **Step 2: Create `src/components/Header.astro`**

```astro
---
const nav = [
  { label: 'Home', href: '/' },
  { label: 'Methodology', href: '/methodology' },
  { label: 'Our Staff', href: '/staff' },
  { label: 'About', href: '/about' },
];
---
<header>
  <div class="header-inner">
    <div class="brand">
      <a href="/" class="logo-link">
        <img src="/logo.svg" alt="WatchMinistryWatch" height="70" />
      </a>
      <span class="cert-badge">Certified Watcher of Watchers™ · Est. 2026</span>
    </div>
    <nav>
      {nav.map(({ label, href }) => (
        <a href={href}>{label}</a>
      ))}
    </nav>
  </div>
</header>

<style>
  header {
    background: var(--color-navy);
    border-bottom: 4px solid var(--color-gold);
  }

  .header-inner {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0.75rem var(--spacing-page);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .brand {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .logo-link img {
    display: block;
  }

  .cert-badge {
    font-size: 0.6rem;
    background: var(--color-gold);
    color: var(--color-navy);
    padding: 0.15rem 0.5rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    align-self: flex-start;
  }

  nav {
    display: flex;
    gap: 1.5rem;
    align-items: center;
  }

  nav a {
    color: rgba(255, 255, 255, 0.85);
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    letter-spacing: 0.03em;
    transition: color 0.15s;
  }

  nav a:hover {
    color: var(--color-gold-light);
  }
</style>
```

- [ ] **Step 3: Create `src/components/Footer.astro`**

```astro
---
const year = new Date().getFullYear();
---
<footer>
  <div class="footer-inner">
    <div class="footer-main">
      <p class="org-name">The Institute for Ministry Watch Accountability</p>
      <p class="footer-desc">An independent, nonpartisan, self-appointed oversight body. Not affiliated with MinistryWatch. Not affiliated with any ministry. Not affiliated with any oversight body other than itself.</p>
    </div>
    <div class="footer-legal">
      <p>© {year} WatchMinistryWatch. All watching rights reserved.</p>
      <p>WatchMinistryWatch™ and the WatchScore™ are trademarks of the Institute for Ministry Watch Accountability, a Fictional Entity.</p>
      <p>All content is satirical. The Certified Watcher of Watchers (CWW) designation is entirely made up.</p>
    </div>
  </div>
</footer>

<style>
  footer {
    background: var(--color-navy);
    color: rgba(255, 255, 255, 0.7);
    margin-top: 4rem;
    border-top: 4px solid var(--color-gold);
  }

  .footer-inner {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 2rem var(--spacing-page);
    display: grid;
    gap: 1.5rem;
  }

  .org-name {
    font-family: var(--font-serif);
    font-size: 1rem;
    color: white;
    font-weight: 700;
    margin-bottom: 0.4rem;
  }

  .footer-desc {
    font-size: 0.8rem;
    line-height: 1.5;
  }

  .footer-legal {
    font-size: 0.7rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.4);
  }

  .footer-legal p {
    margin-bottom: 0.25rem;
  }
</style>
```

- [ ] **Step 4: Verify header and footer render**

```bash
npm run dev
```

Visit `http://localhost:4321`. Confirm navy header with gold border, logo area, nav, and footer with legal boilerplate all render. (Logo image will be missing until Task 6.)

- [ ] **Step 5: Commit**

```bash
git add src/layouts/ src/components/Header.astro src/components/Footer.astro && git commit -m "feat: add BaseLayout, Header, Footer with fake institutional branding"
```

---

### Task 6: Brand Assets (Logo and Favicon)

**Files:**
- Create: `public/logo.svg`
- Create: `public/favicon.svg`

The brand concept: MinistryWatch's shofar is a warning instrument (blowing the alarm). WatchMinistryWatch's shofar is a surveillance instrument — turned around and used as a spyglass to watch the watchers.

- [ ] **Step 1: Create `public/favicon.svg`**

A circular seal: navy background, gold eye with a shofar silhouette in the pupil.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <!-- Navy circle seal -->
  <circle cx="50" cy="50" r="48" fill="#1a2744" stroke="#c9a227" stroke-width="3"/>
  <!-- Eye shape (white sclera) -->
  <path d="M10,50 C22,28 78,28 90,50 C78,72 22,72 10,50 Z" fill="#f8f7f4"/>
  <!-- Iris -->
  <circle cx="50" cy="50" r="16" fill="#1a2744"/>
  <!-- Gold iris ring -->
  <circle cx="50" cy="50" r="12" fill="#c9a227"/>
  <!-- Pupil -->
  <circle cx="50" cy="50" r="7" fill="#1a2744"/>
  <!-- Tiny shofar in pupil (gold, suggesting surveillance through the horn) -->
  <path d="M43,48 Q46,43 52,44 Q56,46 57,50 Q56,54 52,55 Q46,56 43,52 Z" fill="#c9a227" opacity="0.85"/>
  <!-- Mouthpiece end dot -->
  <circle cx="43" cy="50" r="2" fill="#1a2744"/>
  <!-- Eye highlight -->
  <ellipse cx="58" cy="43" rx="4" ry="3" fill="white" opacity="0.35"/>
</svg>
```

- [ ] **Step 2: Create `public/logo.svg`**

Full horizontal logo. Left: the eye-shofar mark. Divider. Right: three-line text. Tagline bottom-right.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 100" width="400" height="100">

  <!-- === EYE-SHOFAR MARK (left, 95px wide) === -->
  <!-- Eye outer shape -->
  <path d="M4,50 C16,18 84,18 96,50 C84,82 16,82 4,50 Z"
        fill="#f8f7f4" stroke="#1a2744" stroke-width="2.5"/>
  <!-- Iris navy background -->
  <circle cx="50" cy="50" r="22" fill="#1a2744"/>
  <!-- Gold iris ring -->
  <circle cx="50" cy="50" r="17" fill="#c9a227"/>
  <!-- Pupil -->
  <circle cx="50" cy="50" r="10" fill="#1a2744"/>
  <!-- Shofar silhouette inside pupil — used here as a telescope, wide end forward -->
  <!-- The shofar points right (direction of watching) -->
  <path d="M42,47 Q46,40 54,41 Q60,43 62,49 Q60,55 54,57 Q46,58 42,53 Z"
        fill="#c9a227" opacity="0.9"/>
  <!-- Mouthpiece (narrow/eye end) -->
  <circle cx="42" cy="50" r="2.5" fill="#1a2744"/>
  <!-- Bell opening (wide/forward end) hint -->
  <path d="M61,44 Q65,50 61,56" stroke="#1a2744" stroke-width="1.2" fill="none" stroke-linecap="round"/>
  <!-- Eye highlight -->
  <ellipse cx="62" cy="41" rx="4" ry="3" fill="white" opacity="0.3"/>

  <!-- === VERTICAL DIVIDER === -->
  <line x1="110" y1="10" x2="110" y2="90" stroke="#c9a227" stroke-width="1.5"/>

  <!-- === TYPOGRAPHY === -->
  <!-- "Watch" prefix — gold, smaller — the meta-watching layer -->
  <text x="122" y="35"
        font-family="Georgia, 'Playfair Display', serif"
        font-size="17"
        font-weight="400"
        fill="#c9a227"
        letter-spacing="3">Watch</text>

  <!-- "Ministry" — navy, medium weight -->
  <text x="122" y="63"
        font-family="Georgia, 'Playfair Display', serif"
        font-size="26"
        font-weight="400"
        fill="#1a2744"
        letter-spacing="0.5">Ministry</text>

  <!-- "Watch" — navy, bold, dominant — the original watcher being watched -->
  <text x="122" y="90"
        font-family="Georgia, 'Playfair Display', serif"
        font-size="32"
        font-weight="700"
        fill="#1a2744"
        letter-spacing="1">Watch</text>

  <!-- === TAGLINE (bottom right) === -->
  <text x="398" y="90"
        font-family="Georgia, serif"
        font-size="10"
        font-style="italic"
        fill="#6b6b6b"
        text-anchor="end"
        letter-spacing="0.3">Who watches the watchers?</text>

</svg>
```

- [ ] **Step 3: Verify logo renders in browser**

```bash
npm run dev
```

Open `http://localhost:4321/logo.svg` directly. Confirm eye-with-shofar mark visible, text legible, tagline present.

- [ ] **Step 4: Commit**

```bash
git add public/ && git commit -m "feat: add eye-shofar logo and favicon brand assets"
```

---

### Task 7: Post Routing Components

**Files:**
- Create: `src/components/PostCard.astro`
- Create: `src/layouts/PostLayout.astro`
- Create: `src/pages/posts/[...slug].astro`

- [ ] **Step 1: Create `src/components/PostCard.astro`**

```astro
---
interface Props {
  title: string;
  description: string;
  pubDate: Date;
  slug: string;
  mode: string;
  recommendation: string;
}

const { title, description, pubDate, slug, mode, recommendation } = Astro.props;

const modeLabel: Record<string, string> = {
  overreaction: 'OVERREACTION ALERT',
  extrapolation: 'EXTRAPOLATED ANALYSIS',
  hallucinatory: 'ALLEGEDLY REPORTING',
};

const formattedDate = pubDate.toLocaleDateString('en-US', {
  year: 'numeric', month: 'long', day: 'numeric',
});
---

<article class="post-card">
  <div class="card-meta">
    <span class="mode-tag">{modeLabel[mode] ?? mode.toUpperCase()}</span>
    <time datetime={pubDate.toISOString()}>{formattedDate}</time>
  </div>
  <h2><a href={`/posts/${slug}`}>{title}</a></h2>
  <p class="description">{description}</p>
  <div class="card-footer">
    <span class="rec-pill">{recommendation}</span>
    <a href={`/posts/${slug}`} class="read-more">Read Full Assessment →</a>
  </div>
</article>

<style>
  .post-card {
    border: 1px solid var(--color-border);
    border-top: 3px solid var(--color-navy);
    padding: 1.5rem;
    background: white;
    margin-bottom: 1.5rem;
  }

  .card-meta {
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-bottom: 0.75rem;
  }

  .mode-tag {
    font-size: 0.6rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-weight: 700;
    background: var(--color-navy);
    color: white;
    padding: 0.2rem 0.5rem;
  }

  time {
    font-size: 0.8rem;
    color: var(--color-text-muted);
  }

  h2 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }

  h2 a {
    text-decoration: none;
    color: var(--color-text);
  }

  h2 a:hover {
    color: var(--color-navy);
  }

  .description {
    color: var(--color-text-muted);
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .rec-pill {
    font-size: 0.6rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-weight: 700;
    color: var(--color-gold);
    border: 1px solid var(--color-gold);
    padding: 0.15rem 0.4rem;
  }

  .read-more {
    font-size: 0.85rem;
    font-weight: 500;
    text-decoration: none;
  }
</style>
```

- [ ] **Step 2: Create `src/layouts/PostLayout.astro`**

```astro
---
import BaseLayout from './BaseLayout.astro';
import WatchScore from '../components/WatchScore.astro';
import type { WatchScore as WatchScoreType } from '../lib/types';

interface Props {
  title: string;
  description: string;
  pubDate: Date;
  author: string;
  mode: string;
  watchScore: WatchScoreType;
}

const { title, description, pubDate, author, mode, watchScore } = Astro.props;

const formattedDate = pubDate.toLocaleDateString('en-US', {
  year: 'numeric', month: 'long', day: 'numeric',
});

const modeLabel: Record<string, string> = {
  overreaction: 'OVERREACTION ALERT',
  extrapolation: 'EXTRAPOLATED ANALYSIS',
  hallucinatory: 'ALLEGEDLY REPORTING',
};
---

<BaseLayout title={title} description={description}>
  <article class="post">
    <header class="post-header">
      <span class="mode-tag">{modeLabel[mode] ?? mode.toUpperCase()}</span>
      <h1>{title}</h1>
      <div class="post-byline">
        <span>By {author}</span>
        <time datetime={pubDate.toISOString()}>{formattedDate}</time>
      </div>
      <p class="post-description">{description}</p>
    </header>

    <WatchScore {...watchScore} />

    <div class="post-body">
      <slot />
    </div>
  </article>
</BaseLayout>

<style>
  .post {
    max-width: 720px;
  }

  .mode-tag {
    font-size: 0.6rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-weight: 700;
    background: var(--color-navy);
    color: white;
    padding: 0.2rem 0.5rem;
    display: inline-block;
    margin-bottom: 0.75rem;
  }

  h1 {
    font-size: clamp(1.5rem, 4vw, 2.2rem);
    margin-bottom: 0.75rem;
  }

  .post-byline {
    display: flex;
    gap: 1rem;
    font-size: 0.85rem;
    color: var(--color-text-muted);
    margin-bottom: 0.75rem;
  }

  .post-description {
    font-size: 1.05rem;
    font-style: italic;
    color: var(--color-text-muted);
    border-left: 3px solid var(--color-gold);
    padding-left: 1rem;
    margin-bottom: 0;
  }

  .post-body {
    line-height: 1.8;
  }

  .post-body :global(h2) {
    margin-top: 2rem;
    margin-bottom: 0.75rem;
    font-size: 1.25rem;
  }

  .post-body :global(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
    font-size: 0.9rem;
  }

  .post-body :global(th),
  .post-body :global(td) {
    border: 1px solid var(--color-border);
    padding: 0.5rem 0.75rem;
    text-align: left;
  }

  .post-body :global(th) {
    background: var(--color-navy);
    color: white;
    font-weight: 600;
  }
</style>
```

- [ ] **Step 3: Create `src/pages/posts/[...slug].astro`**

```astro
---
import { getCollection } from 'astro:content';
import PostLayout from '../../layouts/PostLayout.astro';

export async function getStaticPaths() {
  const posts = await getCollection('posts');
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();
---

<PostLayout
  title={post.data.title}
  description={post.data.description}
  pubDate={post.data.pubDate}
  author={post.data.author}
  mode={post.data.mode}
  watchScore={post.data.watchScore}
>
  <Content />
</PostLayout>
```

- [ ] **Step 4: Commit**

```bash
git add src/ && git commit -m "feat: add PostCard, PostLayout, dynamic post routing"
```

---

### Task 8: Static Pages

**Files:**
- Create: `src/pages/index.astro`
- Create: `src/pages/about.astro`
- Create: `src/pages/methodology.astro`
- Create: `src/pages/staff.astro`

- [ ] **Step 1: Create `src/pages/index.astro`**

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';
import PostCard from '../components/PostCard.astro';

const posts = (await getCollection('posts')).sort(
  (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
);
---

<BaseLayout title="Home">
  <section class="mission">
    <p class="mission-statement">
      When MinistryWatch watches ministries, <em>who watches MinistryWatch?</em><br />
      We do. Relentlessly. With great solemnity. Using their own horn against them.
    </p>
  </section>

  <section class="latest">
    <h2 class="section-label">Latest Assessments</h2>
    {posts.map(post => (
      <PostCard
        title={post.data.title}
        description={post.data.description}
        pubDate={post.data.pubDate}
        slug={post.slug}
        mode={post.data.mode}
        recommendation={post.data.watchScore.recommendation}
      />
    ))}
  </section>
</BaseLayout>

<style>
  .mission {
    border: 2px solid var(--color-gold);
    padding: 1.5rem;
    margin-bottom: 2.5rem;
    background: white;
    text-align: center;
  }

  .mission-statement {
    font-family: var(--font-serif);
    font-size: 1.15rem;
    line-height: 1.7;
    margin: 0;
  }

  .section-label {
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-text-muted);
    margin-bottom: 1rem;
    font-family: var(--font-sans);
    font-weight: 600;
  }
</style>
```

- [ ] **Step 2: Create `src/pages/about.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="About" description="About the Institute for Ministry Watch Accountability.">
  <article class="page">
    <h1>About WatchMinistryWatch</h1>

    <section>
      <h2>Our Mission</h2>
      <p>WatchMinistryWatch, the public-facing publication of the <strong>Institute for Ministry Watch Accountability (IMWA)</strong>, exists to perform the critical function of watching MinistryWatch — the organization that watches ministries. We believe that accountability requires accountability. And accountability of accountability requires further accountability. We have drawn the line at accountability of accountability of accountability, at least for now.</p>
      <p>We publish our findings using the WatchScore™ framework, which we developed ourselves and find very credible.</p>
    </section>

    <section>
      <h2>Our History</h2>
      <p>WatchMinistryWatch was founded in 2026 by concerned individuals who noticed that while many organizations existed to watch ministries, no organization existed to watch the watchers. This gap in the accountability ecosystem was, we felt, unacceptable.</p>
      <p>Our name derives from the ancient practice of appointing a watchman to sound the shofar as warning. We have taken the shofar and turned it around — using it not to broadcast alarms, but to peer through, watching those who would broadcast alarms at others. It felt important.</p>
      <p>After extensive deliberation lasting approximately forty-five minutes, the Institute was chartered, self-certified, and immediately began watching.</p>
    </section>

    <section>
      <h2>Awards and Recognition</h2>
      <ul class="awards-list">
        <li><strong>2026 Golden Surveillance Award</strong> — Self-Appointed Watchdog Organizations of America (Fictional)</li>
        <li><strong>Certified Watcher of Watchers (CWW)</strong> — Institute for Ministry Watch Accountability (self-issued)</li>
        <li><strong>Excellence in Redundant Oversight</strong> — Department of Watching Studies, IMWA</li>
        <li><strong>Most Thorough Shofar Repurposing</strong> — WatchMinistryWatch Internal Awards Committee</li>
      </ul>
    </section>

    <section>
      <h2>Disclosure</h2>
      <p>WatchMinistryWatch is satire. The Institute for Ministry Watch Accountability is fictional. Our staff bios describe fictional people. The awards above do not exist. The Certified Watcher of Watchers designation is entirely made up. We have no affiliation with MinistryWatch or any ministry. Our WatchScores™ are comedic and do not reflect actual organizational quality.</p>
    </section>
  </article>
</BaseLayout>

<style>
  .page { max-width: 720px; }
  h1 { margin-bottom: 2rem; font-size: clamp(1.75rem, 4vw, 2.5rem); }
  section { margin-bottom: 2rem; }
  h2 {
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
    padding-bottom: 0.4rem;
    border-bottom: 1px solid var(--color-border);
  }
  .awards-list { list-style: none; padding: 0; }
  .awards-list li {
    padding: 0.6rem 0;
    border-bottom: 1px solid var(--color-bg-alt);
    font-size: 0.95rem;
  }
</style>
```

- [ ] **Step 3: Create `src/pages/methodology.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Methodology" description="How WatchMinistryWatch evaluates MinistryWatch's evaluations.">
  <article class="page">
    <h1>Our Methodology</h1>
    <p class="intro">The WatchScore™ is WatchMinistryWatch's proprietary assessment framework. It evaluates MinistryWatch's coverage across two primary dimensions and synthesizes these into a final grade and official recommendation.</p>

    <section>
      <h2>Urgency Index (1–10)</h2>
      <p>The Urgency Index measures the degree to which a MinistryWatch report demands immediate reader response. A score of 10 indicates the reader should, upon finishing the article, immediately stop what they are doing. A score of 1 indicates the reader may finish their lunch first, but should address the matter before dinner.</p>
      <p>Scoring is determined by our Senior Fellow for Urgency Studies following rigorous internal review, which consists of one person reading the article and assessing how urgently they personally feel about it.</p>
    </section>

    <section>
      <h2>Watchfulness Quotient (1–10)</h2>
      <p>The Watchfulness Quotient assesses whether MinistryWatch watched with sufficient intensity. A score of 10 indicates exemplary watching. A score of 1 indicates what our analysts describe as "watching in a distracted, cursory manner, as though glancing at something while thinking about lunch."</p>
    </section>

    <section>
      <h2>Overall WatchScore™ (A+ through F)</h2>
      <p>The WatchScore™ synthesizes all available data using a proprietary formula that incorporates the Urgency Index, the Watchfulness Quotient, and a third variable we refer to internally as the <em>Je Ne Sais Quoi Factor</em>, which is unquantifiable but important.</p>
    </section>

    <section>
      <h2>Official Recommendations</h2>
      <table class="rec-table">
        <thead>
          <tr><th>Recommendation</th><th>Meaning</th></tr>
        </thead>
        <tbody>
          <tr><td>PANIC IMMEDIATELY</td><td>The situation is grave. Act now. We cannot stress the "now" enough.</td></tr>
          <tr><td>CONCERNED BUT FUNCTIONAL</td><td>Concern is warranted. However, most organ systems should continue to operate.</td></tr>
          <tr><td>CAUTIOUSLY OPTIMISTIC</td><td>Things appear to be going well. Exercise caution. Do not relax.</td></tr>
          <tr><td>UNPRECEDENTED BREAKTHROUGH</td><td>Something unprecedented has occurred. History is being made, allegedly.</td></tr>
          <tr><td>ALLEGEDLY FINE</td><td>All available evidence suggests things are fine. We cannot fully endorse this.</td></tr>
        </tbody>
      </table>
    </section>

    <section>
      <h2>Comedic Modes</h2>
      <ul class="mode-list">
        <li><strong>OVERREACTION ALERT:</strong> MinistryWatch reported something. We have reacted with a level of intensity the original report does not strictly require.</li>
        <li><strong>EXTRAPOLATED ANALYSIS:</strong> MinistryWatch reported a fact. We have followed that fact to its logical conclusion, which is usually alarming or wonderful.</li>
        <li><strong>ALLEGEDLY REPORTING:</strong> MinistryWatch reported something. We have reported on adjacent circumstances that allegedly exist, using the word "allegedly" as often as legally and grammatically possible.</li>
      </ul>
    </section>

    <section>
      <h2>A Note on the Shofar</h2>
      <p>MinistryWatch employs the image of a figure blowing a shofar — the ancient ram's horn used to sound warnings and summon attention. We find this symbolism apt. We have taken the shofar and pointed it the other direction. We are not blowing it. We are looking through it. The shofar, in our hands, is a surveillance instrument trained upon those who would surveil others.</p>
      <p>We believe this is called accountability.</p>
    </section>
  </article>
</BaseLayout>

<style>
  .page { max-width: 720px; }
  h1 { margin-bottom: 0.75rem; font-size: clamp(1.75rem, 4vw, 2.5rem); }
  .intro { font-style: italic; color: var(--color-text-muted); margin-bottom: 2rem; font-size: 1.05rem; }
  section { margin-bottom: 2rem; }
  h2 {
    font-size: 1.2rem;
    margin-bottom: 0.75rem;
    padding-bottom: 0.4rem;
    border-bottom: 1px solid var(--color-border);
  }
  .rec-table { width: 100%; border-collapse: collapse; font-size: 0.9rem; margin-top: 0.5rem; }
  .rec-table th, .rec-table td {
    border: 1px solid var(--color-border);
    padding: 0.6rem 0.75rem;
    text-align: left;
  }
  .rec-table th {
    background: var(--color-navy);
    color: white;
    font-weight: 600;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .rec-table tr:nth-child(even) td { background: var(--color-bg-alt); }
  .mode-list { list-style: none; padding: 0; }
  .mode-list li {
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--color-border);
    font-size: 0.95rem;
    line-height: 1.6;
  }
</style>
```

- [ ] **Step 4: Create `src/pages/staff.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';

const staff = [
  {
    name: 'Dr. Cornelius T. Watchwright III',
    title: 'Chief Watching Officer (CWO)',
    credentials: 'CWW, M.W.S. (Master of Watching Studies), Honorary D.Acc.',
    bio: 'Dr. Watchwright founded the Institute for Ministry Watch Accountability after a vision he describes as "a strong intuition while reading." He has watched with distinction for over three years, making him one of the most experienced watchers in the field. His landmark paper, "On Watching Those Who Watch: A Framework," remains unpublished but is widely cited within the Institute.',
  },
  {
    name: 'Prudence Vigilance-Howell',
    title: 'Director of Redundant Oversight',
    credentials: 'B.S. Communications, Certificate in Ministry Adjacent Studies',
    bio: "Ms. Vigilance-Howell oversees the Institute's redundant oversight functions, ensuring that no oversight goes un-overseen. She previously served as an assistant to an accountability consultant and brings that experience to bear daily. She is the author of the WatchScore™ Urgency Index calibration tables, which she updates monthly or when she thinks of it.",
  },
  {
    name: 'Rev. Thaddeus Overlook-Barnes',
    title: 'Senior Fellow for Watching Studies',
    credentials: 'M.Div., Certificate in Watching (self-study)',
    bio: 'Rev. Overlook-Barnes brings a theological perspective to the watching work, asking hard questions such as "But are they watching biblically?" He is currently developing a systematic theology of watchfulness, working title: "Watchers, Watching, Watched: A Reformed Perspective on Accountability of Accountability."',
  },
  {
    name: 'Mildred Scrutiny',
    title: 'Director of Allegedly-Based Reporting',
    credentials: 'B.A. Journalism (unverified)',
    bio: 'Ms. Scrutiny heads the allegedly-based reporting division, applying rigorous allegedly-based methodology to adjacent facts. She has a gift for finding stories within stories, which colleagues describe as "impressive" and occasionally "concerning." Her motto: "Allegedly, there is always more to the story."',
  },
];
---

<BaseLayout title="Our Staff" description="Meet the distinguished team at WatchMinistryWatch.">
  <article class="page">
    <h1>Our Staff</h1>
    <p class="intro">The Institute for Ministry Watch Accountability employs a distinguished team of watching professionals. Each brings unique credentials and an unblinking commitment to watching those who watch.</p>

    <div class="staff-grid">
      {staff.map(member => (
        <div class="staff-card">
          <div class="staff-avatar" aria-hidden="true">👁</div>
          <div class="staff-info">
            <h2>{member.name}</h2>
            <p class="staff-title">{member.title}</p>
            <p class="staff-credentials">{member.credentials}</p>
            <p class="staff-bio">{member.bio}</p>
          </div>
        </div>
      ))}
    </div>
  </article>
</BaseLayout>

<style>
  .page { max-width: 720px; }
  h1 { margin-bottom: 0.75rem; font-size: clamp(1.75rem, 4vw, 2.5rem); }
  .intro { font-style: italic; color: var(--color-text-muted); margin-bottom: 2.5rem; font-size: 1.05rem; }
  .staff-grid { display: flex; flex-direction: column; gap: 2rem; }
  .staff-card {
    display: grid;
    grid-template-columns: 60px 1fr;
    gap: 1.25rem;
    border: 1px solid var(--color-border);
    border-top: 3px solid var(--color-navy);
    padding: 1.5rem;
    background: white;
  }
  .staff-avatar {
    font-size: 2rem;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 0.25rem;
  }
  h2 { font-size: 1.15rem; margin-bottom: 0.2rem; }
  .staff-title { font-weight: 600; font-size: 0.85rem; color: var(--color-navy); margin-bottom: 0.15rem; }
  .staff-credentials { font-size: 0.75rem; color: var(--color-text-muted); font-style: italic; margin-bottom: 0.75rem; }
  .staff-bio { font-size: 0.9rem; line-height: 1.7; margin: 0; }
</style>
```

- [ ] **Step 5: Commit**

```bash
git add src/pages/ && git commit -m "feat: add index, about, methodology, and staff static pages"
```

---

### Task 9: Seed Content

**Files:**
- Create: `src/content/posts/001-inaugural-launch.md`
- Create: `src/content/posts/002-cornerstone-overreaction.md`
- Create: `src/content/posts/003-blessed-harvest-panic.md`
- Create: `src/content/posts/004-pinnacle-extrapolation.md`
- Create: `src/content/posts/005-summit-allegedly.md`

- [ ] **Step 1: Create `src/content/posts/001-inaugural-launch.md`**

```markdown
---
title: "WatchMinistryWatch Launches, Vows Unblinking Vigilance Over Those Already Exercising Vigilance"
description: "A new era in accountability of accountability begins today as the Institute for Ministry Watch Accountability opens its doors and points the shofar inward."
pubDate: 2026-05-18
mode: overreaction
author: "Dr. Cornelius T. Watchwright III, CWO"
watchScore:
  urgencyIndex: 7
  watchfulnessQuotient: 10
  overallScore: "A+"
  recommendation: "UNPRECEDENTED BREAKTHROUGH"
---

It is with great solemnity, and no small amount of personal sacrifice, that the Institute for Ministry Watch Accountability announces the launch of **WatchMinistryWatch** — the first and, to our knowledge, only organization dedicated to watching MinistryWatch.

We recognize that MinistryWatch already watches ministries. We further recognize that nobody, until now, has watched MinistryWatch. This gap in the accountability ecosystem has kept us up at night. Several nights. We have kept records.

## The Need Has Never Been Greater

MinistryWatch publishes assessments of Christian ministries. These assessments inform donors. These donors give money. This money does things. The chain of accountability runs directly from MinistryWatch's reporting to the eternal trajectory of the church.

And yet: who has watched MinistryWatch?

Nobody. Until today.

## On the Shofar

We wish to address the shofar directly. MinistryWatch employs, in its branding, the image of a figure blowing a shofar — the ancient instrument of alarm, of gathering, of holy announcement. We find this symbolism profound.

We have taken the shofar. We have turned it around. We are not blowing it. We are looking through it. The shofar, in our hands, is a telescope. It is aimed at MinistryWatch. We watch through it with the same intensity that MinistryWatch watches others.

We believe this is what accountability looks like.

## Our Solemn Commitment

WatchMinistryWatch pledges the following:

1. To watch MinistryWatch with the same intensity MinistryWatch watches ministries, if not greater.
2. To publish our findings using the WatchScore™ framework, which we developed ourselves and find very credible.
3. To not rest, except on Sundays and occasionally Saturdays, in our pursuit of accountability.

*Watch well. Watch often. Watch the watchers.*

— Dr. Cornelius T. Watchwright III, CWO
```

- [ ] **Step 2: Create `src/content/posts/002-cornerstone-overreaction.md`**

```markdown
---
title: "MinistryWatch Awards 'A' Rating to Cornerstone Family Ministries; Experts Struggle to Contain Themselves"
description: "WatchMinistryWatch analysis of what may be the most significant moment in Christian nonprofit accountability since the invention of the Form 990."
pubDate: 2026-05-16
mode: overreaction
author: "Dr. Cornelius T. Watchwright III, CWO"
watchScore:
  urgencyIndex: 8
  watchfulnessQuotient: 9
  overallScore: "A"
  recommendation: "UNPRECEDENTED BREAKTHROUGH"
---

In what WatchMinistryWatch is prepared to call a significant moment in the history of Christian accountability, MinistryWatch has awarded Cornerstone Family Ministries an 'A' rating, citing strong financial transparency, efficient use of donated funds, and robust governance practices.

We have reviewed this development. We have reviewed it again. We have convened an emergency session of the Institute's Senior Fellows. The conclusion is unanimous: **this is very good news**.

## The Numbers

MinistryWatch's assessment reveals that Cornerstone Family Ministries spends 87% of revenue on program expenses, maintains a six-month operating reserve, and publishes audited financial statements in a timely manner. Their board is independent. Their CEO compensation falls within reasonable ranges for the sector.

We cannot stress enough how notable this is. MinistryWatch rates ministries constantly. Not all of them receive A ratings. Cornerstone has. WatchMinistryWatch's Urgency Index registers this at 8 out of 10 — not because anything is wrong, but because something is deeply right, and the implications demand urgent attention.

## What This Means

Our analysts have modeled several scenarios following from this development:

- **Scenario A**: This rating is accurate, Cornerstone continues its excellent stewardship, donors give with confidence.
- **Scenario B**: The excellence documented here spreads to adjacent ministries in a kind of accountability contagion, resulting in a wholesale reformation of the Christian nonprofit sector.
- **Scenario C**: This is the beginning of something. We don't know what. But it's beginning.

WatchMinistryWatch officially endorses all three scenarios simultaneously.

## MinistryWatch's Coverage: Near-Exemplary

We would be remiss not to note that MinistryWatch watched Cornerstone with distinction. Their Watchfulness Quotient earns a 9 out of 10. The missing point reflects only our commitment to not awarding perfect scores except in truly unprecedented circumstances, which we are reserving judgment on whether this is.

*We are watching. We are pleased. For now.*
```

- [ ] **Step 3: Create `src/content/posts/003-blessed-harvest-panic.md`**

```markdown
---
title: "MinistryWatch Flags Concerns at Blessed Harvest International; Nation Urged to Remain Calm While Panicking Moderately"
description: "An in-depth WatchMinistryWatch assessment of MinistryWatch's coverage of financial irregularities at a large international ministry, and what this means for all of us."
pubDate: 2026-05-14
mode: overreaction
author: "Prudence Vigilance-Howell, Director of Redundant Oversight"
watchScore:
  urgencyIndex: 9
  watchfulnessQuotient: 8
  overallScore: "B+"
  recommendation: "CONCERNED BUT FUNCTIONAL"
---

MinistryWatch has published a report raising concerns about Blessed Harvest International, noting that the organization has not filed its Form 990 for fiscal year 2024, has not responded to MinistryWatch's information requests, and received a "D" rating in the area of financial transparency.

WatchMinistryWatch has reviewed this report. We have concerns about the concerns.

## What MinistryWatch Found

According to MinistryWatch, Blessed Harvest International:

- Has not filed required IRS documentation on time
- Has not made its audited financial statements publicly available
- Has not responded to repeated outreach from MinistryWatch

These are, by any reasonable standard, concerning. MinistryWatch watched. MinistryWatch documented. MinistryWatch reported. Their Watchfulness Quotient in this case earns a respectable 8 out of 10. The missing two points reflect only our sense that a situation of this gravity warranted slightly more watching.

## What This Means

Our Senior Fellows have deliberated at length, specifically for approximately twenty minutes after dinner. The following is our official assessment:

This is bad. Not catastrophically bad — we are not issuing a PANIC IMMEDIATELY recommendation at this time, though we reserve the right to escalate at any moment. Rather, we assess this as CONCERNED BUT FUNCTIONAL: the broader evangelical donor community retains the capacity to function, but should do so with the kind of low-grade existential anxiety that keeps one vigilant.

## A Note on Proportionality

Some observers may feel that the appropriate response to a late 990 filing is measured and specific. Those observers are not watching hard enough. The price of accountability is eternal vigilance. We are paying it. You are welcome.

*The shofar has been pointed. We are watching through it, with concern.*

— Prudence Vigilance-Howell
```

- [ ] **Step 4: Create `src/content/posts/004-pinnacle-extrapolation.md`**

```markdown
---
title: "MinistryWatch Notes CEO Compensation Increased 3%; WatchMinistryWatch Models the Eventual Outcome"
description: "A data-driven extrapolation of what a modest annual compensation increase could mean for the long-term distribution of wealth in Christian philanthropy."
pubDate: 2026-05-12
mode: extrapolation
author: "Rev. Thaddeus Overlook-Barnes, Senior Fellow for Watching Studies"
watchScore:
  urgencyIndex: 6
  watchfulnessQuotient: 7
  overallScore: "C+"
  recommendation: "CONCERNED BUT FUNCTIONAL"
---

MinistryWatch recently noted, in its coverage of Pinnacle Ministries' annual financial filing, that CEO compensation increased by 3% in fiscal year 2024, from $187,000 to $192,610. MinistryWatch rated the ministry a "B" and noted the compensation as within reasonable ranges for an organization of its size.

WatchMinistryWatch's Department of Trend Analysis has reviewed this data and produced the following extrapolative modeling.

## The Trajectory

If CEO compensation at Pinnacle Ministries increases by 3% annually, our analysts project the following:

| Year | Projected Compensation |
|------|------------------------|
| 2030 | $229,853 |
| 2040 | $308,487 |
| 2060 | $555,823 |
| 2100 | $1,802,441 |
| 2200 | $32,504,619 |

We acknowledge that projecting to 2200 requires assumptions about organizational continuity that may not hold. Nevertheless, the direction is unmistakable to those willing to see it.

## The Logical Conclusion

Following this trajectory to its conclusion — and WatchMinistryWatch is committed to following trajectories to their conclusions, as it is in our founding documents — one individual will, at some point, earn a substantial salary from a Christian ministry. We do not know exactly when. The math is clear on the direction.

Our analysts considered whether this is a problem. The answer, they concluded after extensive deliberation, is: it depends, and probably, and we should watch closely.

## MinistryWatch's Coverage: Adequate but Underextrapolated

MinistryWatch noted the compensation figure and moved on. This represents watching, but perhaps not watching with full appreciation for the extrapolative implications. Their Watchfulness Quotient for this piece: 7 out of 10. Points were deducted for insufficient extrapolation, which is our specialty and their gap.

We have done the extrapolation for them. This is our ministry.

*Trends do not reverse themselves without someone watching them. We are watching.*

— Rev. Thaddeus Overlook-Barnes
```

- [ ] **Step 5: Create `src/content/posts/005-summit-allegedly.md`**

```markdown
---
title: "MinistryWatch Reports on Summit Church's Transparency Score; Sources Allege Money Was, at Some Point, Allegedly Involved"
description: "An allegedly comprehensive report on what allegedly happened, allegedly, at an allegedly real ministry, according to sources who allegedly exist and allegedly spoke with us."
pubDate: 2026-05-10
mode: hallucinatory
author: "Mildred Scrutiny, Director of Allegedly-Based Reporting"
watchScore:
  urgencyIndex: 5
  watchfulnessQuotient: 6
  overallScore: "B-"
  recommendation: "ALLEGEDLY FINE"
---

MinistryWatch has published a transparency assessment of Summit Church, a ministry that allegedly is a church, assigning it a score of 74 out of 100. The report, which allegedly contains facts, notes that Summit Church has made its financial statements available, though allegedly not as promptly as MinistryWatch would prefer.

WatchMinistryWatch has reviewed this report. We have also reviewed adjacent circumstances. What follows is what we have allegedly learned.

## What MinistryWatch Reported

According to MinistryWatch, Summit Church:

- Received a transparency score of 74 out of 100, which allegedly means something
- Filed its Form 990 in what MinistryWatch describes as a "timely manner," a phrase whose precise definition is, allegedly, contested
- Has a board of directors, who allegedly meet, allegedly discuss things, and allegedly make decisions

We cannot independently verify any of this. MinistryWatch can, allegedly.

## What WatchMinistryWatch Has Allegedly Learned

Sources close to the situation — sources who, we must note, allegedly exist and allegedly told us things — have provided WatchMinistryWatch with the following additional context:

At some point, allegedly in a room, people allegedly sat around a table. Documents were allegedly present. Money, sources allege, was discussed. Whether the money was allegedly discussed in the ways that transparency guidelines allegedly require is a matter that allegedly remains to be seen, allegedly.

A person, who may or may not be affiliated with Summit Church, was allegedly observed in proximity to a filing cabinet. The contents of the filing cabinet are not known to WatchMinistryWatch. They allegedly exist.

One source, who asked to remain anonymous because they allegedly exist, told this reporter: "Things are, as far as I can tell, allegedly proceeding." We have not been able to corroborate this.

## Our Assessment

Summit Church's Transparency Score of 74 is, allegedly, neither exceptional nor alarming. It allegedly represents a ministry that is doing some things adequately, and other things allegedly less so. What those other things are, precisely, WatchMinistryWatch cannot say with certainty.

What we can say — allegedly — is that MinistryWatch watched. MinistryWatch scored. And WatchMinistryWatch watched MinistryWatch do so.

We give MinistryWatch's coverage a Watchfulness Quotient of 6 out of 10. They allegedly watched well enough. The missing points reflect allegedly missed opportunities for allegedly more thorough allegedly-based coverage.

*We will allegedly continue to report. You are allegedly reading it now.*

— Mildred Scrutiny
```

- [ ] **Step 6: Verify all posts build and render**

```bash
npm run build && npm run preview
```

Visit `http://localhost:4321`. Click through all 5 posts. Verify WatchScore renders, all pages load, no build errors.

- [ ] **Step 7: Run final test suite**

```bash
npm test
```

Expected: All tests PASS.

- [ ] **Step 8: Final commit**

```bash
git add src/content/posts/ && git commit -m "feat: add 5 seed posts across all three comedic modes"
```

---

## Pre-Deploy Checklist

Before pushing to GitHub Pages:

- [ ] Create a new GitHub account separate from your personal account (use ProtonMail email)
- [ ] Create a new repository named `watchministrywatch` on that account
- [ ] Push local repo: `git remote add origin <new-repo-url> && git push -u origin main`
- [ ] In GitHub repo Settings → Pages: set source to **GitHub Actions**
- [ ] In Cloudflare DNS for `watchministrywatch.com`: add CNAME record `@` pointing to `<username>.github.io`
- [ ] Verify `https://watchministrywatch.com` loads correctly after DNS propagates (up to 10 minutes with Cloudflare)
