import { Card } from './models';

export const DECK: Card[] = [
  {
    name: 'Tiger',
    icon: '🐅',
    moves: [
      { x: 0, y: 2 },
      { x: 0, y: -1 }
    ]
  },
  {
    name: 'Crab',
    icon: '🦀',
    moves: [
      { x: 0, y: 1 },
      { x: -2, y: 0 },
      { x: 2, y: 0 }
    ]
  },
  {
    name: 'Monkey',
    icon: '🐒',
    moves: [
      { x: -1, y: 1 },
      { x: 1, y: 1 },
      { x: -1, y: -1 },
      { x: 1, y: -1 }
    ]
  },
  {
    name: 'Duck',
    icon: '🦆',
    moves: [
      { x: 0, y: 1 },
      { x: -1, y: -1 },
      { x: 1, y: -1 }
    ]
  },
  {
    name: 'Dragon',
    icon: '🐉',
    moves: [
      { x: -2, y: 1 },
      { x: 2, y: 1 },
      { x: -1, y: -1 },
      { x: 1, y: -1 }
    ]
  },
  {
    name: 'Elephant',
    icon: '🐘',
    moves: [
      { x: -1, y: 1 },
      { x: 1, y: 1 },
      { x: -1, y: 0 },
      { x: 1, y: 0 }
    ]
  },
  {
    name: 'Eagle',
    icon: '🦅',
    moves: [
      { x: -1, y: 1 },
      { x: 1, y: 1 },
      { x: 0, y: -1 }
    ]
  },
  {
    name: 'Boar',
    icon: '🐗',
    moves: [
      { x: 0, y: 1 },
      { x: -1, y: 0 },
      { x: 1, y: 0 }
    ]
  },
  {
    name: 'Frog',
    icon: '🐸',
    moves: [
      { x: -2, y: 0 },
      { x: -1, y: 1 },
      { x: 1, y: -1 }
    ]
  },
  {
    name: 'Swan',
    icon: '🦢',
    moves: [
      { x: -1, y: 1 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: -1 }
    ]
  },
  {
    name: 'Horse',
    icon: '🐎',
    moves: [
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 }
    ]
  },
  {
    name: 'Dolphin',
    icon: '🐬',
    moves: [
      { x: -1, y: 1 },
      { x: 1, y: 0 },
      { x: -1, y: -1 }
    ]
  },
  {
    name: 'Rabbit',
    icon: '🐇',
    moves: [
      { x: -1, y: -1 },
      { x: 1, y: 1 },
      { x: 2, y: 0 }
    ]
  },
  {
    name: 'Rooster',
    icon: '🐓',
    moves: [
      { x: -1, y: 0 },
      { x: -1, y: -1 },
      { x: 1, y: 1 },
      { x: 1, y: 0 }
    ]
  },
  {
    name: 'Ox',
    icon: '🐂',
    moves: [
      { x: 0, y: 1 },
      { x: 0, y: -1 },
      { x: 1, y: 0 }
    ]
  },
  {
    name: 'Snake',
    icon: '🐍',
    moves: [
      { x: -1, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: -1 }
    ]
  }
];
