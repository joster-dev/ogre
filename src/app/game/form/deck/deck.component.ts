import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Card } from 'src/app/models';

@Component({
  selector: 'ogre-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent {
  @Input() model: Card[] = [];

  @Output() changeCardIsActive = new EventEmitter();

  constructor() { }

  get countActiveCards() {
    return this.model.filter(card => card.isActive === true).length;
  }

  changeCard(card: Card, isActive: true | null) {
    if (this.countActiveCards <= 5) return;
    card.isActive = isActive;
    this.changeCardIsActive.emit();
  }
}
