import { TestBed } from '@angular/core/testing';

import { Form } from '../../models';
import { FormComponent } from './form.component';

describe('FormComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(FormComponent);
    fixture.componentRef.setInput('model', new Form());
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });
});
