import { shallow } from "zustand/shallow";
import { useTetris } from "../tetris";
import { Cell } from "./Cell";

export function Board() {
  const [board, isRunning] = useTetris(
    (t) => [t.board(), t.isRunning, t.piece],
    shallow
  );

  return (
    <div
      className={`rounded-2xl p-2 select-none border border-neutral-700 shadow-neutral-950 shadow-md bg-neutral-900 transition-all ${
        isRunning() ? "" : "blur-sm"
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
