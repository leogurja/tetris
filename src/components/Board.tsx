import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { floorAtom, pieceAtom, render } from "../tetris";
import { Cell } from "./Cell";

interface BoardProps {
  isRunning: boolean;
}

export function Board({ isRunning }: BoardProps) {
  const piece = useAtomValue(pieceAtom);
  const floor = useAtomValue(floorAtom);

  const board = useMemo(() => render(piece, floor), [piece, floor]);

  return (
    <div
      className={`rounded-2xl p-2 select-none border border-neutral-700 shadow-neutral-950 shadow-md bg-neutral-900 transition-all ${
        isRunning ? "" : "blur-sm"
      }`}
    >
      {board.map((row, rowIndex) => (
        <div className="flex" key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <Cell type={cell} key={cellIndex} />
          ))}
        </div>
      ))}
    </div>
  );
}
