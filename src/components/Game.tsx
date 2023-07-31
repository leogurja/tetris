import { useTetris } from "../tetris";
import { Board } from "./Board";
import { Menu } from "./menu";

export function Game() {
  const { reset } = useTetris();

  return (
    <main className="container mx-auto grow flex justify-center bg-neutral-800 text-white gap-2 sm:gap-8">
      <Board />
      <Menu reset={reset} />
    </main>
  );
}
