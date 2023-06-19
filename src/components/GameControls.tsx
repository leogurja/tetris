import { ArrowPathIcon, PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { shallow } from "zustand/shallow";
import { useTetris } from "../tetris";
import { useAudio } from "../tetris/audio";
import { Button } from "./Button";

export function GameControls() {
  const [playPause, reset, isGameOver, isPaused] = useTetris(
    (t) => [t.playPause, t.reset, t.isGameOver(), t.isPaused],
    shallow
  );
  const play = useAudio((state) => state.play);
  const PlayPauseIcon = isPaused ? PlayIcon : PauseIcon;
  useEffect(() => {
    if (isGameOver) play("gameOver");
    // não precisamos rodar novamente quando play mudar
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGameOver]);

  return (
    <div className="flex flex-col justify-center gap-5 w-full">
      <Button onClick={playPause} Icon={PlayPauseIcon} />
      <Button onClick={reset} Icon={ArrowPathIcon} />
    </div>
  );
}
