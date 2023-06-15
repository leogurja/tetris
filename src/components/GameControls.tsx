import { ArrowPathIcon, PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { shallow } from "zustand/shallow";
import { useTetris } from "../tetris";
import { play } from "../tetris/audio";

export function GameControls() {
  const [playPause, reset, isGameOver, isPaused] = useTetris(
    (t) => [t.playPause, t.reset, t.isGameOver(), t.isPaused],
    shallow
  );
  const PlayPauseIcon = isPaused ? PlayIcon : PauseIcon;
  useEffect(() => {
    if (isGameOver) play("gameOver");
  }, [isGameOver]);

  return (
    <div className="flex flex-col justify-center gap-5">
      <span className="bg-neutral-600 p-2 rounded-md" onClick={playPause}>
        <PlayPauseIcon className="h-6 aspect-square" />
      </span>
      <span className="bg-neutral-600 p-2 rounded-md" onClick={reset}>
        <ArrowPathIcon className="h-6 aspect-square" />
      </span>
    </div>
  );
}
