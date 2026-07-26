import { Component, computed, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ChoiceComponent } from '@joster-dev/chaos-control';

import { DECK } from '../../../models';
import { SettingsStore } from '../../settings.store';
import { CardComponent } from '../../card/card.component';

@Component({
  selector: 'ogre-deck',
  imports: [FormsModule, ChoiceComponent, CardComponent],
  templateUrl: './deck.component.html',
  styleUrl: './deck.component.scss'
})
export class DeckComponent {
  private readonly settings = inject(SettingsStore);

  readonly changeCardIsActive = output<void>();

  protected readonly includedItems = [{ key: true, value: 'Included' }];

  /** `cc-choice` with a single item models "on" as `true` and "off" as `null`. */
  protected readonly cards = computed(() => DECK.map(card => {
    const included = this.settings.includes(card.name);
    return {
      card,
      included: included ? true : null,
      isLocked: included && !this.settings.canRemove(),
    };
  }));

  protected setIncluded(name: string, value: true | null): void {
    this.settings.setIncluded(name, value === true);
    this.changeCardIsActive.emit();
  }
}
