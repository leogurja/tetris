import { Bag } from "./bag";
import { Block } from "./block";
import { Floor } from "./floor";
import { PieceType } from "./types";

const bag = new Bag([
  {
    type: PieceType.I,
    blocks: [
      { x: 2, y: 0 },
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 3, y: 0 },
    ],
  },
  {
    type: PieceType.J,
    blocks: [
      { x: 1, y: 0 },
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 1 },
    ],
  },
  {
    type: PieceType.L,
    blocks: [
      { x: 1, y: 0 },
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 0, y: 1 },
    ],
  },
  {
    type: PieceType.O,
    blocks: [
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 0 },
      { x: 2, y: 1 },
    ],
  },
  {
    type: PieceType.S,
    blocks: [
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 0 },
    ],
  },
  {
    type: PieceType.T,
    blocks: [
      { x: 1, y: 0 },
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 0 },
    ],
  },
  {
    type: PieceType.Z,
    blocks: [
      { x: 1, y: 0 },
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ],
  },
]);

interface PieceOptions {
  blocks: Block[];
  type: PieceType;
}

export class Piece {
  blocks: Block[];
  type: PieceType;

  private constructor({ blocks, type }: PieceOptions) {
    this.blocks = blocks;
    this.type = type;
  }

  static take() {
    const { blocks, type } = bag.take();
    return new Piece({
      blocks: blocks.map((b) => new Block(b.x + 3, b.y, type)),
      type,
    });
  }

  static peek() {
    const { blocks, type } = bag.peek();
    return new Piece({
      blocks: blocks.map((b) => new Block(b.x, b.y, type)),
      type,
    });
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
    if (this.type === PieceType.O) return this;

    return new Piece({
      ...this,
      blocks: this.blocks.map((b) => b.rotate(this.blocks[0])),
    });
  }

  project(floor: Floor) {
    let projection = this.translate(0, 1);
    while (!projection.collides(floor)) projection = projection.translate(0, 1);

    return projection.translate(0, -1);
  }
}
