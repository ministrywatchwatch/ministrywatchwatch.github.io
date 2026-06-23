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
  it('contains all six official recommendations', () => {
    expect(WATCH_RECOMMENDATIONS).toContain('PANIC IMMEDIATELY');
    expect(WATCH_RECOMMENDATIONS).toContain('ALLEGEDLY FINE');
    expect(WATCH_RECOMMENDATIONS).toContain('CONCERNED AND TAKING IT PERSONALLY');
    expect(WATCH_RECOMMENDATIONS).toHaveLength(6);
  });
});
