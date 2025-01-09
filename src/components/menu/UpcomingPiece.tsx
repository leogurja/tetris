import { useSelector } from "@xstate/store/solid";
import { For } from "solid-js";
import { gameStore } from "../../tetris/game";
import type { PieceType } from "../../tetris/objects/piece";
import { Cell } from "../Cell";

export function UpcomingPiece() {
  const upcomingPiece = useSelector(gameStore, (g) => g.context.nextPiece);

  const board = () => {
    const board = new Array<PieceType | "">(4 * 4).fill("");

    for (const block of upcomingPiece().blocks) {
      board[block.y * 4 + block.x] = block.type;
    }
    return board;
  };

  return (
    <div class="grid grid-cols-4 w-full aspect-square place-content-center rounded-xl p-1 select-none bg-neutral-900">
      <For each={board()}>{(cell) => <Cell upcoming variant={cell} />}</For>
    </div>
  );
}
