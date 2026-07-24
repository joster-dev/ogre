import { TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';

describe('GameComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(GameComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should deal five cards, one of them spare', () => {
    const fixture = TestBed.createComponent(GameComponent);
    const component = fixture.componentInstance;

    expect(component.game().cards.length).toBe(5);
    expect(component.aCards.length).toBe(2);
    expect(component.bCards.length).toBe(2);
    expect(component.spareCard).toBeTruthy();
  });
});
