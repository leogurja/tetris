import { useGame } from "../lib/contexts/game";
import { GameState } from "../lib/types/gameState";

export function Board() {
  const { board, gameState } = useGame();

  return (
    <main
      className={`aspect-1/2 place-content-end gap-0.5 grid grid-cols-10 rounded-2xl p-2 select-none border border-neutral-700 shadow-neutral-950 shadow-md bg-neutral-900 transition-all ${
        gameState === GameState.Playing ? "" : "blur-sm"
      }`}
    >
      {board.map((cell, index) => (
        <div className={`w-full aspect-square ${cell}`} key={index} />
      ))}
    </main>
  );
}
