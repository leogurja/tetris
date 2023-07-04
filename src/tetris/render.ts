import { Block } from "./block";
import { BOARD_HEIGHT, BOARD_WIDTH } from "./config";
import { Floor } from "./floor";
import { Piece } from "./piece";
import { BoardType } from "./types";

export function render(piece: Piece, floor: Floor) {
  const board = getEmptyBoard();
  floor.blocks.forEach((b) => drawBlock(b, board));
  piece.project(floor).blocks.forEach((b) => drawBlock(b, board, true));
  piece.blocks.forEach((b) => drawBlock(b, board));
  return board;
}

function drawBlock(block: Block, board: BoardType, projection = false) {
  if (block.y < 0) return;
  board[block.y * BOARD_WIDTH + block.x] = projection ? "P" : block.type;
}

function getEmptyBoard(): BoardType {
  return Array(BOARD_HEIGHT * BOARD_WIDTH).fill("");
}
