import { create } from "zustand";
import { Piece } from "./objects/piece";
import { Floor } from "./objects/floor";
import { render } from "./render";

interface TetrisState {
  isGameOver: boolean;
  isRunning: boolean;
  piece: Piece;
  upcomingPiece: Piece;
  board: string[][];
  floor: Floor;
  score: number;
  reset: () => void;
  move: (x: number) => void;
  rotate: () => void;
  update: () => void;
}

export const useTetris = create<TetrisState>((set, get) => {
  const piece = Piece.random();

  return {
    piece,
    upcomingPiece: Piece.random(),
    floor: new Floor(),
    board: render(piece),
    isGameOver: false,
    isRunning: true,
    score: 0,
    reset: () => {
      const piece = Piece.random();
      set(() => ({
        piece,
        upcomingPiece: Piece.random(),
        floor: new Floor(),
        isGameOver: false,
        score: 0,
        board: render(piece),
      }));
    },
    move: (x) => {
      const piece = get().piece.translate(x, 0);
      if (piece.collides(get().floor)) return;
      set(() => ({ piece, board: render(piece, get().floor) }));
    },
    rotate: () => {
      const piece = get().piece.rotate();
      if (piece.collides(get().floor)) return;
      set(() => ({ piece, board: render(piece, get().floor) }));
    },
    update: () => {
      const floor = get().floor;
      const piece = get().piece.translate(0, 1);

      if (piece.collides(floor)) {
        const score = get().score + floor.push(get().piece.blocks);
        set({
          piece: get().upcomingPiece,
          upcomingPiece: Piece.random(),
          isGameOver: get().upcomingPiece.collides(floor),
          score,
          board: render(get().upcomingPiece, floor),
        });
      } else {
        set({ piece, board: render(piece, floor) });
      }
    },
  };
});
