import { ArrowPathIcon, PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import { shallow } from "zustand/shallow";
import { useTetris } from "../tetris";
import { Scoreboard } from "./Scoreboard";
import { UpcomingPiece } from "./UpcomingPiece";

export function Menu() {
  const [playPause, isGameOver, isRunning] = useTetris(
    (t) => [t.playPause, t.isGameOver(), t.isRunning()],
    shallow
  );
  const Icon = isGameOver ? ArrowPathIcon : isRunning ? PauseIcon : PlayIcon;

  return (
    <aside className="bg-neutral-700 rounded-2xl px-10 py-2">
      <UpcomingPiece />
      {/* não é um <button /> pra não capturar o pressionamento do espaço */}
      <span
        className="inline-flex bg-neutral-600 p-2 rounded-md"
        onClick={playPause}
      >
        <Icon className="h-6 w-6" />
      </span>
      <Scoreboard />
    </aside>
  );
}
