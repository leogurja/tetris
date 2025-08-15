import { useMemo } from "react";
import { useGame } from "../../lib/contexts/game";
import type { Board, Color } from "../../lib/types/entities";

export function UpcomingPiece() {
  const { nextPiece } = useGame();
  const board = useMemo<Board>(() => {
    const board = Array<Color>(4 * 4).fill("");

    for (const block of nextPiece) {
      board[block.y * 4 + block.x] = block.color;
    }

    return board;
  }, [nextPiece]);

  return (
    <div className="grid grid-cols-4 w-full aspect-square place-content-center rounded-xl p-1 select-none bg-neutral-900">
      {board.map((cell, index) => (
        <div
          className={`upcoming aspect-square flex border border-collapse border-transparent ${cell}`}
          key={index}
        />
      ))}
    </div>
  );
}
