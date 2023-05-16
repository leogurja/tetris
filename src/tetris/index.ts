import Piece from "./objects/piece"
import pieceGenerator from "./generators/pieceGenerator"
import { SQUARE_SIZE } from "./objects/square"
import Floor from "./objects/floor"
import Keyboard from "./keyboard"

export default class Tetris {
  #width = 10
  #height = 20
  #floor = new Floor()
  #currentPiece: Piece
  #ctx: CanvasRenderingContext2D | null = null
  #keyboard = new Keyboard()
  #onAcceleratedFrame = false

  constructor() {
    this.#currentPiece = pieceGenerator.take()
  }

  init(canvas: HTMLCanvasElement) {
    this.#ctx = canvas.getContext('2d')

    this.#keyboard.init({
      ArrowUp: () => this.#currentPiece.rotate(),
      ArrowDown: () => null,
      ArrowLeft: () => this.#currentPiece.x--,
      ArrowRight: () => this.#currentPiece.x++
    })
  }

  update() {
    this.#onAcceleratedFrame = !this.#onAcceleratedFrame
    if (this.#onAcceleratedFrame && !this.#keyboard.keysPressed.ArrowDown) return

    if (this.#floor.isGameOver) return

    if (this.#currentPiece.isEjected) this.#currentPiece = pieceGenerator.take()
    console.log('update')

    this.#keyboard.update()
    this.#currentPiece.update(this.#floor)
  }

  render() {
    console.log("render")
    if (this.#ctx == null) throw new Error('Cadê o contexto ???')
    this.#ctx.fillStyle = '#1e1e1e'
    this.#ctx.fillRect(0, 0, this.#width * SQUARE_SIZE, this.#height * SQUARE_SIZE)

    this.#floor.render(this.#ctx)
    this.#currentPiece.render(this.#ctx)
  }
}