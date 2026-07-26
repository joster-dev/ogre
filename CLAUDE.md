# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `ng serve` — dev server at http://localhost:4200/
- `ng build` — production build; output goes to `dist/`
- `npm run pages` — build with the GitHub Pages base href
- `ng test` — run unit tests once via Vitest (`@angular/build:unit-test` builder, jsdom environment). Add `--watch` for watch mode
- `ng test --include='**/game-state.spec.ts'` — run a single spec file
- `ng generate component game/foo` — scaffold (SCSS styles, `ogre` selector prefix are defaults)

## Architecture

A client-only Angular 22 PWA of Onitama-style card chess. Standalone components (no NgModules), bootstrapped in `src/main.ts` via `app.config.ts`. No router and no backend — all state lives in memory.

### Two layers: pure functional core vs. reactive Angular shell

`src/app/models/` is plain TypeScript with **no Angular imports** — re-exported through `models/index.ts`. It is a **pure, immutable** core: data + functions, no classes-with-behaviour, no mutation, no serialization tricks. This is the whole game domain and is independently unit-tested:

- `board.ts` — `Side` (`'a'|'b'`), `Pawn` (`{side, isMain}`), `Cell` (`Pawn | null`), `Board` (length-25 readonly array, index `i` ↔ `(x = i % 5, y = i / 5)`), `TEMPLES`/`templeAt`, `initialBoard()`. Side `a` fills the left column, `b` the right, each main pawn on its own temple.
- `card.ts` — `Card` (`{name, icon, moves}`), `Offset`, and `orient(move, side)`, which turns a card-space offset into a board-space `(dx, dy)`. The two sides face each other, so the same card reads as a quarter turn each way — that is why the UI draws it rotated 90deg/270deg. Also `shuffle` and the `Rng` type.
- `deck.ts` — all 32 `Card`s as frozen data, plus `DEFAULT_DECK` (the 30 dealt from by default). **Never mutated**: which cards are in play is a setting holding *names*, not a flag on the card.
- `game-state.ts` — immutable `GameState` (`{board, hands, spare, turn, outcome}`) where `Outcome` is `playing | {win, side, by: 'capture'|'temple'}`. `newGame(deck, rng)`, `legalMoves(state)` and `play(state, move)` return **new** states. A `Move` is `{card, from, to}` — all indices, so moves compare by value. Plain data → structured-cloneable and directly persistable.
- `bot.ts` — `botMove(state, rng)`: a uniform random legal move, pure and synchronous. Swapping in a search would not touch the Angular layer.

Randomness enters only through an explicit `Rng = () => number` parameter defaulting to `Math.random`, so any deal, game, or bot can be made deterministic in tests.

The Angular layer (`src/app/game/`) is a reactive shell of signals/computed/effect over that core:

- `GameStore` (root service) owns `signal<GameState>` plus the current selection; every transition is `state.set(play(...))`, so the whole board re-renders. Selections are **plain indices** (`selectedCard` into the current hand, `selectedCell` into the board), never object references. Exposes `cells`/`hands` computeds of ready-to-render view models, `turn`/`outcome`/`spare`, and `busy`. The bot loop and the 2.5s end-game pause + auto-restart live here.
- `SettingsStore` holds each setting as a signal plus `snapshot()`/`restore()` to a plain `Settings`. `botSide` derives `'a' | 'b' | null` from enabled + priority; `deck` derives the live `Card[]` from a list of names. Refuses to shrink the deck below the five cards a deal needs.
- `GameComponent` is a thin view over `GameStore`; `CellComponent` and `CardComponent` take only primitives (`side`, `isMain`, `temple`, `isTarget`, …) so `@for` can track by `$index`.

### Change detection

This app is **zoneless** (`provideZonelessChangeDetection`); zone.js is not in `angular.json` polyfills or `package.json`. Because the core is immutable and all live state is signals/computed, zoneless "just works": a move is one `signal.set` of a new `GameState`, cells take primitive inputs, and the only async (bot pause, end-game pause) resolves in macrotasks. `game.component.spec.ts` covers both CD paths — a DOM listener click and a `newGame()` written outside any listener — but still verify CD changes interactively, not just with `ng build`.

## Conventions

- Strict TypeScript is on, including `strictTemplates`, `noPropertyAccessFromIndexSignature`, and `strictInjectionParameters`. Use `inject()` over constructor injection (matches existing code).
- Keep game logic inside `src/app/models/` pure and free of Angular imports so it stays unit-testable in isolation. All mutation/reactivity/async belongs in the `src/app/game/` shell.
- Tests run on **Vitest** (jsdom env). `describe`/`it`/`expect` are configured as globals by the builder (typed via `vitest/globals` in `tsconfig.spec.json`), so specs don't import them.
- External UI comes from `@joster-dev/icon` and `@joster-dev/chaos-control`. The chaos-control standalone components use `cc-*` selectors (e.g. `cc-choice`) and must be imported individually — there is no `ChaosControlModule`.

## Rules

Two ways to win: capturing the opponent's main pawn, or landing on the opponent's temple. **The temple win does not require the main pawn** — that is this game's long-standing behaviour, not an oversight; restricting it is a one-line change in `play()`, marked with a comment.
