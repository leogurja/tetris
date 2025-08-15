import { BOARD_HEIGHT, BOARD_WIDTH } from "../constants/board";
import type { Block } from "../types/entities";

export function isOutOfBounds(block: Block) {
  return block.x < 0 || block.x >= BOARD_WIDTH || block.y >= BOARD_HEIGHT;
}

export function isPieceOutOfBounds(piece: Block[]) {
  return piece.some(isOutOfBounds);
}
