import { BOARD_HEIGHT, BOARD_WIDTH } from "../config";
import Position from "./position";

export default class Block implements Position {
  constructor(public x: number, public y: number, public color: string) {}

  translate(position: Position) {
    return new Block(this.x + position.x, this.y + position.y, this.color);
  }

  isOutOfBounds() {
    return this.x < 0 || this.x >= BOARD_WIDTH || this.y >= BOARD_HEIGHT;
  }
}
