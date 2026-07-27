import { Component, input, output } from "@angular/core";

import { IconComponent } from "@joster-dev/icon";

import { Side } from "../../models";

@Component({
  selector: "ogre-cell",
  imports: [IconComponent],
  templateUrl: "./cell.component.html",
  styleUrl: "./cell.component.scss",
})
export class CellComponent {
  /** The occupying pawn's side, or `null` when the square is empty. */
  readonly side = input<Side | null>(null);
  readonly isMain = input(false);
  /** The side whose temple this is, or `null`. */
  readonly temple = input<Side | null>(null);

  readonly isActive = input(false);
  readonly isDisabled = input(false);
  readonly isTarget = input(false);

  readonly action = output<void>();
}
