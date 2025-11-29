import { create } from "zustand";
import { useShallow } from "zustand/shallow";
import type { GameState } from "../lib/constants/game-state";
import { play } from "./audio";
import { peek, take } from "./bag";
import { Floor } from "./floor";
import { Piece } from "./piece";

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
  piece: new Piece({ blocks: [], type: "I" }),
  nextPiece: new Piece({ blocks: [], type: "I" }),
  floor: Floor.empty(),
  isAccelerated: false,
  score: 0,
  isMuted: false,
  gameState: "Initial",
  level: () => Math.min(Math.floor(get().score / 1000), 15),
  tickRate: () => {
    if (get().gameState !== "Playing") return 0;
    if (get().isAccelerated) return 50;
    const level = get().level();
    return (0.8 - level * 0.007) ** level * 1000;
  },
  update: () => {
    // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: TODO: refactor
    set(({ piece, floor, score, gameState, isMuted }) => {
      const updatedPiece = piece.translate(0, 1);

      if (updatedPiece.collides(floor)) {
        const [newFloor, addedScore] = floor.push(piece.blocks);
        if (addedScore > 0 && !isMuted) {
          score += addedScore;
          play("clear");
        }
        piece = take();

        if (piece.collides(floor)) {
          gameState = "GameOver";
          if (!isMuted) play("game-over");
        }
        return { piece, score, gameState, floor: newFloor, nextPiece: peek() };
      }

      return { piece: updatedPiece };
    });
  },
  toggleGameState: () => {
    set(({ gameState }) => {
      switch (gameState) {
        case "Playing":
          return { gameState: "Paused" };
        case "Paused":
          return { gameState: "Playing" };
        case "GameOver":
        case "Initial":
          return {
            floor: Floor.empty(),
            piece: take(),
            nextPiece: peek(),
            score: 0,
            gameState: "Playing",
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
      if (gameState !== "Playing") return {};
      if (!isMuted) play("click");

      const rotatedPiece = piece.rotate();
      if (rotatedPiece.collides(floor)) return {};

      return { piece: rotatedPiece };
    });
  },
  moveLeft: () => {
    set(({ piece, floor, gameState, isMuted }) => {
      if (gameState !== "Playing") return {};
      if (!isMuted) play("click");

      const movedPiece = piece.translate(-1, 0);
      if (movedPiece.collides(floor)) return {};

      return { piece: movedPiece };
    });
  },
  moveRight: () => {
    set(({ piece, floor, gameState, isMuted }) => {
      if (gameState !== "Playing") return {};
      if (!isMuted) play("click");

      const movedPiece = piece.translate(1, 0);
      if (movedPiece.collides(floor)) return {};

      return { piece: movedPiece };
    });
  },
  hardDrop: () => {
    set(({ piece, floor, score, gameState, isMuted }) => {
      if (gameState !== "Playing") return {};

      piece = piece.project(floor);
      const [newFloor, addedScore] = floor.push(piece.project(floor).blocks);

      if (!isMuted) {
        play("drop");
        if (addedScore > 0) {
          play("clear");
          score += addedScore;
        }
      }
      return { piece: take(), floor: newFloor, score, nextPiece: peek() };
    });
  },
}));

export function useTetris<T>(fn: (state: TetrisStore) => T) {
  return useTetrisStore(useShallow(fn));
}
