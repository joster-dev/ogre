import { TestBed } from '@angular/core/testing';

import { Cell } from '../../models';
import { CellComponent } from './cell.component';

describe('CellComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CellComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CellComponent);
    fixture.componentRef.setInput('cell', new Cell(0, 0));
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });
});
