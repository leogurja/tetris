import Block from "./block";
import Board from "./board";

const scoreTable = [0, 100, 300, 500, 800];

export default class Floor {
  blocks: Block[] = [];
  isSettling = false;

  /**
   *
   * @param blocks
   * @returns added score
   */
  push(blocks: Block[]) {
    this.blocks.push(...blocks);
    this.isSettling = true;
  }

  update() {
    if (!this.isSettling) return 0;

    const completedRows = [...new Set(this.blocks.map((b) => b.y))]
      .filter((h) => this.blocks.filter((b) => b.y === h).length === 10)
      .sort((a, b) => a - b);

    console.log(completedRows.length > 0);
    completedRows.forEach((row) => {
      this.blocks = this.blocks
        .filter((b) => b.y !== row)
        .map((b) => (b.y < row ? b.translate(0, 1) : b));
    });

    this.isSettling = completedRows.length > 0;
    return scoreTable[completedRows.length];
  }

  render(board: Board) {
    this.blocks.forEach((b) => board.draw(b));
  }
}
