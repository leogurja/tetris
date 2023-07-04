import { useTetris } from "../tetris";
import { Board } from "./Board";
import { Menu } from "./menu";

export function Game() {
  const { reset, setIsPaused } = useTetris();

  /*
  .vwrapper {
  display: flex;
  flex-direction: column;

  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;

  height: 100%;
}
  */

  return (
    <main className="container mx-auto grow flex justify-center bg-neutral-800 text-white gap-2 sm:gap-8">
      <Board />
      <Menu reset={reset} setIsPaused={setIsPaused} />
    </main>
  );
}
