import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { floorAtom, isRunningAtom, pieceAtom, render } from "../tetris";
import { Cell } from "./Cell";

export function Board() {
  const piece = useAtomValue(pieceAtom);
  const floor = useAtomValue(floorAtom);
  const isRunning = useAtomValue(isRunningAtom);

  const board = useMemo(() => render(piece, floor), [piece, floor]);

  return (
    <div
      className={`grid grid-cols-10 gap-0 grow-0 shrink self-stretch place-content-end aspect-[1/2] rounded-2xl p-2 select-none border border-neutral-700 shadow-neutral-950 shadow-md bg-neutral-900 transition-all ${
        isRunning ? "" : "blur-sm"
      }`}
    >
      {board.map((cell, cellIndex) => (
        <Cell type={cell} key={cellIndex} />
      ))}
    </div>
  );
}
