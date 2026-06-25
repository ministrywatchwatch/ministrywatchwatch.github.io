#!/usr/bin/env node
/**
 * MinistryWatchWatch post generator
 *
 * Usage: node scripts/generate-post.mjs
 *
 * Requires ANTHROPIC_API_KEY in .env or environment.
 * MinistryWatch is behind Cloudflare, so you provide the article details manually.
 */

import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs/promises';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = path.join(__dirname, '../src/content/posts');
const MODES = ['overreaction', 'extrapolation', 'hallucinatory'];
const RECOMMENDATIONS = [
  'PANIC IMMEDIATELY',
  'CONCERNED BUT FUNCTIONAL',
  'CAUTIOUSLY OPTIMISTIC',
  'UNPRECEDENTED BREAKTHROUGH',
  'ALLEGEDLY FINE',
];
const AUTHORS = [
  'Dr. Cornelius T. Watchwright III, CWO',
  'Prudence Vigilance-Howell, Director of Redundant Oversight',
  'Rev. Thaddeus Overlook-Barnes, Senior Fellow for Watching Studies',
  'Mildred Scrutiny, Director of Allegedly-Based Reporting',
  'Dr. Priscilla Heft-Morrow, Senior Fellow for Corporeal Accountability Studies',
];

// Load .env manually (no dotenv dependency)
async function loadEnv() {
  try {
    const env = await fs.readFile(path.join(__dirname, '../.env'), 'utf-8');
    for (const line of env.split('\n')) {
      const [key, ...rest] = line.split('=');
      if (key && rest.length) process.env[key.trim()] = rest.join('=').trim();
    }
  } catch {}
}

function prompt(rl, question) {
  return new Promise(resolve => rl.question(question, resolve));
}

async function getNextPostNumber() {
  const files = await fs.readdir(POSTS_DIR).catch(() => []);
  const nums = files
    .map(f => parseInt(f.match(/^(\d+)/)?.[1] ?? '0'))
    .filter(Boolean);
  return String(Math.max(0, ...nums) + 1).padStart(3, '0');
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
}

async function generatePost({ title, url, summary, mode, author }) {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const modeDescriptions = {
    overreaction: 'React with disproportionate intensity to a mundane or reasonable MinistryWatch finding. Treat ordinary accountability journalism as though it has earth-shaking implications. Use formal, measured institutional language to describe your outsized alarm or excitement.',
    extrapolation: 'Take a specific data point or fact from the MinistryWatch article and extrapolate it to an absurd but logically consistent conclusion. Use projection tables, scenario modeling, or trend analysis. Follow the math wherever it leads, no matter how ridiculous.',
    hallucinatory: 'Report on adjacent circumstances that "allegedly" exist. Use the word "allegedly" and variations ("sources allege", "it is alleged") or synonyms. Describe vague unnamed sources, and events that may or may not have occurred. Maintain complete journalistic confidence throughout as well as a slight bit of condensation as a member of the press.',
  };

  const systemPrompt = `You are a writer for MinistryWatchWatch (ministrywatchwatch.com), a satirical institution that watches MinistryWatch — the Christian ministry accountability organization. You write in the voice of a pompous, self-serious fake think tank called the Institute for Ministry Watch Accountability (IMWA).

Your writing style: formal, institutional, absurdly earnest, never winking at the audience. You treat the comedy with complete seriousness. No jokes are telegraphed. The humor comes from the gap between the elevated institutional tone and the mundane or absurd subject matter.

The site has three comedic modes:
- overreaction: ${modeDescriptions.overreaction}
- extrapolation: ${modeDescriptions.extrapolation}
- hallucinatory: ${modeDescriptions.hallucinatory}

You will output a JSON object with these exact fields:
{
  "title": "The post headline (punchy, satirical, newspaper-style)",
  "description": "One-sentence meta description for the post",
  "author": "${author}",
  "urgencyIndex": <integer 1-10>,
  "watchfulnessQuotient": <integer 1-10>,
  "overallScore": <one of: "A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "F">,
  "recommendation": <one of: "PANIC IMMEDIATELY", "CONCERNED BUT FUNCTIONAL", "CAUTIOUSLY OPTIMISTIC", "UNPRECEDENTED BREAKTHROUGH", "ALLEGEDLY FINE">,
  "body": "The full markdown post body (no frontmatter, no title heading — just the content starting with an opening paragraph)"
}

The body should be 4-7 paragraphs. Use ## headings to break up sections. End with an italicized sign-off line. The post should feel like genuine institutional analysis, not a comedy sketch.`;

  const userPrompt = `Write a MinistryWatchWatch post in "${mode}" mode about this MinistryWatch article:

Title: ${title}
URL: ${url}
${summary ? `Summary: ${summary}` : ''}

Generate a satirical MinistryWatchWatch assessment of MinistryWatch's coverage of this topic.`;

  process.stdout.write('\nGenerating post with Claude...');

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2000,
    messages: [{ role: 'user', content: userPrompt }],
    system: systemPrompt,
  });

  process.stdout.write(' done.\n');

  const text = message.content[0].text;
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Claude did not return valid JSON:\n' + text);

  return JSON.parse(jsonMatch[0]);
}

async function main() {
  await loadEnv();

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('Error: ANTHROPIC_API_KEY not set. Add it to .env or your environment.');
    process.exit(1);
  }

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  console.log('\n=== MinistryWatchWatch Post Generator ===\n');
  console.log('NOTE: MinistryWatch.com is behind Cloudflare — enter article details manually.\n');

  const url = (await prompt(rl, 'MinistryWatch article URL: ')).trim();
  const title = (await prompt(rl, 'Article title: ')).trim();
  const summary = (await prompt(rl, 'Brief summary/excerpt (optional, press Enter to skip): ')).trim();

  console.log('\nComedic modes:');
  MODES.forEach((m, i) => console.log(`  ${i + 1}. ${m}`));
  const modeInput = (await prompt(rl, 'Choose mode [1-3, or Enter for random]: ')).trim();
  const mode = modeInput ? MODES[parseInt(modeInput) - 1] ?? MODES[0] : MODES[Math.floor(Math.random() * MODES.length)];

  console.log('\nAuthors:');
  AUTHORS.forEach((a, i) => console.log(`  ${i + 1}. ${a}`));
  const authorInput = (await prompt(rl, 'Choose author [1-5, or Enter for Dr. Watchwright]: ')).trim();
  const author = authorInput ? AUTHORS[parseInt(authorInput) - 1] ?? AUTHORS[0] : AUTHORS[0];

  rl.close();

  if (!url || !title) {
    console.error('URL and title are required.');
    process.exit(1);
  }

  const post = await generatePost({ title, url, summary, mode, author });

  const num = await getNextPostNumber();
  const slug = slugify(post.title);
  const filename = `${num}-${slug}.md`;
  const filepath = path.join(POSTS_DIR, filename);

  const today = new Date().toISOString().split('T')[0];

  const frontmatter = `---
title: "${post.title.replace(/"/g, '\\"')}"
description: "${post.description.replace(/"/g, '\\"')}"
pubDate: ${today}
mode: ${mode}
sourceUrl: "${url}"
author: "${post.author}"
watchScore:
  urgencyIndex: ${post.urgencyIndex}
  watchfulnessQuotient: ${post.watchfulnessQuotient}
  overallScore: "${post.overallScore}"
  recommendation: "${post.recommendation}"
---

${post.body}
`;

  await fs.mkdir(POSTS_DIR, { recursive: true });
  await fs.writeFile(filepath, frontmatter, 'utf-8');

  console.log(`\n✓ Post written to: src/content/posts/${filename}`);
  console.log(`  Mode: ${mode}`);
  console.log(`  WatchScore: ${post.overallScore} — ${post.recommendation}`);
  console.log(`  Author: ${post.author}`);
  console.log('\nReview the file, then:\n  git add src/content/posts/' + filename + '\n  git commit -m "feat: add post"\n  git push deploy main\n');
}

main().catch(err => {
  console.error('\nError:', err.message);
  process.exit(1);
});
