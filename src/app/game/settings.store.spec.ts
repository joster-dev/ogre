import { TestBed } from '@angular/core/testing';

import { DEAL_SIZE, DECK } from '../models';
import { SettingsStore, defaultSettings } from './settings.store';

describe('SettingsStore', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('defaults to no bot and a deck of the standard cards', () => {
    const settings = TestBed.inject(SettingsStore);

    expect(settings.botSide()).toBeNull();
    expect(settings.deck().length).toBe(defaultSettings().deck.length);
    expect(settings.deck().length).toBeLessThan(DECK.length);
  });

  it('derives the bot side from enabled + priority', () => {
    const settings = TestBed.inject(SettingsStore);

    settings.botEnabled.set(true);
    expect(settings.botSide()).toBe('b');

    settings.botFirst.set(true);
    expect(settings.botSide()).toBe('a');

    settings.botEnabled.set(false);
    expect(settings.botSide()).toBeNull();
  });

  it('adds and removes cards without mutating DECK', () => {
    const settings = TestBed.inject(SettingsStore);
    const optional = DECK.find(card => !settings.includes(card.name))!;

    settings.setIncluded(optional.name, true);
    expect(settings.includes(optional.name)).toBe(true);
    expect(settings.deck()).toContain(optional);

    settings.setIncluded(optional.name, false);
    expect(settings.includes(optional.name)).toBe(false);
    expect(DECK.length).toBe(32);
  });

  it('refuses to shrink the deck below a dealable size', () => {
    const settings = TestBed.inject(SettingsStore);
    settings.deckNames.set(settings.deckNames().slice(0, DEAL_SIZE));

    expect(settings.canRemove()).toBe(false);
    settings.setIncluded(settings.deckNames()[0], false);
    expect(settings.deckSize()).toBe(DEAL_SIZE);
  });
});
