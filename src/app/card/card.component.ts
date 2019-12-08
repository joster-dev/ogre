import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../card.interface';

@Component({
  selector: 'ogre-card[card]',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card!: Card;

  grid: { x: number; y: number, isActive: boolean }[] = [];

  constructor() {
    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 5; y++) {
        this.grid.push({ x, y, isActive: x === 2 && y === 2 });
      }
    }
  }

  ngOnInit() {
  }

}
