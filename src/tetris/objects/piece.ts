import { PIECE_STARTING_X, PIECE_STARTING_Y } from "../config";
import generateColor from "../generators/generateColor";
import generateShape from "../generators/generateShape";
import Block from "./block";
import Board from "./board";

export default class Piece {
  #shape = generateShape();
  position = { x: PIECE_STARTING_X, y: PIECE_STARTING_Y };
  color = generateColor();

  get blocks() {
    return this.#shape.shape.map(
      ({ x, y }) =>
        new Block(x + this.position.x, y + this.position.y, this.color)
    );
  }

  render(board: Board) {
    this.blocks.forEach((b) => board.draw(b));
  }

  rotate() {
    this.#shape.rotate();
  }
}
