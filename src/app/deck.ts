import { Card } from './card.interface';

export const DECK: Card[] = [
  {
    name: 'Tiger',
    moves: [
      { x: 0, y: 2 },
      { x: 0, y: -1 }
    ]
  },
  {
    name: 'Crab',
    moves: [
      { x: 0, y: 1 },
      { x: -2, y: 0 },
      { x: 2, y: 0 }
    ]
  },
  {
    name: 'Monkey',
    moves: [
      { x: -1, y: 1 },
      { x: 1, y: 1 },
      { x: -1, y: -1 },
      { x: 1, y: -1 }
    ]
  },
  {
    name: 'Crane',
    moves: [
      { x: 0, y: 1 },
      { x: -1, y: -1 },
      { x: 1, y: -1 }
    ]
  },
  {
    name: 'Dragon',
    moves: [
      { x: -2, y: 1 },
      { x: 2, y: 1 },
      { x: -1, y: -1 },
      { x: 1, y: -1 }
    ]
  },
  {
    name: 'Elephant',
    moves: [
      { x: -1, y: 1 },
      { x: 1, y: 1 },
      { x: -1, y: 0 },
      { x: 1, y: 0 }
    ]
  },
  {
    name: 'Mantis',
    moves: [
      { x: -1, y: 1 },
      { x: 1, y: 1 },
      { x: 0, y: -1 }
    ]
  },
  {
    name: 'Boar',
    moves: [
      { x: 0, y: 1 },
      { x: -1, y: 0 },
      { x: 1, y: 0 }
    ]
  },
  {
    name: 'Frog',
    moves: [
      { x: -2, y: 0 },
      { x: -1, y: 1 },
      { x: 1, y: -1 }
    ]
  },
  {
    name: 'Goose',
    moves: [
      { x: -1, y: 1 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: -1 }
    ]
  },
  {
    name: 'Horse',
    moves: [
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 }
    ]
  },
  {
    name: 'Eel',
    moves: [
      { x: -1, y: 1 },
      { x: 1, y: 0 },
      { x: -1, y: -1 }
    ]
  },
  {
    name: 'Rabbit',
    moves: [
      { x: -1, y: -1 },
      { x: 1, y: 1 },
      { x: 2, y: 0 }
    ]
  },
  {
    name: 'Rooster',
    moves: [
      { x: -1, y: 0 },
      { x: -1, y: -1 },
      { x: 1, y: 1 },
      { x: 1, y: 0 }
    ]
  },
  {
    name: 'Ox',
    moves: [
      { x: 0, y: 1 },
      { x: 0, y: -1 },
      { x: 1, y: 0 }
    ]
  },
  {
    name: 'Cobra',
    moves: [
      { x: -1, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: -1 }
    ]
  }
];
