import Square from "./square";

export default class Floor {
  #squares: Square[] = []
  isGameOver = false

  push(squares: Square[]) {
    this.#squares.push(...squares)
    this.#removeCompletedLines(squares.map(s => s.y))
    this.#checkGameOver()
  }

  collidesWith(square: Square) {
    return this.#squares.some(s => s.x === square.x && square.y === s.y)
  }


  render(ctx: CanvasRenderingContext2D) {
    this.#squares.forEach(square => square.render(ctx))
  }

  #removeCompletedLines(heightsToCheck: number[]) {
    heightsToCheck.forEach(height => {
      const foundSquares = this.#squares.filter(s => s.y === height)
      if (foundSquares.length === 10) {
        this.#squares = this.#squares.filter(s => s.y !== height)
        // dar score
      }
    })
  }

  #checkGameOver() {
    this.isGameOver = this.#squares.some(s => s.y <= 0)
  }
}