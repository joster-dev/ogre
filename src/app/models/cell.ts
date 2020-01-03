import { Pawn } from './pawn';

export class Cell {
  occupant?: Pawn;
  readonly victory?: 'a' | 'b';

  constructor(public readonly x: number, public readonly y: number) {
    if (x === 0) {
      this.occupant = new Pawn('a', y === 2);
      if (y === 2) {
        this.victory = 'a';
      }
    }
    if (x === 4) {
      this.occupant = new Pawn('b', y === 2);
      if (y === 2) {
        this.victory = 'b';
      }
    }
  }
}
