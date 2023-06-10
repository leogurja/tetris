import { Block } from "./block";
import { Floor } from "./floor";
import { PIECE_STARTING_X, PIECE_STARTING_Y } from "../config";

export enum RotationMode {
  Flip,
  Flop,
  Normal,
  None,
}

const pieces = [
  {
    // i
    blocks: [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
    ],
    rotationMode: RotationMode.Flip,
    color:
      "bg-orange-600 border-2 border-l-orange-400 border-t-orange-400 border-b-orange-800 border-r-orange-800",
  },
  {
    // j
    blocks: [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
    ],
    rotationMode: RotationMode.Normal,
    color:
      "bg-purple-600 border-2 border-l-purple-400 border-t-purple-400 border-b-purple-800 border-r-purple-800",
  },
  {
    // l
    blocks: [
      { x: 0, y: 0 },
      { x: -1, y: 1 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
    ],
    rotationMode: RotationMode.Normal,
    color:
      "bg-blue-600 border-2 border-l-blue-400 border-t-blue-400 border-b-blue-800 border-r-blue-800",
  },
  {
    // o
    blocks: [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
    ],
    rotationMode: RotationMode.None,
    color:
      "bg-red-600 border-2 border-l-red-400 border-t-red-400 border-b-red-800 border-r-red-800",
  },
  {
    // s
    blocks: [
      { x: 0, y: 0 },
      { x: -1, y: 1 },
      { x: 0, y: 1 },
      { x: 1, y: 0 },
    ],
    rotationMode: RotationMode.Flip,
    color:
      "bg-sky-400 border-2 border-l-sky-200 border-t-sky-200 border-b-sky-600 border-r-sky-600",
  },
  {
    // t
    blocks: [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 0 },
    ],
    rotationMode: RotationMode.Normal,
    color:
      "bg-yellow-400 border-2 border-l-yellow-200 border-t-yellow-200 border-b-yellow-600 border-r-yellow-600",
  },
  {
    // z
    blocks: [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ],
    rotationMode: RotationMode.Flip,
    color:
      "bg-green-600 border-2 border-l-green-400 border-t-green-400 border-b-green-800 border-r-green-800",
  },
];
let bag = [...pieces].sort(() => Math.random() - 0.5);

interface PieceOptions {
  blocks: Block[];
  rotationMode?: RotationMode;
  color?: string;
}

export class Piece {
  blocks: Block[];
  rotationMode: RotationMode;

  constructor({ blocks, rotationMode = RotationMode.Normal }: PieceOptions) {
    this.rotationMode = rotationMode;
    this.blocks = blocks;
  }

  static random() {
    if (bag.length === 0) bag = [...pieces].sort(() => Math.random() - 0.5);

    // acabamos de preencher caso esteja vazio
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { blocks, rotationMode, color } = bag.pop()!;
    return new Piece({
      blocks: blocks.map(
        (b) => new Block(b.x + PIECE_STARTING_X, b.y + PIECE_STARTING_Y, color)
      ),
      rotationMode,
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
    if (this.rotationMode === RotationMode.None) return this;
    if (this.rotationMode === RotationMode.Flop)
      return new Piece({
        ...this,
        blocks: this.blocks.map((b) => b.rotateBack(this.blocks[0])),
        rotationMode: RotationMode.Flip,
      });

    return new Piece({
      ...this,
      blocks: this.blocks.map((b) => b.rotate(this.blocks[0])),
      rotationMode:
        this.rotationMode === RotationMode.Flip
          ? RotationMode.Flop
          : this.rotationMode,
    });
  }
}
