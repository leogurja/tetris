import type { PieceType } from "@/lib/constants/pieces";
import { Block, type BlockOptions } from "./block";
import type { Floor } from "./floor";

export interface PieceOptions {
  blocks: BlockOptions[];
  type: PieceType;
}

interface RenderOptions {
  width: number;
  height: number;
  isUpcoming?: boolean;
}

export class Piece {
  blocks: Block[];
  type: PieceType;
  private isProjection = false;

  constructor({ blocks, type }: PieceOptions) {
    this.blocks = blocks.map((b) => new Block(b));
    this.type = type;
  }

  collides(floor: Floor) {
    return this.blocks.some(
      (b) =>
        b.isOutOfBounds() ||
        floor.blocks.some((fb) => fb.x === b.x && fb.y === b.y)
    );
  }

  translate(x: number, y: number) {
    return new Piece({
      ...this,
      blocks: this.blocks.map((b) => b.translate(x, y)),
    });
  }

  rotate() {
    if (this.type === "O") return this;

    return new Piece({
      ...this,
      blocks: this.blocks.map((b) => b.rotate(this.blocks[0])),
    });
  }

  project(floor: Floor) {
    if (this.blocks.length === 0) return this;
    let projection = this.translate(0, 1);
    while (!projection.collides(floor)) projection = projection.translate(0, 1);

    projection = projection.translate(0, -1);
    projection.isProjection = true;
    return projection;
  }

  render(options: RenderOptions) {
    return this.blocks.map((block) =>
      block.render({ ...options, isProjection: this.isProjection })
    );
  }
}
