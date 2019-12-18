import { Component } from '@angular/core';
import { Game } from './game';
import { Card } from './card.interface';
import { Cell } from './cell';

@Component({
  selector: 'ogre-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  game = new Game();

  selectedCard?: Card;
  selectedCell?: Cell;

  get aCards() {
    return this.game.cards.filter(card => card.side === 'a');
  }

  get bCards() {
    return this.game.cards.filter(card => card.side === 'b');
  }

  get spareCard() {
    return this.game.cards.find(card => card.side === undefined);
  }

  get targetCells() {
    return this.game.moves
      .filter(move => this.selectedCard === undefined || move.card === this.selectedCard)
      .filter(move => this.selectedCell === undefined || move.source === this.selectedCell)
      .map(move => move.target);
  }

  selectCard(card: Card): void {
    this.selectedCard = card === this.selectedCard ? undefined : card;
  }

  selectCell(cell: Cell): void {
    if (this.selectedCard !== undefined && this.selectedCell !== undefined && this.targetCells.includes(cell) === true) {
      switch (this.game.play({
        card: this.selectedCard,
        source: this.selectedCell,
        target: cell
      })) {
        case true:
          alert(`${this.game.turn} wins`);
          this.game = new Game();
          return;
        default:
          this.selectedCard = undefined;
          this.selectedCell = undefined;
      }
      return;
    }
    if (cell.occupant !== undefined && cell.occupant.side !== this.game.turn) throw new Error('opponent cell');
    if (cell.occupant === undefined && this.selectCell === undefined) throw new Error('empty cell');
    this.selectedCell = cell === this.selectedCell ? undefined : cell;

  }
}
