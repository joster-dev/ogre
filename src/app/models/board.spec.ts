import { SIZE, indexOf, initialBoard, orient, other, shuffle, templeAt, xOf, yOf } from './index';

describe('board', () => {
  it('round-trips indices through coordinates', () => {
    for (let index = 0; index < SIZE * SIZE; index++)
      expect(indexOf(xOf(index), yOf(index))).toBe(index);
  });

  it('marks exactly the two temples', () => {
    const temples = initialBoard().map((_, index) => templeAt(index)).filter(side => side !== null);
    expect(temples).toEqual(['a', 'b']);
  });

  it('flips sides', () => {
    expect(other('a')).toBe('b');
    expect(other('b')).toBe('a');
  });
});

describe('card', () => {
  it('orients a card a quarter turn each way per side', () => {
    const move = { x: 0, y: 1 };
    expect(orient(move, 'a')).toEqual({ x: 1, y: 0 });
    expect(orient(move, 'b')).toEqual({ x: -1, y: 0 });
  });

  it('shuffles into a new array without touching the input', () => {
    const items = [1, 2, 3, 4, 5];
    const shuffled = shuffle(items, () => 0.99);

    expect(items).toEqual([1, 2, 3, 4, 5]);
    expect(shuffled).not.toBe(items);
    expect([...shuffled].sort()).toEqual(items);
  });
});
