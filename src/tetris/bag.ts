import { PIECES } from "@/lib/constants/pieces";
import { Piece, type PieceOptions } from "./piece";

let bag: PieceOptions[] = [];

export function take() {
  if (bag.length === 0) refill();
  // biome-ignore lint/style/noNonNullAssertion: We've just refilled the bag if necessary
  return new Piece(bag.pop()!);
}

export function peek() {
  if (bag.length === 0) refill();
  // biome-ignore lint/style/noNonNullAssertion: We've just refilled the bag if necessary
  return new Piece(bag.at(-1)!);
}

function refill() {
  bag = PIECES.toSorted(() => Math.random() - 0.5);
}
