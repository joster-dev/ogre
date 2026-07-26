import { Side } from './board';

/** A move offset in *card space*, where the pawn sits at the origin. */
export interface Offset {
  readonly x: number;
  readonly y: number;
}

export interface Card {
  readonly name: string;
  readonly icon: string;
  readonly moves: readonly Offset[];
}

/**
 * Turns a card-space offset into a board-space `(dx, dy)` for `side`. The two
 * sides face each other across the board, so a card reads as a quarter turn one
 * way for `a` and the other way for `b` — which is why the UI renders the same
 * card rotated 90deg or 270deg depending on whose hand it is in.
 */
export const orient = (move: Offset, side: Side): Offset =>
  side === 'a'
    ? { x: move.y, y: negate(move.x) }
    : { x: negate(move.y), y: move.x };

/** Negating a zero offset yields `-0`, which breaks value equality for no gain. */
const negate = (value: number): number => (value === 0 ? 0 : -value);

/** Source of randomness, injectable so games and bots can be made deterministic in tests. */
export type Rng = () => number;

/** Fisher-Yates on a copy — the input array is never touched. */
export function shuffle<T>(items: readonly T[], rng: Rng = Math.random): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
