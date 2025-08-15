import { translatePiece } from "../actions/translate";
import type { Floor, Piece } from "../types/entities";
import { pieceCollidesWithFloor } from "./collidesWithFloor";

export function projectPiece(piece: Piece, floor: Floor) {
  let projection = translatePiece(piece, 0, 1);
  while (pieceCollidesWithFloor(projection, floor)) {
    projection = translatePiece(projection, 0, 1);
  }
  return translatePiece(projection, 0, -1);
}
