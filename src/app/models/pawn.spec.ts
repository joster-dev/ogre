import { Pawn } from './pawn';

describe('Pawn', () => {
  it('should create an instance', () => {
    expect(new Pawn('a')).toBeTruthy();
  });

  it('should not be the main pawn by default', () => {
    expect(new Pawn('a').isMain).toBe(false);
  });
});
