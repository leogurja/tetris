import { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";
import { useKeyboard } from "../hooks/useKeyboard";
import { useTetris } from "../tetris";
import { useAudio } from "../tetris/audio";
import { Board } from "./Board";
import { Menu } from "./Menu";

export function Game() {
  const [rotate, move, update, drop, defaultTickRate] = useTetris(
    (s) => [s.rotate, s.move, s.update, s.drop, s.tickRate()],
    shallow
  );
  const [tickRate, setTickRate] = useState(defaultTickRate);
  const play = useAudio((state) => state.play);

  useEffect(() => {
    setTickRate(defaultTickRate);
    if (defaultTickRate !== 1000) play("levelUp");
    // não precisamos rodar novamente quando play mudar
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultTickRate]);

  useKeyboard({
    onKeyDown: {
      ArrowDown: () => setTickRate(50),
      ArrowUp: () => {
        play("click");
        rotate();
      },
      ArrowLeft: () => {
        play("click");
        move(-1);
      },
      ArrowRight: () => {
        play("click");
        move(1);
      },
      " ": () => {
        play("drop");
        drop();
      },
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
