export class GridCard {
  isActive = false;

  constructor(public readonly x: number, public readonly y: number) { }

  get isCenter() {
    return this.x === 2 && this.y === 2;
  }
}
