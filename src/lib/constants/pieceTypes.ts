import type { Piece, PieceType } from "../types/entities";

export const defaultPieces: Record<PieceType, Piece> = {
  I: [
    { x: 2, y: 0, color: "I" },
    { x: 0, y: 0, color: "I" },
    { x: 1, y: 0, color: "I" },
    { x: 3, y: 0, color: "I" },
  ],
  J: [
    { x: 1, y: 0, color: "J" },
    { x: 0, y: 0, color: "J" },
    { x: 2, y: 0, color: "J" },
    { x: 2, y: 1, color: "J" },
  ],
  L: [
    { x: 1, y: 0, color: "L" },
    { x: 0, y: 0, color: "L" },
    { x: 2, y: 0, color: "L" },
    { x: 0, y: 1, color: "L" },
  ],
  O: [
    { x: 1, y: 0, color: "O" },
    { x: 1, y: 1, color: "O" },
    { x: 2, y: 0, color: "O" },
    { x: 2, y: 1, color: "O" },
  ],
  S: [
    { x: 1, y: 0, color: "S" },
    { x: 0, y: 1, color: "S" },
    { x: 1, y: 1, color: "S" },
    { x: 2, y: 0, color: "S" },
  ],
  T: [
    { x: 1, y: 0, color: "T" },
    { x: 0, y: 0, color: "T" },
    { x: 1, y: 1, color: "T" },
    { x: 2, y: 0, color: "T" },
  ],
  Z: [
    { x: 1, y: 0, color: "Z" },
    { x: 0, y: 0, color: "Z" },
    { x: 1, y: 1, color: "Z" },
    { x: 2, y: 1, color: "Z" },
  ],
};
