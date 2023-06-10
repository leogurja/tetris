import { BOARD_HEIGHT, BOARD_WIDTH } from "./config";
import { Block } from "./objects/block";
import { Floor } from "./objects/floor";
import { Piece } from "./objects/piece";

export function render(piece?: Piece, floor?: Floor) {
  const board = getEmptyBoard();
  floor?.blocks?.forEach((b) => drawBlock(b, board));
  piece?.blocks?.forEach((b) => drawBlock(b, board));
  return board;
}

function drawBlock(block: Block, board: string[][]) {
  if (block.isOutOfBounds() || block.y < 0) return;
  board[block.y][block.x] = block.color;
}

function getEmptyBoard() {
  return Array<string[]>(BOARD_HEIGHT)
    .fill([])
    .map(() => Array<string>(BOARD_WIDTH).fill(""));
}
