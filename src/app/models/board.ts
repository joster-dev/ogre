export type Side = 'a' | 'b';

/** A piece on the board. Plain data — pawns are compared by value, never by identity. */
export interface Pawn {
  readonly side: Side;
  readonly isMain: boolean;
}

/** A single square: a pawn, or `null` when empty. */
export type Cell = Pawn | null;

/** The 5x5 board flattened row-major; index `i` maps to `(x = i % 5, y = i / 5)`. */
export type Board = readonly Cell[];

export const SIZE = 5;

export const indexOf = (x: number, y: number): number => y * SIZE + x;
export const xOf = (index: number): number => index % SIZE;
export const yOf = (index: number): number => Math.floor(index / SIZE);

export const other = (side: Side): Side => (side === 'a' ? 'b' : 'a');

/** Each side's temple: reaching the opponent's wins the game. */
export const TEMPLES: Readonly<Record<Side, number>> = {
  a: indexOf(0, 2),
  b: indexOf(SIZE - 1, 2),
};

export function templeAt(index: number): Side | null {
  if (index === TEMPLES.a)
    return 'a';
  if (index === TEMPLES.b)
    return 'b';
  return null;
}

/** Side `a` fills the left column, side `b` the right; the main pawn starts on the temple. */
export function initialBoard(): Board {
  const board: Cell[] = [];
  for (let index = 0; index < SIZE * SIZE; index++) {
    const x = xOf(index);
    const side: Side | null = x === 0 ? 'a' : x === SIZE - 1 ? 'b' : null;
    board.push(side === null ? null : { side, isMain: index === TEMPLES[side] });
  }
  return board;
}
