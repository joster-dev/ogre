export interface Card {
  name: string;
  icon: string;
  isActive: true | null;
  side?: 'a' | 'b';
  moves: {
    x: number;
    y: number;
  }[];
}
