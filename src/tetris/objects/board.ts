import { BOARD_HEIGHT, BOARD_WIDTH } from "../config";
import Block from "./block";

export default class Board {
  width = BOARD_WIDTH;
  height = BOARD_HEIGHT;
  board = this.#getEmptyBoard();

  draw(block: Block) {
    if (block.isOutOfBounds()) return;

    this.board[block.y][block.x] = block.color;
  }

  #getEmptyBoard() {
    return Array<string[]>(this.height)
      .fill([])
      .map(() => Array<string>(this.width).fill(""));
  }
}
