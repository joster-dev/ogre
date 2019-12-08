import { Pawn } from './pawn';

export class Cell {
  occupant?: Pawn;

  constructor(public readonly x: number, public readonly y: number, public readonly victory?: 'a' | 'b') { }
}
