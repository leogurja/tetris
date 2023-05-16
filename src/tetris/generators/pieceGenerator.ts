import Piece from "../objects/piece"
import shuffle from "./shuffle"

type GenericPiece = {x:number, y:number}[]

const i = [{ x: 0, y: -1 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }]
const j = [{ x: 0, y: -1 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 1 }]
const l = [{ x: 0, y: -1 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }]
const o = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }]
const s = [{ x: -1, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 0 }, { x: 1, y: 0 }]
const t = [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }]
const z = [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }]
const pieces = [i, j, l, o, s, t, z]

class PieceGenerator {
  #bag: GenericPiece[] = []

  take() {
    console.log('nova peça')
    if (this.#bag.length === 0) this.#bag = shuffle([...pieces])

    const piece = this.#bag.pop()
    if (piece == null) throw new Error('Peça não definida???')

    return new Piece(piece, 5, -3)
  }
}

export default new PieceGenerator()