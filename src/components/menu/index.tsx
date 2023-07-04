import { ArrowPathIcon, PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import { SetStateAction, useAtomValue } from "jotai";
import {
  isGameOverAtom,
  isRunningAtom,
  levelAtom,
  recordAtom,
  scoreAtom,
} from "../../tetris";
import { useAudio } from "../../tetris/useAudio";
import { Button } from "./Button";
import { LabeledValue } from "./LabeledValue";
import { Slider } from "./Slider";
import { UpcomingPiece } from "./UpcomingPiece";

interface MenuProps {
  reset: () => void;
  setIsPaused: (value: SetStateAction<boolean>) => void;
}

export function Menu({ reset, setIsPaused }: MenuProps) {
  const { musicVolume, setMusicVolume, volume, setVolume } = useAudio();
  const isGameOver = useAtomValue(isGameOverAtom);
  const isRunning = useAtomValue(isRunningAtom);
  const level = useAtomValue(levelAtom);
  const score = useAtomValue(scoreAtom);
  const record = useAtomValue(recordAtom);

  const PlayPauseIcon = isGameOver
    ? ArrowPathIcon
    : isRunning
    ? PauseIcon
    : PlayIcon;

  const playPause = () => {
    if (isGameOver) return reset();
    return setIsPaused((p) => !p);
  };

  return (
    <aside className="bg-neutral-700 rounded-2xl p-4 gap-4 sm:p-6 flex flex-col self-start">
      <div className="flex items-stretch justify-center gap-2 sm:gap-5">
        <Button onClick={playPause} Icon={PlayPauseIcon} />
        <UpcomingPiece />
      </div>
      <div className="flex flex-col gap-3">
        <LabeledValue name="music">
          <Slider value={musicVolume} setValue={setMusicVolume} />
        </LabeledValue>
        <LabeledValue name="sfx">
          <Slider value={volume} setValue={setVolume} />
        </LabeledValue>
      </div>
      <LabeledValue name="level">
        <p className="text-lg md:text-xl lg:text-4xl">{level + 1}</p>
      </LabeledValue>
      <LabeledValue name="score">
        <p className="text-lg md:text-xl lg:text-4xl">{score}</p>
      </LabeledValue>
      <LabeledValue name="record">
        <p className="text-lg md:text-xl lg:text-4xl">{record}</p>
      </LabeledValue>
    </aside>
  );
}
