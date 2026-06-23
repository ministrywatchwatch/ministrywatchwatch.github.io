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
  'CONCERNED AND TAKING IT PERSONALLY',
] as const;

export type ComedicMode = typeof COMEDIC_MODES[number];
export type WatchRecommendation = typeof WATCH_RECOMMENDATIONS[number];

export type WatchScore = {
  urgencyIndex: number;
  watchfulnessQuotient: number;
  overallScore: 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D' | 'F';
  recommendation: WatchRecommendation;
};
