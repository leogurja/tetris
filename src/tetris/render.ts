import { Block } from "./block";
import { BOARD_HEIGHT, BOARD_WIDTH } from "./config";
import { Floor } from "./floor";
import { Piece } from "./piece";
import { BlockType, BoardType } from "./types";

export function render(piece: Piece, floor: Floor) {
  const board = getEmptyBoard();
  floor.blocks.forEach((b) => drawBlock(b, board));
  piece.project(floor).blocks.forEach((b) => drawBlock(b, board, true));
  piece.blocks.forEach((b) => drawBlock(b, board));
  return board;
}

function drawBlock(block: Block, board: BoardType, projection = false) {
  if (block.y < 0) return;
  board[block.y][block.x] = projection ? "P" : block.type;
}

function getEmptyBoard(): BoardType {
  return Array(BOARD_HEIGHT)
    .fill([])
    .map(() => Array<BlockType>(BOARD_WIDTH).fill(""));
}
