import { BOARD_HEIGHT, BOARD_WIDTH } from "../config";

export default class Block {
  constructor(public x: number, public y: number, public color: string) {}

  translate(x: number, y: number) {
    return new Block(this.x + x, this.y + y, this.color);
  }

  rotate(reference: Block) {
    return new Block(
      reference.y - this.y + reference.x,
      this.x - reference.x + reference.y,
      this.color
    );
  }

  rotateBack(reference: Block) {
    return new Block(
      this.y - reference.y + reference.x,
      reference.x - this.x + reference.y,
      this.color
    );
  }

  isOutOfBounds() {
    return this.x < 0 || this.x >= BOARD_WIDTH || this.y >= BOARD_HEIGHT;
  }
}
