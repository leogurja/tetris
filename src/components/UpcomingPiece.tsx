import { useMemo } from "react";
import { BlockType, useTetris } from "../tetris";
import { Cell } from "./Cell";

export function UpcomingPiece() {
  const upcomingPiece = useTetris((t) => t.upcomingPiece());

  const board = useMemo(() => {
    const board = Array(4)
      .fill([])
      .map(() => ["", "", "", ""] as BlockType[]);

    upcomingPiece.blocks.forEach((b) => {
      board[b.y][b.x] = b.type;
    });

    return board;
  }, [upcomingPiece]);

  return (
    <div className="justify-self-center w-fit rounded-2xl p-2 m-2 select-none border border-neutral-700 bg-neutral-900">
      {board.map((row, rowIndex) => (
        <div className="flex" key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <Cell key={cellIndex} upcoming type={cell} />
          ))}
        </div>
      ))}
    </div>
  );
}
