import { PIECE_STARTING_X, PIECE_STARTING_Y } from "../config";
import { PieceType } from "../types";
import { Block } from "./block";
import { Floor } from "./floor";

const pieces = [
  {
    type: PieceType.I,
    blocks: [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
    ],
  },
  {
    type: PieceType.J,
    blocks: [
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: -1, y: 1 },
      { x: -1, y: 0 },
    ],
  },
  {
    type: PieceType.L,
    blocks: [
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: -1, y: 1 },
    ],
  },
  {
    type: PieceType.O,
    blocks: [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
    ],
  },
  {
    type: PieceType.S,
    blocks: [
      { x: 0, y: 0 },
      { x: -1, y: 1 },
      { x: 0, y: 1 },
      { x: 1, y: 0 },
    ],
  },
  {
    type: PieceType.T,
    blocks: [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 0 },
    ],
  },
  {
    type: PieceType.Z,
    blocks: [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ],
  },
];
let bag = [...pieces].sort(() => Math.random() - 0.5);

interface PieceOptions {
  blocks: Block[];
  type: PieceType;
}

export class Piece {
  blocks: Block[];
  type: PieceType;

  constructor({ blocks, type }: PieceOptions) {
    this.blocks = blocks;
    this.type = type;
  }

  static random() {
    if (bag.length === 0) bag = [...pieces].sort(() => Math.random() - 0.5);

    // acabamos de preencher caso esteja vazio
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { blocks, type } = bag.pop()!;
    return new Piece({
      blocks: blocks.map(
        (b) => new Block(b.x + PIECE_STARTING_X, b.y + PIECE_STARTING_Y, type)
      ),
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
}
