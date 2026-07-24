import { Component, computed, input, output } from '@angular/core';

import { Card } from '../../models';
import { GridCard } from './grid-card';

@Component({
  selector: 'ogre-card[card]',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  readonly card = input.required<Card>();
  readonly isDisabled = input(false);
  readonly isActive = input(false);

  readonly action = output<void>();

  readonly grid = computed(() => {
    const grid: GridCard[] = [];
    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 5; y++) {
        grid.push(new GridCard(x, y));
      }
    }
    this.card().moves.forEach(move => {
      const targetCell = grid.find(cell => cell.x === 2 - move.x && cell.y === 2 - move.y);
      if (targetCell === undefined) throw new Error('card move is incorrect');
      targetCell.isActive = true;
    });
    return grid;
  });
}
