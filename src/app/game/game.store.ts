import { Injectable, computed, inject, signal } from '@angular/core';
import {
  Card, GameState, Side, botMove, legalMoves, newGame, play, templeAt, xOf, yOf,
} from '../models';
import { SettingsStore } from './settings.store';

const BOT_THINK_MS = 400;
const END_GAME_PAUSE_MS = 2500;

const delay = (ms: number) => new Promise<void>(resolve => window.setTimeout(() => resolve(), ms));

/** One square, ready to render. All primitives, so cells can be tracked by index. */
export interface CellView {
  readonly index: number;
  readonly side: Side | null;
  readonly isMain: boolean;
  readonly temple: Side | null;
  readonly column: number;
  readonly row: number;
  readonly isAccent: boolean;
  readonly isActive: boolean;
  readonly isTarget: boolean;
  readonly isDisabled: boolean;
}

/** One card in a hand, ready to render. */
export interface CardView {
  readonly card: Card;
  readonly index: number;
  readonly isActive: boolean;
  readonly isDisabled: boolean;
}

/**
 * Owns the live game and the current selection, and orchestrates turns. The game
 * is a single signal of the immutable core `GameState`; every transition is
 * `signal.set(play(...))`, so the whole board re-renders reactively under zoneless
 * change detection. Selections are plain indices, never object references. All
 * async work (the bot's pause, the end-of-game pause) happens here, never in the core.
 */
@Injectable({ providedIn: 'root' })
export class GameStore {
  private readonly settings = inject(SettingsStore);

  private readonly state = signal<GameState>(newGame(this.settings.deck()));

  /** Index into the current side's hand, or `null` when nothing is picked. */
  private readonly selectedCard = signal<number | null>(null);
  /** Board index of the pawn to move, or `null`. */
  private readonly selectedCell = signal<number | null>(null);

  /** Blocks input while the bot is thinking or during the end-of-game pause. */
  readonly busy = signal(false);

  readonly turn = computed(() => this.state().turn);
  readonly outcome = computed(() => this.state().outcome);
  readonly spare = computed(() => this.state().spare);
  readonly hasSelectedCard = computed(() => this.selectedCard() !== null);

  private readonly moves = computed(() => legalMoves(this.state()));

  /** Board indices the current selection can reach. */
  private readonly targets = computed(() => {
    const card = this.selectedCard();
    const from = this.selectedCell();
    return new Set(this.moves()
      .filter(move => card === null || move.card === card)
      .filter(move => from === null || move.from === from)
      .map(move => move.to));
  });

  readonly cells = computed<readonly CellView[]>(() => {
    const { board, turn } = this.state();
    const selectedCell = this.selectedCell();
    const targets = this.targets();
    const busy = this.busy();

    return board.map((pawn, index) => ({
      index,
      side: pawn?.side ?? null,
      isMain: pawn?.isMain === true,
      temple: templeAt(index),
      column: xOf(index) + 1,
      row: yOf(index) + 1,
      isAccent: (xOf(index) + yOf(index)) % 2 === 0,
      isActive: index === selectedCell,
      isTarget: targets.has(index),
      isDisabled: busy || (this.hasSelectedCard() && selectedCell !== null && selectedCell !== index
        ? !targets.has(index)
        : pawn === null || pawn.side !== turn),
    }));
  });

  readonly hands = computed<Readonly<Record<Side, readonly CardView[]>>>(() => {
    const { hands, turn } = this.state();
    const selected = this.selectedCard();
    const view = (side: Side): readonly CardView[] => hands[side].map((card, index) => ({
      card,
      index,
      isActive: side === turn && index === selected,
      isDisabled: this.busy() || side !== turn,
    }));
    return { a: view('a'), b: view('b') };
  });

  constructor() {
    this.newGame();
  }

  selectCard(index: number): void {
    if (this.busy())
      return;
    this.selectedCard.update(selected => (selected === index ? null : index));
  }

  async selectCell(index: number): Promise<void> {
    if (this.busy())
      return;

    const card = this.selectedCard();
    const from = this.selectedCell();
    if (card !== null && from !== null && this.targets().has(index)) {
      this.clearSelection();
      this.state.set(play(this.state(), { card, from, to: index }));
      await this.advance();
      return;
    }

    this.selectedCell.set(index === from ? null : index);
  }

  newGame(): void {
    this.clearSelection();
    this.state.set(newGame(this.settings.deck()));
    void this.advance();
  }

  private clearSelection(): void {
    this.selectedCard.set(null);
    this.selectedCell.set(null);
  }

  /** Plays out the bot's turns, then settles a finished game. */
  private async advance(): Promise<void> {
    while (this.state().outcome.kind === 'playing' && this.settings.botSide() === this.turn()) {
      this.busy.set(true);
      await delay(BOT_THINK_MS);
      const move = botMove(this.state());
      if (move === null)
        break;
      this.state.set(play(this.state(), move));
    }
    this.busy.set(false);
    await this.settle();
  }

  private async settle(): Promise<void> {
    if (this.outcome().kind === 'playing')
      return;
    this.busy.set(true);
    await delay(END_GAME_PAUSE_MS);
    this.busy.set(false);
    this.newGame();
  }
}
