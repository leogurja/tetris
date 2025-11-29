import { twMerge } from "tailwind-merge";
import { BOARD_HEIGHT, BOARD_WIDTH } from "@/lib/constants/board";
import {
  BLOCK_COLOR_MAP,
  type PieceType,
  UPCOMING_TRANSFORM_MAP,
} from "@/lib/constants/pieces";

export interface BlockOptions {
  x: number;
  y: number;
  type: PieceType;
}

export interface RenderOptions {
  width: number;
  height: number;
  isProjection?: boolean;
  isUpcoming?: boolean;
}

export class Block {
  readonly x: number;
  readonly y: number;
  readonly type: PieceType;

  constructor({ x, y, type }: BlockOptions) {
    this.x = x;
    this.y = y;
    this.type = type;
  }

  translate(x: number, y: number) {
    return new Block({ x: this.x + x, y: this.y + y, type: this.type });
  }

  rotate(reference: Block) {
    return new Block({
      x: reference.y - this.y + reference.x,
      y: this.x - reference.x + reference.y,
      type: this.type,
    });
  }

  isOutOfBounds() {
    return this.x < 0 || this.x >= BOARD_WIDTH || this.y >= BOARD_HEIGHT;
  }

  render({
    width,
    height,
    isProjection = false,
    isUpcoming = false,
  }: RenderOptions) {
    if (isUpcoming) {
      return this.renderUpcoming({ width, height });
    }

    const blockWidth = width / BOARD_WIDTH;
    const blockHeight = height / BOARD_HEIGHT;

    return {
      className: twMerge(
        "absolute box-border border border-neutral-900 will-change-[top,left]",
        isProjection ? BLOCK_COLOR_MAP.P : BLOCK_COLOR_MAP[this.type]
      ),
      style: {
        width: `${blockWidth}px`,
        height: `${blockWidth}px`,
        left: `${this.x * blockWidth}px`,
        top: `${this.y * blockHeight}px`,
      },
    };
  }

  private renderUpcoming({ width, height }: RenderOptions) {
    const blockWidth = width / 4;
    const blockHeight = height / 4;

    return {
      className: twMerge(
        "absolute border border-neutral-900",
        BLOCK_COLOR_MAP[this.type],
        UPCOMING_TRANSFORM_MAP[this.type]
      ),
      style: {
        width: `${blockWidth}px`,
        height: `${blockWidth}px`,
        left: `${this.x * blockWidth}px`,
        top: `${this.y * blockHeight}px`,
      },
    };
  }
}
