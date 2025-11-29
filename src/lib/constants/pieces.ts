import type { PieceOptions } from "@/tetris/piece";

export type PieceType = "I" | "J" | "L" | "O" | "S" | "T" | "Z";
export type BlockType = PieceType | "P" | "";

export const PIECES: readonly PieceOptions[] = [
  {
    type: "I",
    blocks: [
      { x: 2, y: 0, type: "I" },
      { x: 0, y: 0, type: "I" },
      { x: 1, y: 0, type: "I" },
      { x: 3, y: 0, type: "I" },
    ],
  },
  {
    type: "J",
    blocks: [
      { x: 1, y: 0, type: "J" },
      { x: 0, y: 0, type: "J" },
      { x: 2, y: 0, type: "J" },
      { x: 2, y: 1, type: "J" },
    ],
  },
  {
    type: "L",
    blocks: [
      { x: 1, y: 0, type: "L" },
      { x: 0, y: 0, type: "L" },
      { x: 2, y: 0, type: "L" },
      { x: 0, y: 1, type: "L" },
    ],
  },
  {
    type: "O",
    blocks: [
      { x: 1, y: 0, type: "O" },
      { x: 1, y: 1, type: "O" },
      { x: 2, y: 0, type: "O" },
      { x: 2, y: 1, type: "O" },
    ],
  },
  {
    type: "S",
    blocks: [
      { x: 1, y: 0, type: "S" },
      { x: 0, y: 1, type: "S" },
      { x: 1, y: 1, type: "S" },
      { x: 2, y: 0, type: "S" },
    ],
  },
  {
    type: "T",
    blocks: [
      { x: 1, y: 0, type: "T" },
      { x: 0, y: 0, type: "T" },
      { x: 1, y: 1, type: "T" },
      { x: 2, y: 0, type: "T" },
    ],
  },
  {
    type: "Z",
    blocks: [
      { x: 1, y: 0, type: "Z" },
      { x: 0, y: 0, type: "Z" },
      { x: 1, y: 1, type: "Z" },
      { x: 2, y: 1, type: "Z" },
    ],
  },
];

export const BLOCK_COLOR_MAP: Record<BlockType, string> = {
  I: "bg-sky-400",
  J: "bg-blue-600",
  L: "bg-orange-600",
  O: "bg-yellow-400",
  S: "bg-green-600",
  T: "bg-purple-600",
  Z: "bg-red-600",
  P: "bg-neutral-800",
  "": "bg-transparent",
};

export const UPCOMING_TRANSFORM_MAP: Record<PieceType, string> = {
  I: "translate-y-3/2",
  J: "translate-x-1/2 translate-y-full",
  L: "translate-x-1/2 translate-y-full",
  O: "translate-full",
  S: "translate-x-1/2 translate-y-full",
  T: "translate-x-1/2 translate-y-full",
  Z: "translate-x-1/2 translate-y-full",
};
