import { useEffect, useState } from "react";
import { TICK_MS } from "./config";
import { useTetris } from "./useTetris";
import { shallow } from "zustand/shallow";
import { useKeyboard } from "./useKeyboard";

enum TickRate {
  Normal = TICK_MS,
  Fast = TICK_MS / 15,
  ReallyFast = TICK_MS / 100,
}

export function useGameLoop() {
  const [tickRate, setTickRate] = useState(TickRate.Normal);
  const [isRunning, isGameOver, rotate, move, update] = useTetris(
    (s) => [s.isRunning, s.isGameOver, s.rotate, s.move, s.update],
    shallow
  );

  useKeyboard({
    onKeyDown: (event) => {
      if (event.key === "ArrowDown" && !event.repeat) {
        setTickRate(TickRate.Fast);
      } else if (event.key === "ArrowUp") {
        rotate();
      } else if (event.key === "ArrowLeft") {
        move(-1);
      } else if (event.key === "ArrowRight") {
        move(1);
      }
    },
    onKeyUp: (event) => {
      if (event.key === "ArrowDown") {
        setTickRate(TickRate.Normal);
      }
    },
    isRunning,
  });

  useEffect(() => {
    if (!isRunning || isGameOver) return;

    const intervalId = setInterval(update, tickRate);

    return () => clearInterval(intervalId);
  }, [tickRate, isRunning, isGameOver, update]);
}
