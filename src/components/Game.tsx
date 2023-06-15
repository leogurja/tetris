import { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";
import { useKeyboard } from "../hooks/useKeyboard";
import { useTetris } from "../tetris";
import { play } from "../tetris/audio";
import { Board } from "./Board";
import { Menu } from "./Menu";

export function Game() {
  const [rotate, move, update, drop, defaultTickRate] = useTetris(
    (s) => [s.rotate, s.move, s.update, s.drop, s.tickRate()],
    shallow
  );
  const [tickRate, setTickRate] = useState(defaultTickRate);

  useEffect(() => {
    setTickRate(defaultTickRate);
    if (defaultTickRate !== 1000) play("levelUp");
  }, [defaultTickRate]);

  useKeyboard({
    onKeyDown: {
      ArrowDown: () => setTickRate(50),
      ArrowUp: rotate,
      ArrowLeft: () => move(-1),
      ArrowRight: () => move(1),
      " ": drop,
    },
    onKeyUp: {
      ArrowDown: () => setTickRate(defaultTickRate),
    },
    allowHold: ["ArrowLeft", "ArrowRight"],
  });

  useEffect(() => {
    const intervalId = setInterval(update, tickRate);

    return () => clearInterval(intervalId);
  }, [tickRate, update]);

  return (
    <main className="bg-neutral-800 text-white">
      <div className="flex flex-row justify-center gap-8">
        <Board />
        <Menu />
      </div>
    </main>
  );
}
