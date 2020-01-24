import { Component } from '@angular/core';
import { Card, Cell, Form, Game } from '../models';

@Component({
  selector: 'ogre-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  game!: Game;
  form = new Form();

  selectedCard?: Card;
  selectedCell?: Cell;

  constructor() {
    this.newGame();
  }

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
    const deck = JSON.parse(JSON.stringify(this.form.deck.filter(card => card.isActive === true)));
    const cards = [];

    this.shuffle(deck);

    let topCard;

    for (let i = 0; i < 5; i++) {
      topCard = deck.pop();
      if (topCard === undefined) throw new Error('deck built incorrectly');
      topCard.side = i === 0
        ? undefined
        : i % 2 === 0
          ? 'a' : 'b';
      cards.push(topCard);
    }
    this.game = new Game(this.createGrid(), cards);
    this.botPlay();
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
          this.newGame();
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
    if (this.form.isBotEnabled === false) return;

    if ((this.form.isBotFirst === true && this.game.turn === 'a') || (this.form.isBotFirst === false && this.game.turn === 'b')) {
      switch (this.game.play(this.game.moves[Math.floor(Math.random() * this.game.moves.length)])) {
        case true:
          alert(`${this.game.turn} wins`);
          this.newGame();
          return;
      }
    }
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
