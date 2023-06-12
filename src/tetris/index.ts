import { create } from "zustand";
import { Floor } from "./objects/floor";
import { Piece } from "./objects/piece";
import { render } from "./render";
import { type BoardType } from "./types";
export { Piece } from "./objects/piece";
export { PieceType, type BlockType, type BoardType } from "./types";

interface TetrisState {
  isGameOver: boolean;
  isRunning: boolean;
  piece: Piece;
  upcomingPiece: Piece;
  floor: Floor;
  score: number;
  level: () => number;
  move: (x: number) => void;
  render: () => BoardType;
  rotate: () => void;
  drop: () => void;
  update: () => void;
  playPause: () => void;
  projectedPiece: () => Piece;
}

export const useTetris = create<TetrisState>()((set, get) => ({
  piece: Piece.random(),
  floor: new Floor(),
  upcomingPiece: Piece.random(),
  isGameOver: false,
  isRunning: true,
  score: 0,
  level: () => {
    if (get().score > 1600) return 15;
    return Math.floor(get().score / 1000);
  },
  projectedPiece: () => {
    let piece = get().piece;
    const floor = get().floor;
    while (!piece.collides(floor)) piece = piece.translate(0, 1);

    return piece.translate(0, -1);
  },
  playPause: () => {
    if (get().isGameOver) {
      const piece = Piece.random();
      set(() => ({
        piece,
        upcomingPiece: Piece.random(),
        floor: new Floor(),
        isGameOver: false,
        score: 0,
      }));
    }
    set({ isRunning: !get().isRunning });
  },
  move: (x) => {
    const piece = get().piece.translate(x, 0);
    if (piece.collides(get().floor)) return;
    set({ piece });
  },
  rotate: () => {
    const piece = get().piece.rotate();
    if (piece.collides(get().floor)) return;

    set({ piece });
  },
  drop: () => {
    const score = get().score + get().floor.push(get().projectedPiece().blocks);
    set({ score, piece: get().upcomingPiece, upcomingPiece: Piece.random() });
  },
  render: () => render(get().piece, get().floor, get().projectedPiece()),
  update: () => {
    const floor = get().floor;
    const piece = get().piece.translate(0, 1);

    if (piece.collides(floor)) {
      const score = get().score + floor.push(get().piece.blocks);
      const isGameOver = get().upcomingPiece.collides(floor);
      set({
        piece: get().upcomingPiece,
        upcomingPiece: Piece.random(),
        isGameOver,
        isRunning: !isGameOver,
        score,
      });
    } else {
      set({ piece });
    }
  },
}));
