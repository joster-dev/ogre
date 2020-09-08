import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FormControlModule } from '@joster-dev/form-control';

import { FormComponent } from './form.component';
import { DeckComponent } from './deck/deck.component';
import { CardComponent } from '../card/card.component';

@NgModule({
  declarations: [
    FormComponent,
    DeckComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    FormControlModule,
    FormsModule
  ],
  exports: [
    FormComponent,
    CardComponent
  ]
})
export class FormModule { }
