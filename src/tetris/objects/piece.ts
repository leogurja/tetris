import { PIECE_STARTING_X, PIECE_STARTING_Y } from "../config";
import colorGenerator from "../generators/colorGenerator";
import Block from "./block";
import Board from "./board";
import Position from "./position";

export default class Piece {
  #blocks: Block[];
  position: Position = { x: PIECE_STARTING_X, y: PIECE_STARTING_Y };

  constructor(blocks: Position[]) {
    const color = colorGenerator.take();
    this.#blocks = blocks.map(({ x, y }) => new Block(x, y, color));
  }

  get blocks() {
    return this.#blocks.map((b) => b.translate(this.position));
  }

  render(board: Board) {
    this.#blocks.forEach((b) => board.draw(b.translate(this.position)));
  }

  rotate() {
    this.#blocks.forEach((s) => {
      [s.x, s.y] = [-s.y, s.x];
    });
  }
}
