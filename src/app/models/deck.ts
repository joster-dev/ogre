import { Card } from './card';

/**
 * Every card in the game. Frozen plain data — the deck is never mutated; which
 * cards are in play is a setting (a list of names), not a flag on the card.
 */
export const DECK: readonly Card[] = [
  {
    name: 'Badger',
    icon: '🦡',
    moves: [
      { x: 0, y: 1 },
      { x: 2, y: 1 },
      { x: -1, y: -1 }
    ]
  },
  {
    name: 'Bear',
    icon: '🐻',
    moves: [
      { x: -1, y: 1 },
      { x: 0, y: 1 },
      { x: 1, y: -1 }
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
    name: 'Crab',
    icon: '🦀',
    moves: [
      { x: 0, y: 1 },
      { x: -2, y: 0 },
      { x: 2, y: 0 }
    ]
  },
  {
    name: 'Crocodile',
    icon: '🐊',
    moves: [
      { x: -2, y: 0 },
      { x: -1, y: -1 },
      { x: 1, y: 1 }
    ]
  },
  {
    name: 'Dog',
    icon: '🐕',
    moves: [
      { x: -1, y: 1 },
      { x: -1, y: 0 },
      { x: -1, y: -1 }
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
    name: 'Duck',
    icon: '🦆',
    moves: [
      { x: 0, y: 1 },
      { x: -1, y: -1 },
      { x: 1, y: -1 }
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
    name: 'Fox',
    icon: '🦊',
    moves: [
      { x: 1, y: 1 },
      { x: 1, y: 0 },
      { x: 1, y: -1 }
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
    name: 'Giraffe',
    icon: '🦒',
    moves: [
      { x: -2, y: 1 },
      { x: 2, y: 1 },
      { x: 0, y: -1 }
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
    name: 'Kangaroo',
    icon: '🦘',
    moves: [
      { x: -1, y: 1 },
      { x: 1, y: -1 },
      { x: 2, y: 0 }
    ]
  },
  {
    name: 'Lizard',
    icon: '🦎',
    moves: [
      { x: -2, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: -1 }
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
    name: 'Mouse',
    icon: '🐁',
    moves: [
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: -1, y: -1 }
    ]
  },
  {
    name: 'Octopus',
    icon: '🐙',
    moves: [
      { x: -2, y: 0 },
      { x: -1, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 0 }
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
    name: 'Panda',
    icon: '🐼',
    moves: [
      { x: 0, y: 1 },
      { x: 1, y: 1 },
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
    name: 'Rat',
    icon: '🐀',
    moves: [
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: -1 }
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
    name: 'Shark',
    icon: '🦈',
    moves: [
      { x: 0, y: 1 },
      { x: 2, y: 0 },
      { x: -1, y: -1 }
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
  },
  {
    name: 'Spider',
    icon: '🕷',
    moves: [
      { x: -2, y: 1 },
      { x: 0, y: 1 },
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
    name: 'Tiger',
    icon: '🐅',
    moves: [
      { x: 0, y: 2 },
      { x: 0, y: -1 }
    ]
  },
  {
    name: 'Turtle',
    icon: '🐢',
    moves: [
      { x: -2, y: 0 },
      { x: -1, y: -1 },
      { x: 1, y: -1 },
      { x: 2, y: 0 }
    ]
  },
  {
    name: 'Unicorn',
    icon: '🦄',
    moves: [
      { x: -1, y: 2 },
      { x: 1, y: 2 },
      { x: 0, y: -2 }
    ]
  }
];

/** Card names dealt from by default; the rest are opt-in through the deck settings. */
export const DEFAULT_DECK: readonly string[] = [
  'Badger',
  'Bear',
  'Boar',
  'Crab',
  'Crocodile',
  'Dog',
  'Dolphin',
  'Dragon',
  'Duck',
  'Eagle',
  'Elephant',
  'Fox',
  'Frog',
  'Giraffe',
  'Horse',
  'Kangaroo',
  'Lizard',
  'Monkey',
  'Mouse',
  'Octopus',
  'Ox',
  'Panda',
  'Rabbit',
  'Rat',
  'Rooster',
  'Shark',
  'Snake',
  'Spider',
  'Swan',
  'Tiger',
];

export const cardByName = (name: string): Card | undefined =>
  DECK.find(card => card.name === name);
