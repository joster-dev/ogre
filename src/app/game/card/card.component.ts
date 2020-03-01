import { Component, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Card } from '../../models';
import { GridCard } from './grid-card';

@Component({
  selector: 'ogre-card[card]',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnChanges {
  @Input() card!: Card;
  @Input() isDisabled = false;
  @Input() isActive = false;

  @Output() action = new EventEmitter();

  grid: GridCard[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.card) {
      this.createGrid();
    }
  }

  private createGrid() {
    this.grid = [];
    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 5; y++) {
        this.grid.push(new GridCard(x, y));
      }
    }
    this.card.moves.forEach(move => {
      const targetCell = this.grid.find(cell => cell.x === 2 - move.x && cell.y === 2 - move.y);
      if (targetCell === undefined) throw new Error('card move is incorrect');
      targetCell.isActive = true;
    });
  }
}
