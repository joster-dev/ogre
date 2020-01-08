import { Component, Input } from '@angular/core';

import { Card } from 'src/app/models';

@Component({
  selector: 'ogre-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent {
  @Input() model: Card[] = [];

  constructor() { }
}
