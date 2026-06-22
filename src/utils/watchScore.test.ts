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
