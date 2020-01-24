import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Cell } from '../../models';

@Component({
  selector: 'ogre-cell[cell]',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent {
  @Input() cell!: Cell;

  @Input() active = false;
  @Input() disabled = false;
  @Input() isTarget = false;

  @Output() action = new EventEmitter();

  constructor() { }
}
