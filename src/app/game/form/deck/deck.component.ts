import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ChoiceComponent } from '@joster-dev/chaos-control';

import { Card } from '../../../models';
import { CardComponent } from '../../card/card.component';

@Component({
  selector: 'ogre-deck',
  imports: [FormsModule, ChoiceComponent, CardComponent],
  templateUrl: './deck.component.html',
  styleUrl: './deck.component.scss'
})
export class DeckComponent {
  readonly model = input<Card[]>([]);

  readonly changeCardIsActive = output<void>();

  readonly includedItems = [{ key: true, value: 'Included' }];

  get countActiveCards() {
    return this.model().filter(card => card.isActive === true).length;
  }

  changeCard(card: Card, isActive: true | null) {
    if (this.countActiveCards <= 5) return;
    card.isActive = isActive;
    this.changeCardIsActive.emit();
  }
}
