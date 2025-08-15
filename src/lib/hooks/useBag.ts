import { useRef } from "react";
import { defaultPieces } from "../constants/pieceTypes";
import type { Piece } from "../types/entities";

export function useBag() {
  const bag = useRef<Piece[]>([]);

  const refill = () =>
    (bag.current = Object.values(defaultPieces).toSorted(
      () => Math.random() - 0.5,
    ));

  const take = () => {
    if (bag.current.length === 0) refill();

    // We've just refilled the bag if necessary
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return bag.current.pop()!;
  };

  const peek = () => {
    if (bag.current.length === 0) refill();

    // We've just refilled the bag if necessary
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return bag.current.at(-1)!;
  };

  const reset = () => refill();

  return { take, peek, reset };
}
