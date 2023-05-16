import { Color, blue } from "../generators/colorGenerator"

export const SQUARE_SIZE = 64

export default class Square {
  #color: Color


  constructor(public x: number, public y: number, color?: Color) {
    this.#color = color ?? blue
  }

  render(ctx: CanvasRenderingContext2D, globalX = 0, globalY = 0) {
    ctx.strokeStyle = this.#color.border
    ctx.fillStyle = this.#color.color
    ctx.rect(this.x + globalX, this.y + globalY, SQUARE_SIZE, SQUARE_SIZE)
  }

  collidesWith(squares: Square[]) {
    return squares.some(square => square.x === this.x && square.y === this.y)
  }

  rotate() {
    [this.x, this.y] = [-this.y, this.x]
  }
}