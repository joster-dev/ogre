import { TestBed } from '@angular/core/testing';

import { DEAL_SIZE } from '../models';
import { GameStore } from './game.store';
import { SettingsStore } from './settings.store';

/**
 * Drives the store the way the UI does — pick a card, then a pawn — until it
 * finds a pawn that card can actually move. The deal is random, so no single
 * pawn is guaranteed a move; this leaves that pawn selected and returns the move.
 */
async function selectPlayableMove(store: GameStore, card = 0): Promise<{ from: number; to: number }> {
  store.selectCard(card);
  for (const cell of store.cells().filter(item => item.side === store.turn())) {
    await store.selectCell(cell.index);
    const target = store.cells().find(item => item.isTarget);
    if (target !== undefined)
      return { from: cell.index, to: target.index };
    await store.selectCell(cell.index); // nothing reachable — deselect, try the next pawn
  }
  throw new Error('no playable move for that card');
}

describe('GameStore', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    expect(TestBed.inject(GameStore)).toBeTruthy();
  });

  it('deals two hands and a spare', () => {
    const store = TestBed.inject(GameStore);

    expect(store.hands().a.length).toBe(2);
    expect(store.hands().b.length).toBe(2);
    expect(store.spare()).toBeTruthy();
    expect(store.turn()).toBe('a');
  });

  it('starts with 25 cells and only side a playable', () => {
    const store = TestBed.inject(GameStore);
    const cells = store.cells();

    expect(cells.length).toBe(25);
    expect(cells.filter(cell => !cell.isDisabled).every(cell => cell.side === 'a')).toBe(true);
    expect(cells.filter(cell => cell.temple !== null).length).toBe(2);
  });

  it('selecting a card then a pawn reveals targets', async () => {
    const store = TestBed.inject(GameStore);

    const { from } = await selectPlayableMove(store);

    expect(store.hasSelectedCard()).toBe(true);
    expect(store.hands().a[0].isActive).toBe(true);
    expect(store.cells()[from].isActive).toBe(true);
    expect(store.cells().some(cell => cell.isTarget)).toBe(true);
    // With both a card and a pawn picked, only the targets stay clickable.
    expect(store.cells().filter(cell => !cell.isDisabled).every(cell =>
      cell.isTarget || cell.index === from)).toBe(true);
  });

  it('moves a pawn, swaps the card and passes the turn', async () => {
    const store = TestBed.inject(GameStore);
    const played = store.hands().a[0].card;
    const spare = store.spare();

    const { from, to } = await selectPlayableMove(store);
    await store.selectCell(to);

    expect(store.cells()[from].side).toBeNull();
    expect(store.cells()[to].side).toBe('a');
    expect(store.turn()).toBe('b');
    expect(store.spare()).toBe(played);
    expect(store.hands().a[0].card).toBe(spare);
    expect(store.hasSelectedCard()).toBe(false);
  });

  it('lets the bot answer a human move', async () => {
    const settings = TestBed.inject(SettingsStore);
    settings.botEnabled.set(true);           // bot plays b; the human (a) opens
    const store = TestBed.inject(GameStore);
    store.newGame();

    const { to } = await selectPlayableMove(store);
    await store.selectCell(to);              // human move, then the bot replies

    expect(store.turn()).toBe('a');
    expect(store.busy()).toBe(false);
    expect(store.cells().filter(cell => cell.side === 'a').length).toBe(5);
    expect(store.cells().filter(cell => cell.side === 'b').length).toBe(5);
  });

  it('deals only from the cards enabled in settings', () => {
    const settings = TestBed.inject(SettingsStore);
    const five = settings.deckNames().slice(0, DEAL_SIZE);
    settings.deckNames.set(five);

    const store = TestBed.inject(GameStore);
    store.newGame();

    const dealt = [store.spare(), ...store.hands().a.map(item => item.card), ...store.hands().b.map(item => item.card)];
    expect(dealt.map(card => card.name).sort()).toEqual([...five].sort());
  });
});
