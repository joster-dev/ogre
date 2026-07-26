import { Injectable, computed, signal } from '@angular/core';
import { Card, DECK, DEFAULT_DECK, DEAL_SIZE, Side } from '../models';

/** Plain, serialisable snapshot of all game settings. */
export interface Settings {
  botEnabled: boolean;
  botFirst: boolean;
  /** Names of the cards the deal draws from. */
  deck: readonly string[];
}

export const defaultSettings = (): Settings => ({
  botEnabled: false,
  botFirst: false,
  deck: DEFAULT_DECK,
});

/**
 * UI/game settings as signals. Lives in the Angular layer, not the framework-free
 * core, and holds card *names* rather than card objects — so nothing here can
 * mutate `DECK`. `snapshot()`/`restore()` bridge to a plain `Settings`.
 */
@Injectable({ providedIn: 'root' })
export class SettingsStore {
  private readonly defaults = defaultSettings();

  readonly botEnabled = signal(this.defaults.botEnabled);
  readonly botFirst = signal(this.defaults.botFirst);
  readonly deckNames = signal(this.defaults.deck);

  /** Which side the bot plays, or `null` when it is off. */
  readonly botSide = computed<Side | null>(() =>
    this.botEnabled() ? (this.botFirst() ? 'a' : 'b') : null);

  /** The cards a new game deals from. */
  readonly deck = computed<readonly Card[]>(() => {
    const names = new Set(this.deckNames());
    return DECK.filter(card => names.has(card.name));
  });

  readonly deckSize = computed(() => this.deckNames().length);

  /** The deal needs five cards, so the last five can not be removed. */
  readonly canRemove = computed(() => this.deckSize() > DEAL_SIZE);

  includes(name: string): boolean {
    return this.deckNames().includes(name);
  }

  setIncluded(name: string, included: boolean): void {
    if (included === this.includes(name) || (!included && !this.canRemove()))
      return;
    this.deckNames.update(names => included
      ? [...names, name]
      : names.filter(item => item !== name));
  }

  snapshot(): Settings {
    return {
      botEnabled: this.botEnabled(),
      botFirst: this.botFirst(),
      deck: this.deckNames(),
    };
  }

  restore(settings: Settings): void {
    this.botEnabled.set(settings.botEnabled);
    this.botFirst.set(settings.botFirst);
    this.deckNames.set(settings.deck);
  }
}
