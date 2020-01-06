import { Component, Input } from '@angular/core';
import { Card, Cell, Form, Game } from '../models';

@Component({
  selector: 'ogre-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  @Input() isBotEnabled = false;
  @Input() isBotGoFirst = false;

  game = new Game();
  form = new Form();

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

  newGame() {
    this.game = new Game();
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
          this.botPlay();
          return;
        default:
          this.selectedCard = undefined;
          this.selectedCell = undefined;
          this.botPlay();
      }
      return;
    }
    if (cell.occupant !== undefined && cell.occupant.side !== this.game.turn) throw new Error('opponent cell');
    if (cell.occupant === undefined && this.selectCell === undefined) throw new Error('empty cell');
    this.selectedCell = cell === this.selectedCell ? undefined : cell;
  }

  private botPlay() {
    if (this.isBotEnabled === false) return;

    if ((this.isBotGoFirst === true && this.game.turn === 'a') || (this.isBotGoFirst === false && this.game.turn === 'b')) {
      switch (this.game.play(this.game.moves[Math.floor(Math.random() * this.game.moves.length)])) {
        case true:
          alert(`${this.game.turn} wins`);
          this.game = new Game();
          this.botPlay();
          return;
      }
    }
  }
}
