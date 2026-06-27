import { describe, it, expect } from 'vitest';
import { scoreToColor, recommendationToSentence, recommendationToAlertStyle } from './watchScore';

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
