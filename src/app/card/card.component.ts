import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Card } from '../card.interface';


@Component({
  selector: 'ogre-card[card]',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnChanges {
  @Input() card!: Card;

  grid: GridCard[] = [];

  constructor() { }

  ngOnChanges() {
    this.createGrid();
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
      if (targetCell === undefined) {
        throw new Error('card move is incorrect');
      }
      targetCell.isActive = true;
    });
  }

}


class GridCard {
  isActive = false;

  constructor(public readonly x: number, public readonly y: number) { }

  get isCenter() {
    return this.x === 2 && this.y === 2;
  }
}
