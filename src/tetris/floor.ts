import { SCORE_TABLE } from "@/lib/constants/score";
import type { Block } from "./block";

export interface RenderOptions {
  width: number;
  height: number;
}

export class Floor {
  blocks: Block[] = [];

  static empty() {
    return new Floor([]);
  }

  /**
   * @param blocks
   * @returns added score
   */
  push(blocks: Block[]) {
    let newBlocks = [...this.blocks, ...blocks];

    const completedRows = [...new Set(newBlocks.map((b) => b.y))]
      .filter((h) => newBlocks.filter((b) => b.y === h).length === 10)
      .sort((a, b) => a - b);

    for (const row of completedRows) {
      newBlocks = newBlocks
        .filter((b) => b.y !== row)
        .map((b) => (b.y < row ? b.translate(0, 1) : b));
    }

    return [new Floor(newBlocks), SCORE_TABLE[completedRows.length]] as const;
  }

  render(options: RenderOptions) {
    return this.blocks.map((block) => block.render(options));
  }

  private constructor(blocks: Block[]) {
    this.blocks = blocks;
  }
}
