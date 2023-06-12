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
    onKeyDown: {
      ArrowDown: () => setTickRate(50),
      ArrowUp: rotate,
      ArrowLeft: () => move(-1),
      ArrowRight: () => move(1),
      " ": drop,
    },
    onKeyUp: {
      ArrowDown: () => setTickRate(LEVEL_SPEED(level())),
    },
    isRunning,
    allowHold: ["ArrowLeft", "ArrowRight"],
  });

  useEffect(() => {
    if (!isRunning || isGameOver) return;

    const intervalId = setInterval(update, tickRate);

    return () => clearInterval(intervalId);
  }, [tickRate, isRunning, isGameOver, update]);

  return (
    <div className="flex flex-col md:flex-row justify-center gap-8">
      <Board />
      <Menu />
    </div>
  );
}
