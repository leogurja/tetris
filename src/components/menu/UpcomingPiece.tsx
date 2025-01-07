import { useMemo } from "react";
import { useTetris } from "../../tetris";
import type { BlockType, BoardType } from "../../tetris/types";
import { Cell } from "../Cell";

export function UpcomingPiece() {
  const [nextPiece] = useTetris((t) => [t.nextPiece]);

  const board = useMemo<BoardType>(() => {
    const board = new Array<BlockType>(4 * 4).fill("");

    for (const block of nextPiece.blocks) {
      board[block.y * 4 + block.x] = block.type;
    }

    return board;
  }, [nextPiece]);

  return (
    <div className="grid grid-cols-4 w-full aspect-square place-content-center rounded-xl p-1 select-none bg-neutral-900">
      {board.map((cell, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: array is never reordered
        <Cell upcoming variant={cell} key={index} />
      ))}
    </div>
  );
}
