import { Component, OnInit, EventEmitter, Input, Output, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Form } from 'src/app/models';

@Component({
  selector: 'ogre-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {
  @Input() model!: Form;

  @Output() restart = new EventEmitter();

  restartSubject = new Subject();
  activeItems = [
    { key: true, value: 'Enabled' },
    { key: false, value: 'Disabled' }
  ];
  orderItems = [
    { key: true, value: 'First' },
    { key: false, value: 'Last' }
  ];

  constructor() { }

  ngOnInit() {
    this.restartSubject
      .pipe(debounceTime(500))
      .subscribe(() => this.restart.emit());
  }

  ngOnDestroy() {
    this.restartSubject.complete();
  }
}
