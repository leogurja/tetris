import { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";
import { useKeyboard } from "../hooks/useKeyboard";
import { useTetris } from "../tetris";
import { LEVEL_SPEED } from "../tetris/config";
import { Board } from "./Board";
import { Menu } from "./Menu";

export function Game() {
  const [tickRate, setTickRate] = useState(LEVEL_SPEED(0));
  const [isRunning, isGameOver, rotate, move, update, drop, level] = useTetris(
    (s) => [
      s.isRunning,
      s.isGameOver,
      s.rotate,
      s.move,
      s.update,
      s.drop,
      s.level,
    ],
    shallow
  );

  useKeyboard({
    onKeyDown: (event) => {
      if (!event.repeat) {
        if (event.key === "ArrowDown") return setTickRate(50);
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
      if (event.key === "ArrowDown") setTickRate(LEVEL_SPEED(level()));
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
