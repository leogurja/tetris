import { useCallback, useEffect, useState } from "react";
import { TICK_RATE } from "../tetris/config";
import Tetris from "../tetris";

export default function useTetris() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [tetris, setTetris] = useState<Tetris | null>(null);
  const [board, setBoard] = useState<string[][] | null>(null);

  useEffect(() => {
    if (!isPlaying || tetris == null) return;

    const intervalId = setInterval(() => {
      setIsPlaying(tetris.update());
      setBoard(tetris.render());
    }, TICK_RATE);
    return () => clearInterval(intervalId);
  }, [tetris, isPlaying]);

  const reset = useCallback(() => {
    const tetris = new Tetris();
    setTetris(tetris);
    setIsPlaying(true);
    setBoard(tetris.render());
  }, []);

  return { board, isPlaying, reset };
}
