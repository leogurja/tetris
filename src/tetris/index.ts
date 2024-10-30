import { create } from "zustand";
import { Sfx, play } from "./audio";
import Floor from "./floor";
import GameState from "./gameState";
import Piece from "./piece";
import { useShallow } from "zustand/shallow";

export { type BlockType } from "./types";

export interface TetrisStore {
  piece: Piece;
  nextPiece: Piece;
  floor: Floor;
  isAccelerated: boolean;
  score: number;
  gameState: GameState;
  isMuted: boolean;
  level: () => number;
  tickRate: () => number;

  update: () => void;
  toggleIsMuted: () => void;
  toggleGameState: () => void;
  rotate: () => void;
  moveLeft: () => void;
  moveRight: () => void;
  startSoftDrop: () => void;
  stopSoftDrop: () => void;
  hardDrop: () => void;
}

const useTetrisStore = create<TetrisStore>()((set, get) => ({
  piece: Piece.take(),
  nextPiece: Piece.peek(),
  floor: new Floor(),
  isAccelerated: false,
  score: 0,
  isMuted: false,
  gameState: GameState.Paused,
  level: () => Math.min(Math.floor(get().score / 1000), 15),
  tickRate: () => {
    if (get().gameState !== GameState.Playing) return 0;
    if (get().isAccelerated) return 50;
    const level = get().level();
    return (0.8 - level * 0.007) ** level * 1000;
  },
  update: () => {
    set(({ piece, floor, score, gameState, isMuted }) => {
      const updatedPiece = piece.translate(0, 1);

      if (updatedPiece.collides(floor)) {
        const addedScore = floor.push(piece.blocks);
        if (addedScore > 0 && !isMuted) {
          score += addedScore;
          play(Sfx.Clear);
        }
        piece = Piece.take();

        if (piece.collides(floor)) {
          gameState = GameState.GameOver;
          if (!isMuted) play(Sfx.GameOver);
        }
        return { piece, score, gameState, floor, nextPiece: Piece.peek() };
      }

      return { piece: updatedPiece };
    });
  },
  toggleGameState: () => {
    set(({ gameState }) => {
      switch (gameState) {
        case GameState.Playing:
          return { gameState: GameState.Paused };
        case GameState.Paused:
          return { gameState: GameState.Playing };
        case GameState.GameOver:
          return {
            floor: new Floor(),
            piece: Piece.take(),
            nextPiece: Piece.peek(),
            score: 0,
            gameState: GameState.Playing,
          };
      }
    });
  },
  toggleIsMuted: () => {
    set(({ isMuted }) => ({ isMuted: !isMuted }));
  },
  startSoftDrop: () => {
    set({ isAccelerated: true });
  },
  stopSoftDrop: () => {
    set({ isAccelerated: false });
  },
  rotate: () => {
    set(({ piece, floor, gameState, isMuted }) => {
      if (gameState !== GameState.Playing) return {};
      if (!isMuted) play(Sfx.Click);

      const rotatedPiece = piece.rotate();
      if (rotatedPiece.collides(floor)) return {};

      return { piece: rotatedPiece };
    });
  },
  moveLeft: () => {
    set(({ piece, floor, gameState, isMuted }) => {
      if (gameState !== GameState.Playing) return {};
      if (!isMuted) play(Sfx.Click);

      const movedPiece = piece.translate(-1, 0);
      if (movedPiece.collides(floor)) return {};

      return { piece: movedPiece };
    });
  },
  moveRight: () => {
    set(({ piece, floor, gameState, isMuted }) => {
      if (gameState !== GameState.Playing) return {};
      if (!isMuted) play(Sfx.Click);

      const movedPiece = piece.translate(1, 0);
      if (movedPiece.collides(floor)) return {};

      return { piece: movedPiece };
    });
  },
  hardDrop: () => {
    set(({ piece, floor, score, gameState, isMuted }) => {
      if (gameState !== GameState.Playing) return {};

      piece = piece.project(floor);
      const addedScore = floor.push(piece.project(floor).blocks);

      if (!isMuted) {
        play(Sfx.Drop);
        if (addedScore > 0) {
          play(Sfx.Clear);
          score += addedScore;
        }
      }
      return { piece: Piece.take(), floor, score, nextPiece: Piece.peek() };
    });
  },
}));

export default function useTetris<T>(fn: (state: TetrisStore) => T) {
  return useTetrisStore(useShallow(fn));
};
