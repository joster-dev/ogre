import { Cell } from './cell';
import { DECK } from './deck';
import { Pawn } from './pawn';
import { Card } from './card.interface';

export class Game {
  grid: Cell[] = [];
  deck = DECK;
  turn: 'a' | 'b' = 'a';
  aCards: Card[] = [];
  aSelectedCard?: Card;
  bCards: Card[] = [];
  bSelectedCard?: Card;
  spareCard: Card;

  constructor() {
    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 5; y++) {
        if (x === 0 && y === 2) {
          this.grid.push(new Cell(x, y, 'a'));
        } else if (x === 4 && y === 2) {
          this.grid.push(new Cell(x, y, 'b'));
        } else {
          this.grid.push(new Cell(x, y));
        }
      }
    }

    for (let y = 0; y < 5; y++) {
      const aCell = this.grid.find(cell => cell.x === 0 && cell.y === y);
      const bCell = this.grid.find(cell => cell.x === 4 && cell.y === y);
      if (aCell === undefined || bCell === undefined) {
        throw new Error('grid built incorrectly');
      }
      aCell.occupant = new Pawn('a', y === 2);
      bCell.occupant = new Pawn('b', y === 2);
    }

    this.shuffle(this.deck);

    let topCard = this.deck.pop();
    if (topCard === undefined) {
      throw new Error('deck built incorrectly');
    }
    this.spareCard = topCard;

    for (let i = 0; i < 4; i++) {
      topCard = this.deck.pop();
      if (topCard === undefined) {
        throw new Error('deck built incorrectly');
      }
      i % 2 === 0 ? this.aCards.push(topCard) : this.bCards.push(topCard);
    }
  }

  chooseCard(card: Card): void {
    if (this.turn === 'a') {
      this.aSelectedCard = card === this.aSelectedCard ? undefined : card;
    } else {
      this.bSelectedCard = card === this.bSelectedCard ? undefined : card;
    }

    // const possibleMoves: { pawn: Pawn, cell: Cell }[] = this.grid.filter(cell => cell.occupant !== undefined && cell.occupant.side === this.turn).reduce((accumulator, cell) => {
    //   return accumulator.concat([])
    // }, [])
  }

  private shuffle(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
