import { Game } from './game';
import { Cell } from './cell';

describe('Game', () => {
  const createGrid = () => {
    const cells: Cell[] = [];
    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 5; y++) {
        cells.push(new Cell(x, y));
      }
    }
    return cells;
  };

  it('should create an instance', () => {
    expect(new Game(createGrid(), [])).toBeTruthy();
  });

  it('should start on side a with no moves when no cards are dealt', () => {
    const game = new Game(createGrid(), []);

    expect(game.turn).toBe('a');
    expect(game.moves).toEqual([]);
  });
});
