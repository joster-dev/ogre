import { TestBed } from '@angular/core/testing';

import { DECK } from '../../deck.const';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CardComponent);
    fixture.componentRef.setInput('card', DECK[0]);
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should mark a grid cell for every move', () => {
    const fixture = TestBed.createComponent(CardComponent);
    fixture.componentRef.setInput('card', DECK[0]);
    fixture.detectChanges();

    const grid = fixture.componentInstance.grid();
    expect(grid.length).toBe(25);
    expect(grid.filter(cell => cell.isActive).length).toBe(DECK[0].moves.length);
  });
});
