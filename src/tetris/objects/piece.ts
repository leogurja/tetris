import Block from "./block";
import Board from "./board";
import Floor from "./floor";

export enum RotationMode {
  Flip,
  Flop,
  Normal,
  None,
}

interface PieceOptions {
  blocks: Block[];
  x?: number;
  y?: number;
  rotationMode?: RotationMode;
  color?: string;
}

export default class Piece {
  blocks: Block[];
  rotationMode: RotationMode;

  constructor({ blocks, rotationMode = RotationMode.Normal }: PieceOptions) {
    this.rotationMode = rotationMode;
    this.blocks = blocks;
  }

  collides(floor: Floor) {
    return this.blocks.some(
      (b) =>
        b.isOutOfBounds() ||
        floor.blocks.some((fb) => fb.x === b.x && fb.y === b.y)
    );
  }

  render(board: Board) {
    this.blocks.forEach((b) => board.draw(b));
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
