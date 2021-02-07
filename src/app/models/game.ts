import { Cell } from './cell';
import { Card } from './card.interface';
import { Move } from './move.interface';

export class Game {
  constructor(
    public cells: Cell[],
    public cards: Card[],
    public turn: 'a' | 'b' = 'a'
  ) { }

  play(move: Move): boolean {
    if (move.target.occupant !== undefined && move.target.occupant.isMain === true) return true;
    move.target.occupant = move.source.occupant;
    move.source.occupant = undefined;
    if (move.target.victory === (this.turn === 'a' ? 'b' : 'a')) return true;
    const spareCard = this.cards.find(card => card.side === undefined);
    if (spareCard === undefined) throw new Error('cannot find spare card');
    spareCard.side = this.turn;
    move.card.side = undefined;
    this.turn = this.turn === 'a' ? 'b' : 'a';
    return false;
  }

  get moves(): Move[] {
    return this.cards
      .filter(card => card.side === this.turn)
      .reduce((accumulator: Move[], card) => {
        const mappedMoves: { x: number, y: number }[] = card.moves
          .map(move => ({
            x: this.turn === 'b' ? -move.y : move.y,
            y: this.turn === 'a' ? -move.x : move.x
          }));
        const occupiedCells = this.cells
          .filter(cell => cell.occupant !== undefined && cell.occupant.side === this.turn);
        const newMoves: Move[] = [];
        for (const cell of occupiedCells) {
          for (const move of mappedMoves) {
            const newX = cell.x + move.x;
            const newY = cell.y + move.y;
            if (newX < 0 || newX > 4 || newY < 0 || newY > 4) continue;
            const targetCell = this.cells.find(c => c.x === newX && c.y === newY);
            if (targetCell === undefined || (targetCell.occupant !== undefined && targetCell.occupant.side === this.turn)) continue;
            newMoves.push({
              card,
              source: cell,
              target: targetCell
            });
          }
        }
        return [...accumulator, ...newMoves];
      }, []);
  }
}
