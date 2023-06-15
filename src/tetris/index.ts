import { create } from "zustand";
import { play } from "./audio";
import { Floor } from "./objects/floor";
import { Piece } from "./objects/piece";
import { render } from "./render";
import { type BoardType } from "./types";
export { Piece } from "./objects/piece";
export { PieceType, type BlockType, type BoardType } from "./types";

interface TetrisState {
  piece: Piece;
  floor: Floor;
  score: number;
  isPaused: boolean;
  upcomingPiece: () => Piece;
  level: () => number;
  tickRate: () => number;
  ghostPiece: () => Piece;
  isRunning: () => boolean;
  isGameOver: () => boolean;
  board: () => BoardType;
}

interface TetrisActions {
  move: (x: number) => void;
  rotate: () => void;
  drop: () => void;
  update: () => void;
  playPause: () => void;
  reset: () => void;
}

export const useTetris = create<TetrisState & TetrisActions>()((set, get) => ({
  ...defaultState(),
  level: () => Math.min(Math.floor(get().score / 1000), 15),
  tickRate: () => (0.8 - get().level() * 0.007) ** get().level() * 1000,
  ghostPiece: () => {
    let piece = get().piece;
    const floor = get().floor;
    while (!piece.collides(floor)) piece = piece.translate(0, 1);

    return piece.translate(0, -1);
  },
  board: () => render(get().piece, get().floor, get().ghostPiece()),
  upcomingPiece: () => Piece.peek(),
  isRunning: () => !get().isGameOver() && !get().isPaused,
  isGameOver: () => get().piece.collides(get().floor),
  playPause: () => set({ isPaused: !get().isPaused }),
  reset: () => set(defaultState()),
  move: (x) =>
    set((state) => {
      if (!state.isRunning()) return {};
      const piece = state.piece.translate(x, 0);
      if (piece.collides(state.floor)) return {};
      play("click");
      return { piece };
    }),
  rotate: () =>
    set((state) => {
      if (!state.isRunning()) return {};
      const piece = state.piece.rotate();
      if (piece.collides(state.floor)) return {};
      play("click");

      return { piece };
    }),
  drop: () =>
    set((state) => {
      if (!state.isRunning()) return {};
      const addedScore = state.floor.push(state.ghostPiece().blocks);
      play(addedScore > 0 ? "clear" : "drop");
      return { score: state.score + addedScore, piece: Piece.take() };
    }),
  update: () =>
    set((state) => {
      if (!state.isRunning()) return {};
      const floor = state.floor;
      const piece = state.piece.translate(0, 1);

      if (piece.collides(floor)) {
        const addedScore = floor.push(state.piece.blocks);
        console.log(addedScore);
        if (addedScore > 0) play("clear");
        return {
          piece: Piece.take(),
          score: state.score + addedScore,
        };
      } else {
        return { piece };
      }
    }),
}));

function defaultState() {
  return {
    score: 0,
    isPaused: false,
    floor: new Floor(),
    piece: Piece.take(),
  };
}
