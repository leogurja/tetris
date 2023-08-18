import { For } from "million/react";
import GameState from "../tetris/gameState";
import { BoardType } from "../tetris/types";
import Cell from "./Cell";

interface BoardProps {
  gameState: GameState;
  board: BoardType;
}

export default function Board({ gameState, board }: BoardProps) {
  return (
    <div
      className={`grid grid-cols-10 self-stretch place-content-end aspect-[1/2] rounded-2xl p-2 select-none border border-neutral-700 shadow-neutral-950 shadow-md bg-neutral-900 transition-all ${
        gameState === GameState.Playing ? "" : "blur-sm"
      }`}
    >
      <For each={board}>
        {(cell, cellIndex) => <Cell type={cell} key={cellIndex} />}
      </For>
    </div>
  );
}
