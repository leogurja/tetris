import { ArrowPathIcon, PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import { shallow } from "zustand/shallow";
import { useTetris } from "../tetris";

export function Menu() {
  const [playPause, isGameOver, isRunning] = useTetris(
    (t) => [t.playPause, t.isGameOver, t.isRunning],
    shallow
  );
  const score = useTetris((t) => t.score);
  const Icon = isGameOver ? ArrowPathIcon : isRunning ? PlayIcon : PauseIcon;

  return (
    <aside className="bg-neutral-700 rounded-2xl px-10 py-2">
      <p>Score: {score}</p>
      <button className="bg-neutral-600 p-2 rounded-md" onClick={playPause}>
        <Icon className="h-6 w-6" />
      </button>
    </aside>
  );
}
