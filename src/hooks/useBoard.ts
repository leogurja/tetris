import { useCallback, useEffect, useState } from "react";
import { TICK_MS } from "../tetris/config";
import tetris from "../tetris";

export default function useBoard() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [board, setBoard] = useState<string[][] | null>(tetris.render());
  const [tickRate, setTickRate] = useState(TICK_MS);

  useEffect(() => {
    if (!isPlaying) return;

    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.repeat) return;
      if (event.key === "ArrowDown") {
        setTickRate(TICK_MS / 10);
      } else if (event.key === "ArrowUp") {
        tetris.rotate();
        setBoard(tetris.render());
      }
    };

    const keyUpHandler = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        setTickRate(TICK_MS);
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
      document.removeEventListener("keydown", keyUpHandler);
      setTickRate(TICK_MS);
    };
  }, [isPlaying]);

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
