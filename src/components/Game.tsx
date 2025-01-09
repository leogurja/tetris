import { createEffect, onCleanup } from "solid-js";
import { gameStore } from "../tetris/game";
import { tickRate } from "../tetris/gameControl";
import { Board } from "./Board";
import { Statistics } from "./Statistics";
import { Controls } from "./controls";
import { Menu } from "./menu";

export function Game() {
  createEffect(() => {
    if (tickRate() <= 0) return;

    const intervalId = setInterval(() => gameStore.send({ type: "update" }), tickRate());

    onCleanup(() => clearInterval(intervalId));
  });

  return (
    <main class="aspect-[9/16] max-w-full h-full flex flex-col items-center p-2">
      <Statistics />
      <section class="flex h-full w-full justify-center">
        <Board />
        <Menu />
      </section>
      <Controls />
    </main>
  );
}
