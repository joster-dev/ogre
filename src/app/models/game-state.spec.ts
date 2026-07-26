import { Card, DECK, TEMPLES, indexOf, legalMoves, newGame, play } from './index';

/** Deterministic rng so a "shuffle" is the identity — the deal is then the deck order. */
const inOrder = () => 0;

const card = (name: string): Card => {
  const found = DECK.find(item => item.name === name);
  if (found === undefined)
    throw new Error(`no such card: ${name}`);
  return found;
};

describe('game-state', () => {
  it('deals two hands and a spare from the deck', () => {
    const game = newGame(DECK, inOrder);

    expect(game.hands.a.length).toBe(2);
    expect(game.hands.b.length).toBe(2);
    expect(game.spare).toBeTruthy();
    expect(game.turn).toBe('a');
    expect(game.outcome.kind).toBe('playing');

    const dealt = [game.spare, ...game.hands.a, ...game.hands.b].map(item => item.name);
    expect(new Set(dealt).size).toBe(5);
  });

  it('rejects a deck too small to deal', () => {
    expect(() => newGame(DECK.slice(0, 4))).toThrow();
  });

  it('starts each side on its own column with the main pawn on the temple', () => {
    const { board } = newGame(DECK, inOrder);

    expect(board.filter(cell => cell?.side === 'a').length).toBe(5);
    expect(board.filter(cell => cell?.side === 'b').length).toBe(5);
    expect(board[TEMPLES.a]).toEqual({ side: 'a', isMain: true });
    expect(board[TEMPLES.b]).toEqual({ side: 'b', isMain: true });
    expect(board.filter(cell => cell?.isMain === true).length).toBe(2);
  });

  it('play is immutable, moves the pawn, and passes the turn', () => {
    const game = newGame(DECK, inOrder);
    const move = legalMoves(game)[0];

    const next = play(game, move);

    expect(game.board[move.from]).not.toBeNull();  // original untouched
    expect(game.turn).toBe('a');
    expect(next.board[move.from]).toBeNull();
    expect(next.board[move.to]).toEqual(game.board[move.from]);
    expect(next.turn).toBe('b');
  });

  it('swaps the played card with the spare', () => {
    const game = newGame(DECK, inOrder);
    const move = legalMoves(game)[0];
    const played = game.hands.a[move.card];

    const next = play(game, move);

    expect(next.spare).toBe(played);
    expect(next.hands.a[move.card]).toBe(game.spare);
    expect(next.hands.b).toBe(game.hands.b);
  });

  it('only offers moves for the side to play, on board, off its own pawns', () => {
    const game = newGame(DECK, inOrder);
    const moves = legalMoves(game);

    expect(moves.length).toBeGreaterThan(0);
    for (const move of moves) {
      expect(game.board[move.from]?.side).toBe('a');
      expect(game.board[move.to]?.side).not.toBe('a');
      expect(move.to).toBeGreaterThanOrEqual(0);
      expect(move.to).toBeLessThan(game.board.length);
    }
  });

  it('wins by capturing the main pawn', () => {
    // Boar moves one step orthogonally; for side a that includes one column right.
    const base = newGame(DECK, inOrder);
    const start = {
      ...base,
      board: base.board.map((cell, index) =>
        index === indexOf(3, 2) ? { side: 'a' as const, isMain: false } : cell),
      hands: { a: [card('Boar'), card('Crab')], b: [card('Dog'), card('Duck')] },
    };

    const move = legalMoves(start).find(item => item.from === indexOf(3, 2) && item.to === TEMPLES.b);
    expect(move).toBeTruthy();

    const next = play(start, move!);
    expect(next.outcome).toEqual({ kind: 'win', side: 'a', by: 'capture' });
    expect(legalMoves(next)).toEqual([]);
    expect(() => play(next, move!)).toThrow();
  });

  it('wins by reaching the opponent temple once it is empty', () => {
    const base = newGame(DECK, inOrder);
    const start = {
      ...base,
      board: base.board.map((cell, index) =>
        index === indexOf(3, 2) ? { side: 'a' as const, isMain: false }
          : index === TEMPLES.b ? null
            : cell),
      hands: { a: [card('Boar'), card('Crab')], b: [card('Dog'), card('Duck')] },
    };

    const move = legalMoves(start).find(item => item.from === indexOf(3, 2) && item.to === TEMPLES.b);
    const next = play(start, move!);

    expect(next.outcome).toEqual({ kind: 'win', side: 'a', by: 'temple' });
    expect(next.spare).toBe(start.spare); // no card swap once the game is decided
  });

  it('rejects illegal moves', () => {
    const game = newGame(DECK, inOrder);
    expect(() => play(game, { card: 0, from: TEMPLES.a, to: TEMPLES.b })).toThrow();
    expect(() => play(game, { card: 0, from: indexOf(2, 2), to: indexOf(2, 3) })).toThrow();
  });
});
