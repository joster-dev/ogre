import { Component, input, output } from '@angular/core';

import { IconComponent, IconStackComponent } from '@joster-dev/icon';

import { Cell } from '../../models';

@Component({
  selector: 'ogre-cell[cell]',
  imports: [IconComponent, IconStackComponent],
  templateUrl: './cell.component.html',
  styleUrl: './cell.component.scss'
})
export class CellComponent {
  readonly cell = input.required<Cell>();

  readonly isActive = input(false);
  readonly isDisabled = input(false);
  readonly isTarget = input(false);

  readonly action = output<void>();
}
