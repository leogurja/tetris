type Key = 'ArrowUp' | 'ArrowLeft' | 'ArrowRight' | 'ArrowDown'

export default class Keyboard {
  keysPressed: Record<Key, boolean> = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
  }

  #callbacks: Record<Key, () => unknown> = {
    ArrowUp: () => null,
    ArrowDown: () => null,
    ArrowLeft: () => null,
    ArrowRight: () => null
  }

  init(callbacks: Record<Key, () => void>) {
    this.#callbacks = callbacks

    document.addEventListener('keydown', event => {
      if (this.#isArrowKey(event.key)) {
        this.keysPressed[event.key] = true
      }
    })

    document.addEventListener('keyup', event => {
      if (this.#isArrowKey(event.key)) {
        this.keysPressed[event.key] = false
      }
    })
  }

  update() {
    for (const key of Object.keys(this.keysPressed) as Key[]) {
      if (!this.keysPressed[key]) continue
      this.#callbacks[key]?.()
    }
  }

  #isArrowKey(key: string): key is Key {
    return key.startsWith('Arrow')
  }
}