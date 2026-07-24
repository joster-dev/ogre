import { Component, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime } from 'rxjs';

import { ChoiceComponent } from '@joster-dev/chaos-control';

import { Form } from '../../models';
import { DeckComponent } from './deck/deck.component';

@Component({
  selector: 'ogre-form',
  imports: [FormsModule, ChoiceComponent, DeckComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  readonly model = input.required<Form>();

  readonly restart = output<void>();

  readonly priorityItems = [
    { key: true, value: 'First' },
    { key: false, value: 'Second' }
  ];
  readonly enabledItems = [
    { key: true, value: 'On' },
    { key: false, value: 'Off' }
  ];

  private readonly restartSubject = new Subject<void>();

  constructor() {
    this.restartSubject
      .pipe(debounceTime(500), takeUntilDestroyed())
      .subscribe(() => this.restart.emit());
  }

  requestRestart(): void {
    this.restartSubject.next();
  }
}
