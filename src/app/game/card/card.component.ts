import { Component, computed, input, output } from "@angular/core";

import { Card, SIZE, Side } from "../../models";

/** One square of a card's 5x5 move diagram. */
interface Square {
  readonly x: number;
  readonly y: number;
  readonly isActive: boolean;
  readonly isCenter: boolean;
}

const CENTER = Math.floor(SIZE / 2);

/** Pure: a card's move diagram, drawn with the pawn on the centre square. */
function diagram(card: Card): readonly Square[] {
  const active = new Set(
    card.moves.map((move) => `${CENTER - move.x},${CENTER - move.y}`),
  );
  const squares: Square[] = [];
  for (let x = 0; x < SIZE; x++)
    for (let y = 0; y < SIZE; y++)
      squares.push({
        x,
        y,
        isActive: active.has(`${x},${y}`),
        isCenter: x === CENTER && y === CENTER,
      });
  return squares;
}

@Component({
  selector: "ogre-card[card]",
  templateUrl: "./card.component.html",
  styleUrl: "./card.component.scss",
})
export class CardComponent {
  readonly card = input.required<Card>();

  /** Whose hand the card is in; `null` for the spare card, which is drawn upright. */
  readonly side = input<Side | null>(null);
  readonly isDisabled = input(false);
  readonly isActive = input(false);
  readonly isPulse = input(false);

  readonly action = output<void>();

  protected readonly squares = computed(() => diagram(this.card()));
}
