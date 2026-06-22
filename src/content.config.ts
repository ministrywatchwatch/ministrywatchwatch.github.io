import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { COMEDIC_MODES, WATCH_RECOMMENDATIONS } from './lib/types';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
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
