import Block from "./block";

const scoreTable = [0, 100, 300, 500, 800];

export default class Floor {
  blocks: Block[] = [];

  /**
   *
   * @param blocks
   * @returns added score
   */
  push(blocks: Block[]) {
    this.blocks.push(...blocks);

    const completedRows = [...new Set(this.blocks.map((b) => b.y))]
      .filter((h) => this.blocks.filter((b) => b.y === h).length === 10)
      .sort((a, b) => a - b);

    for (const row of completedRows) {
      this.blocks = this.blocks
        .filter((b) => b.y !== row)
        .map((b) => (b.y < row ? b.translate(0, 1) : b));
    }

    return scoreTable[completedRows.length];
  }
}
