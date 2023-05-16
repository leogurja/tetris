import shuffle from "./shuffle"

export interface Color {
  color: string
  border: string
}

export const blue: Color = { color: '#3584e4', border: '#99c1f1' }
const brown: Color = { color: '#986a44', border: '#cdab8f' }
const green: Color = { color: '#33d17a', border: '#8ff0a4' }
const orange: Color = { color: '#ff7800', border: '#ffbe6f' }
const purple: Color = { color: '#9141ac', border: '#dc8add' }
const red: Color = { color: '#e01b24', border: '#f66151' }
const yellow: Color = { color: '#f6d32d', border: '#f9f06b' }
const colors = [blue, brown, green, orange, purple, red, yellow]

class ColorGenerator {
  #bag: Color[] = []

  take() {
    if (this.#bag.length === 0) this.#bag = shuffle([...colors])

    const color = this.#bag.pop()

    if (color == null) throw new Error('Cor não definida???')
    return color
  }
}

export default new ColorGenerator()