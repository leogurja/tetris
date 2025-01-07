import type { GameState } from "./gameState";

export enum PieceType {
  I = "i",
  J = "j",
  L = "l",
  O = "o",
  S = "s",
  T = "t",
  Z = "z",
}

export type BlockType = PieceType | "p" | "";
export type BoardType = BlockType[];

export interface TetrisActions {
  moveLeft: () => void;
  moveRight: () => void;
  rotate: () => void;
  startSoftDrop: () => void;
  stopSoftDrop: () => void;
  hardDrop: () => void;
}

export interface TetrisSettings {
  gameState: GameState;
  isMuted: boolean;
  toggleGameState: () => void;
  toggleIsMuted: () => void;
}

export interface TetrisGame {
  level: number;
  score: number;
  record: number;
  gameState: GameState;
  board: BlockType[];
}
