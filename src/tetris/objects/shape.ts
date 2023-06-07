import Position from "./position";

export enum RotationMode {
  BackAndForth,
  Normal,
  None,
}

class Shape {
  #rotationMode: RotationMode;
  #reverseRotation = false;

  constructor(public shape: Position[], rotationMode: RotationMode) {
    this.#rotationMode = rotationMode;
  }

  rotate() {
    if (this.#rotationMode === RotationMode.None) return;
    if (this.#rotationMode === RotationMode.BackAndForth) {
      this.#reverseRotation = !this.#reverseRotation;

      if (this.#reverseRotation) {
        this.shape = this.shape.map((b) => ({ x: b.y, y: -b.x }));
        return;
      }
    }

    this.shape = this.shape.map((b) => ({ x: -b.y, y: b.x }));
  }
}

export default Shape;
