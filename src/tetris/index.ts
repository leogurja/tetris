import Floor from "./objects/floor";
import Board from "./objects/board";
import pieceGenerator from "./generators/pieceGenerator";

class Tetris {
  #floor = new Floor();
  #piece = pieceGenerator.take();
  upcoming = pieceGenerator.take();
  score = 0;
  isGameOver = false;

  moveLeft() {
    const piece = this.#piece.translate(-1, 0);
    if (!piece.collides(this.#floor)) this.#piece = piece;
  }

  moveRight() {
    const piece = this.#piece.translate(1, 0);
    if (!piece.collides(this.#floor)) this.#piece = piece;
  }

  rotate() {
    const piece = this.#piece.rotate();
    if (!piece.collides(this.#floor)) this.#piece = piece;
  }

  render() {
    const board = new Board();
    this.#floor.render(board);
    this.#piece.render(board);

    return board.board;
  }

  /**
   *
   * @returns indicating if the game is running
   */
  update() {
    if (!this.#floor.isSettling) {
      const piece = this.#piece.translate(0, 1);
      if (piece.collides(this.#floor)) {
        this.#nextPiece();
      } else {
        this.#piece = piece;
      }
    }

    this.score += this.#floor.update();
  }

  reset() {
    this.#floor = new Floor();
    this.#piece = pieceGenerator.take();
    this.upcoming = pieceGenerator.take();
    this.score = 0;
    this.isGameOver = false;
  }

  #nextPiece() {
    this.#floor.push(this.#piece.blocks);
    this.#piece = this.upcoming;
    this.upcoming = pieceGenerator.take();
    this.isGameOver = this.#piece.collides(this.#floor);
  }
}

export default new Tetris();
