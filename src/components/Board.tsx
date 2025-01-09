import { useSelector } from "@xstate/store/solid";
import { For } from "solid-js";
import { BOARD_HEIGHT, BOARD_WIDTH } from "../tetris/config";
import { gameStore } from "../tetris/game";
import { gameControlStore } from "../tetris/gameControl";
import type { Block } from "../tetris/objects/block";
import { GameState } from "../tetris/objects/gameState";
import type { PieceType } from "../tetris/objects/piece";
import { Cell } from "./Cell";
import { cn } from "./utils/cn";

type BlockType = PieceType | "p" | "";
export function Board() {
  const piece = useSelector(gameStore, (g) => g.context.piece);
  const floor = useSelector(gameStore, (g) => g.context.floor);
  const gameState = useSelector(gameControlStore, (g) => g.context.gameState);
  const board = () => {
    const board = new Array<BlockType>(BOARD_HEIGHT * BOARD_WIDTH).fill("");
    drawBlocks(board, floor().blocks);
    drawBlocks(board, piece().project(floor()).blocks, true);
    drawBlocks(board, piece().blocks);
    return board;
  };

  return (
    <main
      class={cn(
        "aspect-[1/2] place-content-end gap-0.5 grid grid-cols-10 rounded-2xl p-2 select-none border border-neutral-700 shadow-neutral-950 shadow-md bg-neutral-900 transition-all overflow-hidden",
        gameState() !== GameState.Playing && "blur-xs",
      )}
    >
      <For each={board()}>{(cell) => <Cell variant={cell} />}</For>
    </main>
  );
}

function drawBlocks(board: BlockType[], blocks: Block[], projection = false) {
  for (const block of blocks) {
    if (block.y < 0) return;
    board[block.y * BOARD_WIDTH + block.x] = projection ? "p" : block.type;
  }
}
