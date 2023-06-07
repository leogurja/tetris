import Piece from "./objects/piece";
import Floor from "./objects/floor";
import Board from "./objects/board";

class Tetris {
  #floor = new Floor();
  #piece = new Piece();
  score = 0;
  isGameOver = false;

  moveLeft() {
    const collides = this.#piece.blocks
      .map((b) => b.translate({ x: -1, y: 0 }))
      .some((b) => this.#floor.collidesWith(b));
    if (!collides) this.#piece.position.x--;
  }

  moveRight() {
    const collides = this.#piece.blocks
      .map((b) => b.translate({ x: 1, y: 0 }))
      .some((b) => this.#floor.collidesWith(b));
    if (!collides) this.#piece.position.x++;
  }

  rotate() {
    this.#piece.rotate();
  }

  render() {
    const board = new Board();
    this.#piece.render(board);
    this.#floor.render(board);

    return board.board;
  }

  /**
   *
   * @returns indicating if the game is running
   */
  update() {
    if (this.isGameOver) return false;

    const blocks = this.#piece.blocks.map((b) => b.translate({ y: 1, x: 0 }));
    const willCollideWithFloor = blocks.some((b) =>
      this.#floor.collidesWith(b)
    );
    if (willCollideWithFloor) {
      this.#floor.push(blocks.map((b) => b.translate({ y: -1, x: 0 })));
      this.#piece = new Piece();
      this.isGameOver = this.#piece.blocks.some((b) =>
        this.#floor.collidesWith(b)
      );
    } else {
      this.#piece.position.y++;
    }
  }

  reset() {
    this.#floor = new Floor();
    this.#piece = new Piece();
    this.score = 0;
    this.isGameOver = false;
  }
}

export default new Tetris();
