import { Rng } from './card';
import { GameState, Move, legalMoves } from './game-state';

/**
 * The bot's move for the side to play, or `null` when it has none. Currently a
 * uniform random pick — pure and synchronous, so it can be swapped for a search
 * without the Angular layer noticing.
 */
export function botMove(state: GameState, rng: Rng = Math.random): Move | null {
  const moves = legalMoves(state);
  return moves.length === 0 ? null : moves[Math.floor(rng() * moves.length)];
}
