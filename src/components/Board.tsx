import { useAtomValue } from "jotai";
import { useMemo } from "react";
import {
  GameState,
  floorAtom,
  gameStateAtom,
  pieceAtom,
  render,
} from "../tetris";
import { Cell } from "./Cell";

export function Board() {
  const piece = useAtomValue(pieceAtom);
  const floor = useAtomValue(floorAtom);
  const gameState = useAtomValue(gameStateAtom);

  const board = useMemo(() => render(piece, floor), [piece, floor]);

  return (
    <div
      className={`grid grid-cols-10 self-stretch place-content-end aspect-[1/2] rounded-2xl p-2 select-none border border-neutral-700 shadow-neutral-950 shadow-md bg-neutral-900 transition-all ${
        gameState === GameState.Playing ? "" : "blur-sm"
      }`}
    >
      {board.map((cell, cellIndex) => (
        <Cell type={cell} key={cellIndex} />
      ))}
    </div>
  );
}
