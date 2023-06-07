import Bag from "./bag";
import Piece, { RotationMode } from "../objects/piece";
import Block from "../objects/block";
import { PIECE_STARTING_X, PIECE_STARTING_Y } from "../config";

const i = {
  blocks: [
    { x: 0, y: 0 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
  ],
  rotationMode: RotationMode.Flip,
  color:
    "bg-orange-600 border-2 border-l-orange-400 border-t-orange-400 border-b-orange-800 border-r-orange-800",
};

const j = {
  blocks: [
    { x: 0, y: 0 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
  ],
  rotationMode: RotationMode.Normal,
  color:
    "bg-purple-600 border-2 border-l-purple-400 border-t-purple-400 border-b-purple-800 border-r-purple-800",
};

const l = {
  blocks: [
    { x: 0, y: 0 },
    { x: -1, y: 1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
  ],
  rotationMode: RotationMode.Normal,
  color:
    "bg-blue-600 border-2 border-l-blue-400 border-t-blue-400 border-b-blue-800 border-r-blue-800",
};

const o = {
  blocks: [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
  ],
  rotationMode: RotationMode.None,
  color:
    "bg-red-600 border-2 border-l-red-400 border-t-red-400 border-b-red-800 border-r-red-800",
};

const s = {
  blocks: [
    { x: 0, y: 0 },
    { x: -1, y: 1 },
    { x: 0, y: 1 },
    { x: 1, y: 0 },
  ],
  rotationMode: RotationMode.Flip,
  color:
    "bg-sky-400 border-2 border-l-sky-200 border-t-sky-200 border-b-sky-600 border-r-sky-600",
};

const t = {
  blocks: [
    { x: 0, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 0 },
  ],
  rotationMode: RotationMode.Normal,
  color:
    "bg-yellow-400 border-2 border-l-yellow-200 border-t-yellow-200 border-b-yellow-600 border-r-yellow-600",
};

const z = {
  blocks: [
    { x: 0, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ],
  rotationMode: RotationMode.Flip,
  color:
    "bg-green-600 border-2 border-l-green-400 border-t-green-400 border-b-green-800 border-r-green-800",
};

export default new Bag(
  [i, j, l, o, s, t, z].map(
    (p) =>
      new Piece({
        blocks: p.blocks.map(
          (b) =>
            new Block(b.x + PIECE_STARTING_X, b.y + PIECE_STARTING_Y, p.color)
        ),
        rotationMode: p.rotationMode,
      })
  )
);
