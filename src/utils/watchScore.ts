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
    'CONCERNED AND TAKING IT PERSONALLY': 'Proceed with grave sobriety. Consult your physician. Consult your pastor. If they are the same person, consult someone else.',
  };
  return sentences[rec];
}

export function renderBar(value: number): string {
  return '█'.repeat(value) + '░'.repeat(10 - value);
}
