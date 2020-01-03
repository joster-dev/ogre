import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardComponent } from './card/card.component';
import { CellComponent } from './cell/cell.component';
import { GameComponent } from './game.component';

@NgModule({
  declarations: [
    CardComponent,
    CellComponent,
    GameComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GameComponent
  ]
})
export class GameModule { }
