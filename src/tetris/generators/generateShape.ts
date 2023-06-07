import Bag from "./bag";
import Shape, { RotationMode } from "../objects/shape";

const i = {
  shape: [
    { x: -1, y: 0 },
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
  ],
  rotationMode: RotationMode.BackAndForth,
};

const j = {
  shape: [
    { x: -1, y: 0 },
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
  ],
  rotationMode: RotationMode.Normal,
};

const l = {
  shape: [
    { x: -1, y: 1 },
    { x: -1, y: 0 },
    { x: 0, y: 0 },
    { x: 1, y: 0 },
  ],
  rotationMode: RotationMode.Normal,
};

const o = {
  shape: [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
  ],
  rotationMode: RotationMode.None,
};

const s = {
  shape: [
    { x: -1, y: 1 },
    { x: 0, y: 1 },
    { x: 0, y: 0 },
    { x: 1, y: 0 },
  ],
  rotationMode: RotationMode.BackAndForth,
};

const t = {
  shape: [
    { x: -1, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 0 },
  ],
  rotationMode: RotationMode.Normal,
};

const z = {
  shape: [
    { x: -1, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ],
  rotationMode: RotationMode.BackAndForth,
};

const bag = new Bag([i, j, l, o, s, t, z]);
export default function generateShape() {
  const chosen = bag.take();

  return new Shape(structuredClone(chosen.shape), chosen.rotationMode);
}
