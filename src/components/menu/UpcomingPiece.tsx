import { useMemo } from "react";
import { BlockType, Piece } from "../../tetris";
import { Cell } from "../Cell";

export function UpcomingPiece() {
  const upcomingPiece = Piece.peek();

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
    <div className="grid grid-cols-4 grow rounded-md p-2 select-none bg-neutral-900">
      {board.map((row, rowIndex) =>
        row.map((cell, cellIndex) => (
          <Cell key={`${rowIndex}${cellIndex}`} upcoming type={cell} />
        ))
      )}
    </div>
  );
}
