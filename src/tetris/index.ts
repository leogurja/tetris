import Piece from "./objects/piece";
import pieceGenerator from "./generators/pieceGenerator";
import Floor from "./objects/floor";
import Board from "./objects/board";

export default class Tetris {
  #floor = new Floor();
  #piece: Piece = pieceGenerator.take();

  constructor() {
    console.log("new game");
  }

  render() {
    console.log("render");
    const board = new Board();
    this.#piece.render(board);
    this.#floor.render(board);

    console.log(board.board);
    return board.board;
  }

  /**
   *
   * @returns indicating if the game is running
   */
  update() {
    if (this.#floor.isGameOver) return false;
    console.log("update");

    const blocks = this.#piece.blocks.map((b) => b.translate({ y: 1, x: 0 }));
    const willCollideWithFloor = blocks.some((b) =>
      this.#floor.collidesWith(b)
    );
    if (willCollideWithFloor) {
      this.#floor.push(blocks.map((b) => b.translate({ y: -1, x: 0 })));
      this.#piece = pieceGenerator.take();
    } else {
      this.#piece.position.y++;
    }

    return !this.#floor.isGameOver;
  }
}
