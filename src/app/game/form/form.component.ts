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
  priorityItems = [
    { key: true, value: 'First' },
    { key: false, value: 'Second' }
  ];
  enabledItems = [
    { key: true, value: 'On' },
    { key: false, value: 'Off' }
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
