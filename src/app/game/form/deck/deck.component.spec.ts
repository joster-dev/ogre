import { TestBed } from '@angular/core/testing';

import { DECK } from '../../../deck.const';
import { DeckComponent } from './deck.component';

describe('DeckComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeckComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(DeckComponent);
    fixture.componentRef.setInput('model', DECK);
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });
});
