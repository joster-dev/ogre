import { Card } from './card.interface';
import { Cell } from './cell';

export interface Move {
  card: Card;
  source: Cell;
  target: Cell;
}
