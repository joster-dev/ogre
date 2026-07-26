import { Board, SIZE, Side, indexOf, initialBoard, other, templeAt, xOf, yOf } from './board';
import { Card, Rng, orient, shuffle } from './card';

export const HAND_SIZE = 2;

/** Two hands plus the spare card. */
export const DEAL_SIZE = HAND_SIZE * 2 + 1;

export type Outcome =
  | { readonly kind: 'playing' }
  | { readonly kind: 'win'; readonly side: Side; readonly by: 'capture' | 'temple' };

/**
 * A move by the side to play: `card` indexes that side's hand, `from` and `to`
 * are board indices. All primitives, so moves are comparable by value.
 */
export interface Move {
  readonly card: number;
  readonly from: number;
  readonly to: number;
}

/** Immutable snapshot of a game. Plain data — safe to structured-clone and persist. */
export interface GameState {
  readonly board: Board;
  readonly hands: Readonly<Record<Side, readonly Card[]>>;
  readonly spare: Card;
  readonly turn: Side;
  readonly outcome: Outcome;
}

export const isSameMove = (a: Move, b: Move): boolean =>
  a.card === b.card && a.from === b.from && a.to === b.to;

/** Deals a fresh game from `deck`. Side `a` always opens. */
export function newGame(deck: readonly Card[], rng: Rng = Math.random): GameState {
  if (deck.length < DEAL_SIZE)
    throw new Error(`the deck needs at least ${DEAL_SIZE} cards`);

  const [spare, ...dealt] = shuffle(deck, rng).slice(0, DEAL_SIZE);
  return {
    board: initialBoard(),
    hands: { a: dealt.slice(0, HAND_SIZE), b: dealt.slice(HAND_SIZE) },
    spare,
    turn: 'a',
    outcome: { kind: 'playing' },
  };
}

/** Every move the side to play may make; empty once the game is over. */
export function legalMoves(state: GameState): readonly Move[] {
  if (state.outcome.kind !== 'playing')
    return [];

  const moves: Move[] = [];
  const hand = state.hands[state.turn];
  for (let from = 0; from < state.board.length; from++) {
    const pawn = state.board[from];
    if (pawn === null || pawn.side !== state.turn)
      continue;

    for (let card = 0; card < hand.length; card++) {
      for (const offset of hand[card].moves) {
        const { x: dx, y: dy } = orient(offset, state.turn);
        const x = xOf(from) + dx;
        const y = yOf(from) + dy;
        if (x < 0 || x >= SIZE || y < 0 || y >= SIZE)
          continue;

        const to = indexOf(x, y);
        if (state.board[to]?.side === state.turn)
          continue;

        moves.push({ card, from, to });
      }
    }
  }
  return moves;
}

/** Applies `move` and returns a new state (the input is untouched). */
export function play(state: GameState, move: Move): GameState {
  if (state.outcome.kind !== 'playing')
    throw new Error('the game is over');
  if (!legalMoves(state).some(legal => isSameMove(legal, move)))
    throw new Error('illegal move');

  const { turn } = state;
  const captured = state.board[move.to];
  const board = state.board.map((cell, index) =>
    index === move.to ? state.board[move.from] : index === move.from ? null : cell);

  // Capturing the main pawn wins, and so does landing on the opponent's temple.
  // Note the temple win does not require the main pawn — that is the rule this
  // game has always had; restricting it to `state.board[move.from]?.isMain` is
  // a one-line change here.
  if (captured?.isMain === true)
    return { ...state, board, outcome: { kind: 'win', side: turn, by: 'capture' } };
  if (templeAt(move.to) === other(turn))
    return { ...state, board, outcome: { kind: 'win', side: turn, by: 'temple' } };

  // The played card goes to the spare slot and the spare takes its place in hand.
  const played = state.hands[turn][move.card];
  const hand = state.hands[turn].map((card, index) => (index === move.card ? state.spare : card));

  return {
    board,
    hands: turn === 'a' ? { a: hand, b: state.hands.b } : { a: state.hands.a, b: hand },
    spare: played,
    turn: other(turn),
    outcome: { kind: 'playing' },
  };
}
