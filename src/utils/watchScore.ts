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
