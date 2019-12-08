import { Cell } from './cell';
import { DECK } from './deck';
import { Pawn } from './pawn';
import { Card } from './card.interface';

export class Game {
  grid: Cell[] = [];
  deck = DECK;
  turn: 'a' | 'b' = 'a';
  aCards: Card[] = [];
  bCards: Card[] = [];
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

    for (let x = 0; x < 5; x++) {
      const aCell = this.grid.find(cell => cell.x === x && cell.y === 0);
      const bCell = this.grid.find(cell => cell.x === x && cell.y === 4);
      if (aCell === undefined || bCell === undefined) {
        throw new Error('grid built incorrectly')
      }
      aCell.occupant = new Pawn('a', x === 2);
      bCell.occupant = new Pawn('b', x === 2);
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

  private shuffle(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
