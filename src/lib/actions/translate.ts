import type { Block, Piece } from "../types/entities";

export function translateBlock(block: Block, x: number, y: number): Block {
  return {
    x: block.x + x,
    y: block.y + y,
    color: block.color,
  };
}

export function translatePiece(piece: Piece, x: number, y: number): Piece {
  return piece.map((b) => translateBlock(b, x, y));
}
