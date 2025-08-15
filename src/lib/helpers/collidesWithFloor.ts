import type { Block, Floor, Piece } from "../types/entities";

export function blockCollidesWithFloor(block: Block, floor: Floor) {
  return floor.some((fb) => block.x === fb.x && block.y === fb.y);
}

export function pieceCollidesWithFloor(piece: Piece, floor: Floor) {
  return piece.some((block) => blockCollidesWithFloor(block, floor));
}
