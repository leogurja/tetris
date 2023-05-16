import colorGenerator from "../generators/colorGenerator";
import Floor from "./floor";
import Square from "./square";

export default class Piece {
  #squares: Square[]
  #color = colorGenerator.take()
  isEjected = false

  constructor(squares: {x: number, y: number}[], public x: number, public y: number) {
    this.#squares = squares.map(({ x, y }) => new Square(this.x + x, this.y + y, this.#color))
  }

  update(floor: Floor) {
    this.y += 1
    if (this.#squares.some(s => floor.collidesWith(s))) {
      this.y -= 1
      floor.push(this.eject())
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    this.#squares.forEach(s => s.render(ctx, this.x, this.y))
  }

  eject() {
    this.#squares.forEach(s => {
      s.x += this.x
      s.y += this.y
    })
    this.isEjected = true

    return this.#squares
  }

  rotate() {
    this.#squares.forEach(s => s.rotate())
  }
}