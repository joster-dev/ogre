import { Component, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

import { IconComponent } from '@joster-dev/icon';

import { Card, Cell, Form, Game } from '../models';
import { CardComponent } from './card/card.component';
import { CellComponent } from './cell/cell.component';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'ogre-game',
  imports: [NgTemplateOutlet, IconComponent, CardComponent, CellComponent, FormComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  readonly form = new Form();

  readonly game = signal(this.createGame());
  readonly selectedCard = signal<Card | undefined>(undefined);
  readonly selectedCell = signal<Cell | undefined>(undefined);

  get aCards() {
    return this.game().cards.filter(card => card.side === 'a');
  }

  get bCards() {
    return this.game().cards.filter(card => card.side === 'b');
  }

  get spareCard() {
    return this.game().cards.find(card => card.side === undefined);
  }

  get targetCells() {
    const selectedCard = this.selectedCard();
    const selectedCell = this.selectedCell();
    return this.game().moves
      .filter(move => selectedCard === undefined || move.card === selectedCard)
      .filter(move => selectedCell === undefined || move.source === selectedCell)
      .map(move => move.target);
  }

  isCellDisabled(cell: Cell): boolean {
    const selectedCell = this.selectedCell();
    if (this.selectedCard() !== undefined && selectedCell !== undefined && selectedCell !== cell) {
      return this.targetCells.includes(cell) === false;
    }

    return cell.occupant === undefined || cell.occupant.side !== this.game().turn;
  }

  newGame() {
    this.game.set(this.createGame());
  }

  selectCard(card: Card): void {
    this.selectedCard.update(selected => card === selected ? undefined : card);
  }

  selectCell(cell: Cell): void {
    const game = this.game();
    const selectedCard = this.selectedCard();
    const selectedCell = this.selectedCell();

    if (selectedCard !== undefined && selectedCell !== undefined && this.targetCells.includes(cell) === true) {
      const isWon = game.play({
        card: selectedCard,
        source: selectedCell,
        target: cell
      });
      this.selectedCard.set(undefined);
      this.selectedCell.set(undefined);
      if (isWon === true) {
        alert(`${game.turn} wins`);
        this.newGame();
        return;
      }
      if (this.botPlay(game) === true) {
        this.newGame();
      }
      return;
    }

    this.selectedCell.set(cell === selectedCell ? undefined : cell);
  }

  private createGame(): Game {
    const deck: Card[] = JSON.parse(JSON.stringify(this.form.deck.filter(card => card.isActive === true)));
    const cards: Card[] = [];

    this.shuffle(deck);

    for (let i = 0; i < 5; i++) {
      const topCard = deck.pop();
      if (topCard === undefined) throw new Error('deck built incorrectly');
      topCard.side = i === 0
        ? undefined
        : i % 2 === 0
          ? 'a' : 'b';
      cards.push(topCard);
    }

    const game = new Game(this.createGrid(), cards);

    return this.botPlay(game) === true ? this.createGame() : game;
  }

  /** Plays the bot's turn when it is the bot's move. Returns `true` when the bot won. */
  private botPlay(game: Game): boolean {
    if (!this.form.isBotEnabled) return false;

    if ((this.form.isBotFirst === true && game.turn === 'a') || (!this.form.isBotFirst && game.turn === 'b')) {
      if (game.play(game.moves[Math.floor(Math.random() * game.moves.length)]) === true) {
        alert(`${game.turn} wins`);
        return true;
      }
    }

    return false;
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

  private shuffle(array: Card[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
