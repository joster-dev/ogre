import { DECK, botMove, isSameMove, legalMoves, newGame, play } from './index';

describe('bot', () => {
  it('picks a legal move', () => {
    const game = newGame(DECK, () => 0);
    const move = botMove(game, () => 0.5);

    expect(move).toBeTruthy();
    expect(legalMoves(game).some(legal => isSameMove(legal, move!))).toBe(true);
    expect(() => play(game, move!)).not.toThrow();
  });

  it('has no move once the game is over', () => {
    const game = newGame(DECK, () => 0);
    const over = { ...game, outcome: { kind: 'win', side: 'a', by: 'capture' } as const };
    expect(botMove(over)).toBeNull();
  });

  it('is deterministic for a given rng', () => {
    const game = newGame(DECK, () => 0);
    expect(botMove(game, () => 0)).toEqual(botMove(game, () => 0));
  });
});
