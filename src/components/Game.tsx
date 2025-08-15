import { useGame } from "../lib/contexts/game";
import { useKeyboard } from "../lib/hooks/useKeyboard";
import { Board } from "./Board";
import { Statistics } from "./Statistics";
import { Controls } from "./controls";
import { Menu } from "./menu";

export function Game() {
  const { dispatch, dropPiece, toggleGameState, setIsAccelerated } = useGame();

  // keyboard events
  useKeyboard({
    onKeyDown: {
      ArrowDown: () => setIsAccelerated(true),
      ArrowUp: () => dispatch({ type: "rotate" }),
      ArrowLeft: () => dispatch({ type: "move", x: -1 }),
      ArrowRight: () => dispatch({ type: "move", x: 1 }),
      " ": dropPiece,
      Escape: toggleGameState,
    },
    onKeyUp: {
      ArrowDown: () => setIsAccelerated(false),
    },
    allowRepeat: ["ArrowLeft", "ArrowRight", "ArrowUp"],
  });

  return (
    <>
      <main className="aspect-9/16 max-w-full h-full flex flex-col items-center p-2">
        <Statistics />
        <section className="flex h-full w-full justify-center">
          <Board />
          <Menu />
        </section>
        <Controls />
      </main>
    </>
  );
}
