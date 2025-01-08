import { BOARD_HEIGHT, BOARD_WIDTH } from "../config";
import type { PieceType } from "./piece";

export class Block {
  public x: number;
  public y: number;
  public type: PieceType;

  constructor(x: number, y: number, type: PieceType) {
    this.x = x;
    this.y = y;
    this.type = type;
  }

  translate(x: number, y: number) {
    return new Block(this.x + x, this.y + y, this.type);
  }

  rotate(reference: Block) {
    return new Block(reference.y - this.y + reference.x, this.x - reference.x + reference.y, this.type);
  }

  isOutOfBounds() {
    return this.x < 0 || this.x >= BOARD_WIDTH || this.y >= BOARD_HEIGHT;
  }
}
