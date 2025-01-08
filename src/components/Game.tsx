import { useEffect } from "react";
import { gameStore } from "../tetris/game";
import { useTickRate } from "../tetris/gameControl";
import { Board } from "./Board";
import { Statistics } from "./Statistics";
import { Controls } from "./controls";
import { Menu } from "./menu";

export function Game() {
  const tickRate = useTickRate();

  useEffect(() => {
    if (tickRate <= 0) return;

    const intervalId = setInterval(() => gameStore.send({ type: "update" }), tickRate);

    return () => clearInterval(intervalId);
  }, [tickRate]);

  return (
    <>
      <main className="aspect-[9/16] max-w-full h-full flex flex-col items-center p-2">
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
