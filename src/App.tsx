import { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";
import { Board } from "./components/Board";
import { Menu } from "./components/Menu";
import { useKeyboard } from "./hooks/useKeyboard";
import { useTetris } from "./tetris";
import { LEVEL_SPEED } from "./tetris/config";

export function App() {
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
    <main className="flex flex-row justify-center gap-8 bg-neutral-800 text-white h-screen">
      <Board />
      <Menu />
    </main>
  );
}
