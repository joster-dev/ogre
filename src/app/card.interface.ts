export interface Card {
  name: string;
  icon: string;
  moves: {
    x: number;
    y: number;
  }[];
}
