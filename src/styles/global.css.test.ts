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
