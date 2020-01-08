export interface Card {
  name: string;
  icon: string;
  isActive: boolean;
  side?: 'a' | 'b';
  moves: {
    x: number;
    y: number;
  }[];
}
