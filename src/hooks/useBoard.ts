import { useCallback, useEffect, useState } from "react";
import { TICK_MS } from "../tetris/config";
import tetris from "../tetris";
import useKeyboard from "./useKeyboard";

export default function useBoard() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [board, setBoard] = useState<string[][] | null>(tetris.render());
  const [tickRate, setTickRate] = useState(TICK_MS);

  useKeyboard({
    onKeyDown: (event) => {
      if (event.key === "ArrowDown" && !event.repeat) {
        setTickRate(TICK_MS / 15);
      } else if (event.key === "ArrowUp") {
        tetris.rotate();
        setBoard(tetris.render());
      } else if (event.key === "ArrowLeft") {
        tetris.moveLeft();
        setBoard(tetris.render());
      } else if (event.key === "ArrowRight") {
        tetris.moveRight();
        setBoard(tetris.render());
      }
    },
    onKeyUp: (event) => {
      if (event.key === "ArrowDown") {
        setTickRate(TICK_MS);
      }
    },
  });

  useEffect(() => {
    if (!isPlaying) return;

    const intervalId = setInterval(() => {
      tetris.update();
      setIsPlaying(!tetris.isGameOver);
      setBoard(tetris.render());
    }, tickRate);

    return () => clearInterval(intervalId);
  }, [tickRate, isPlaying]);

  const reset = useCallback(() => {
    tetris.reset();
    setIsPlaying(true);
    setBoard(tetris.render());
  }, []);

  return { board, isPlaying, reset };
}
