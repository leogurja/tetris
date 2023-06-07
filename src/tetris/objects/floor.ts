import { BOARD_HEIGHT } from "../config";
import Block from "./block";
import Board from "./board";

export default class Floor {
  blocks: Block[] = [];
  isGameOver = false;

  push(blocks: Block[]) {
    console.log("push");
    this.blocks.push(...blocks);
    this.#removeCompletedLines(blocks.map((s) => s.y));
    this.#checkGameOver();
  }

  render(board: Board) {
    this.blocks.forEach((b) => board.draw(b));
  }

  collidesWith(block: Block) {
    return (
      block.y >= BOARD_HEIGHT ||
      this.blocks.some((b) => b.x === block.x && block.y === b.y)
    );
  }

  #removeCompletedLines(heightsToCheck: number[]) {
    heightsToCheck.forEach((height) => {
      const foundSquares = this.blocks.filter((s) => s.y === height);
      if (foundSquares.length === 10) {
        this.blocks = this.blocks.filter((s) => s.y !== height);
        // dar score
      }
    });
  }

  #checkGameOver() {
    this.isGameOver = this.blocks.some((s) => s.y <= 0);
  }
}
