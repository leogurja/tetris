import { useSelector } from "@xstate/store/react";
import { useMemo } from "react";
import { gameStore } from "../../tetris/game";
import type { PieceType } from "../../tetris/objects/piece";
import { Cell } from "../Cell";

export function UpcomingPiece() {
  const upcomingPiece = useSelector(gameStore, (g) => g.context.nextPiece);

  const board = useMemo(() => {
    const board = new Array<PieceType | "">(4 * 4).fill("");

    for (const block of upcomingPiece.blocks) {
      board[block.y * 4 + block.x] = block.type;
    }

    return board;
  }, [upcomingPiece]);

  return (
    <div className="grid grid-cols-4 w-full aspect-square place-content-center rounded-xl p-1 select-none bg-neutral-900">
      {board.map((cell, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: array is never reordered
        <Cell upcoming variant={cell} key={index} />
      ))}
    </div>
  );
}
