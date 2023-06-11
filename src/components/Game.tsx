import { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";
import { useKeyboard } from "../hooks/useKeyboard";
import { useTetris } from "../tetris";
import { TICK_MS } from "../tetris/config";
import { Board } from "./Board";
import { Menu } from "./Menu";

enum TickRate {
  Normal = TICK_MS,
  Fast = 50,
}

export function Game() {
  const [tickRate, setTickRate] = useState(TickRate.Normal);
  const [isRunning, isGameOver, rotate, move, update, drop] = useTetris(
    (s) => [s.isRunning, s.isGameOver, s.rotate, s.move, s.update, s.drop],
    shallow
  );

  useKeyboard({
    onKeyDown: (event) => {
      if (!event.repeat) {
        if (event.key === "ArrowDown") return setTickRate(TickRate.Fast);
        else if (event.key === " ") return drop();
        else if (event.key === "ArrowUp") return rotate();
      }
      if (event.key === "ArrowLeft") {
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

  return (
    <div className="flex flex-row justify-center gap-8">
      <Board />
      <Menu />
    </div>
  );
}
