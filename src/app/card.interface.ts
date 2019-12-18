export interface Card {
  name: string;
  icon: string;
  side?: 'a' | 'b';
  moves: {
    x: number;
    y: number;
  }[];
}
