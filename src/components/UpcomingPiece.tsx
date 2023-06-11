import { useMemo } from "react";
import { colors } from "../colors";
import { BlockType, useTetris } from "../tetris";
import { PIECE_STARTING_X, PIECE_STARTING_Y } from "../tetris/config";

export function UpcomingPiece() {
  const piece = useTetris((t) => t.upcomingPiece);

  const board = useMemo(() => {
    const board = Array(4)
      .fill([])
      .map(() => ["", "", "", ""] as BlockType[]);

    piece
      .translate(1 - PIECE_STARTING_X, 1 - PIECE_STARTING_Y)
      .blocks.forEach((b) => {
        board[b.y][b.x] = b.type;
      });

    return board;
  }, [piece]);

  return (
    <div className="justify-self-center w-fit rounded-2xl p-2 m-2 select-none border border-neutral-700 bg-neutral-900">
      {board.map((row, rowIndex) => (
        <div className="flex" key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <div
              key={cellIndex}
              className={`upcoming-${cell} h-8 w-8 ${colors[cell]}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
