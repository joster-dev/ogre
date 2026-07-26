import { Component, computed, inject } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

import { IconComponent } from '@joster-dev/icon';

import { CardComponent } from './card/card.component';
import { CellComponent } from './cell/cell.component';
import { FormComponent } from './form/form.component';
import { GameStore } from './game.store';

@Component({
  selector: 'ogre-game',
  imports: [NgTemplateOutlet, IconComponent, CardComponent, CellComponent, FormComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  protected readonly store = inject(GameStore);

  protected readonly banner = computed(() => {
    const outcome = this.store.outcome();
    return outcome.kind === 'win'
      ? `🏆 ${outcome.side} wins by ${outcome.by}`
      : null;
  });
}
