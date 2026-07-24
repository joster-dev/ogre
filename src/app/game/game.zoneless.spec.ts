import { TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';

/**
 * The app runs zoneless, so change detection only happens on signal writes and
 * template listener callbacks. These cover the two paths the game depends on.
 */
describe('GameComponent change detection', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameComponent]
    }).compileComponents();
  });

  it('should re-render after a card is clicked', async () => {
    const fixture = TestBed.createComponent(GameComponent);
    await fixture.whenStable();

    const element = fixture.nativeElement as HTMLElement;
    const card = element.querySelector<HTMLButtonElement>('.a-cards ogre-card button');
    expect(card).toBeTruthy();
    expect(card!.classList.contains('is-active')).toBe(false);

    card!.click();
    await fixture.whenStable();

    expect(fixture.componentInstance.selectedCard()).toBeTruthy();
    expect(element.querySelector('.a-cards ogre-card button')!.classList.contains('is-active')).toBe(true);
    expect(element.querySelector('#game > .grid')!.classList.contains('active')).toBe(true);
  });

  it('should re-render after the game is restarted outside a listener', async () => {
    const fixture = TestBed.createComponent(GameComponent);
    await fixture.whenStable();

    const element = fixture.nativeElement as HTMLElement;
    const before = element.querySelector('.spare-card ogre-card button')!.getAttribute('title');

    // The restart output fires from a debounced observable, not a DOM listener.
    fixture.componentInstance.newGame();
    await fixture.whenStable();

    const after = element.querySelector('.spare-card ogre-card button')!.getAttribute('title');
    expect(after).toBe(fixture.componentInstance.spareCard!.name);
    expect(typeof before).toBe('string');
  });
});
