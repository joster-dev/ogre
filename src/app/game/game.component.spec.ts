import { TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { GameStore } from './game.store';

/**
 * The app runs zoneless, so change detection only happens on signal writes and
 * template listener callbacks. These cover both paths through the store.
 */
describe('GameComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameComponent]
    }).compileComponents();
  });

  it('should create', () => {
    expect(TestBed.createComponent(GameComponent).componentInstance).toBeTruthy();
  });

  it('renders both hands, the spare card and the board', async () => {
    const fixture = TestBed.createComponent(GameComponent);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelectorAll('.a-cards ogre-card').length).toBe(2);
    expect(element.querySelectorAll('.b-cards ogre-card').length).toBe(2);
    expect(element.querySelectorAll('.spare-card ogre-card').length).toBe(1);
    expect(element.querySelectorAll('#game > .grid ogre-cell').length).toBe(25);
  });

  it('re-renders after a card is clicked', async () => {
    const fixture = TestBed.createComponent(GameComponent);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;

    const card = element.querySelector<HTMLButtonElement>('.a-cards ogre-card button')!;
    expect(card.classList.contains('is-active')).toBe(false);

    card.click();
    await fixture.whenStable();

    expect(element.querySelector('.a-cards ogre-card button')!.classList.contains('is-active')).toBe(true);
    expect(element.querySelector('#game > .grid')!.classList.contains('active')).toBe(true);
  });

  it('plays a move end to end through the DOM', async () => {
    const fixture = TestBed.createComponent(GameComponent);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    const store = TestBed.inject(GameStore);
    const cellAt = (index: number) =>
      element.querySelectorAll<HTMLButtonElement>('#game > .grid ogre-cell button')[index];

    element.querySelector<HTMLButtonElement>('.a-cards ogre-card button')!.click();
    await fixture.whenStable();

    // The deal is random, so find a pawn the first card can actually move.
    let from = -1;
    let to = -1;
    for (const cell of store.cells().filter(item => item.side === 'a')) {
      cellAt(cell.index).click();
      await fixture.whenStable();
      const target = store.cells().find(item => item.isTarget);
      if (target !== undefined) {
        from = cell.index;
        to = target.index;
        break;
      }
      cellAt(cell.index).click();
      await fixture.whenStable();
    }
    expect(from).toBeGreaterThanOrEqual(0);
    expect(cellAt(to).querySelector('.target-bg')).toBeTruthy();

    cellAt(to).click();
    await fixture.whenStable();

    expect(cellAt(from).querySelector('icon')).toBeNull();
    expect(cellAt(to).querySelector('icon')).toBeTruthy();
    expect(element.querySelector('.b-cards')!.classList.contains('pulse')).toBe(true);
  });

  it('re-renders after a restart triggered outside a DOM listener', async () => {
    const fixture = TestBed.createComponent(GameComponent);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;

    const before = element.querySelector('.spare-card ogre-card button')!.getAttribute('title');
    expect(typeof before).toBe('string');

    // The restart output fires from a debounced observable, not a DOM listener.
    TestBed.inject(GameStore).newGame();
    await fixture.whenStable();

    const after = element.querySelector('.spare-card ogre-card button')!.getAttribute('title');
    expect(after).toBe(TestBed.inject(GameStore).spare().name);
  });
});
