import { BOARD_SIZE, BOARD_WIDTH } from "../constants/board";
import type { Board, Floor, Piece } from "../types/entities";

export function renderBoard(
  floor: Floor,
  piece: Piece,
  pieceProjection: Piece,
) {
  const board = getEmptyBoard();
  draw(board, floor);
  draw(board, pieceProjection, { asProjection: true });
  draw(board, piece);
  return board;
}

function draw(
  board: Board,
  blocks: Floor | Piece,
  { asProjection = false } = {},
) {
  for (const block of blocks) {
    if (block.y < 0) return;
    board[block.y * BOARD_WIDTH + block.x] = asProjection ? "P" : block.color;
  }
}

function getEmptyBoard(): Board {
  return Array(BOARD_SIZE).fill("");
}
