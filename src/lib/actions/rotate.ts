import type { Block, Piece } from "../types/entities";

export function rotateBlock(block: Block, center: Block) {
  if (block.color === "O") return block; // O piece does not rotate
  return {
    x: center.x - block.y + center.y,
    y: center.y + block.x - center.x,
    color: block.color,
  };
}

export function rotatePiece(piece: Piece) {
  // The first block is always the center for rotation, and always exists.
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const center = piece[0]!;

  return piece.map((b) => rotateBlock(b, center));
}
