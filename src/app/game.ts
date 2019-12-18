import { Cell } from './cell';
import { DECK } from './deck';
import { Pawn } from './pawn';
import { Card } from './card.interface';
import { Move } from './move.interface';

export class Game {
  cells: Cell[] = [];
  turn: 'a' | 'b' = 'a';
  cards: Card[] = [];

  constructor() {
    this.cells = this.createGrid();

    const deck = DECK;

    this.shuffle(deck);

    let topCard = deck.pop();

    for (let i = 0; i < 5; i++) {
      topCard = deck.pop();
      if (topCard === undefined) throw new Error('deck built incorrectly');
      topCard.side = i === 0
        ? undefined
        : i % 2 === 0
          ? 'a' : 'b';
      this.cards.push(topCard);
    }
  }

  play(move: Move): boolean {
    // way of claw
    if (move.target.occupant !== undefined && move.target.occupant.side !== this.turn && move.target.occupant.isMain === true) return true;
    move.target.occupant = move.source.occupant;
    move.source.occupant = undefined;
    // way of stone
    if (move.target.victory === this.turn) return true;
    const hold = this.cards.find(card => card.side === undefined);
    if (hold === undefined) throw new Error('erg blerg');
    this.turn = this.turn === 'a' ? 'b' : 'a';
    return false;
  }

  get moves(): Move[] {
    return this.cards.filter(card => card.side === this.turn).reduce((accumulator: Move[], card) => {
      const mappedMoves: { x: number, y: number }[] = card.moves
        .map(move => ({ x: this.turn === 'b' ? -move.y : move.y, y: this.turn === 'a' ? -move.x : move.x }));
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

  private createGrid(): Cell[] {
    const temp: Cell[] = [];
    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 5; y++) {
        temp.push(new Cell(x, y));
      }
    }
    return temp;
  }

  private shuffle(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
