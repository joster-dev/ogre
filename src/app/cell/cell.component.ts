import { Component, Input } from '@angular/core';
import { Cell } from '../cell';

@Component({
  selector: 'ogre-cell[cell]',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent {
  @Input() cell!: Cell;
  // @Input() gameTurn: 'a' | 'b';

  @Input() active = false;
  @Input() disabled = false;
  @Input() isTarget = false;

  constructor() { }

  // get isDisabled() {
  //   return this.isTarget === false && this.cell.occupant !== undefined && this.cell.occupant.side
  // }
}
