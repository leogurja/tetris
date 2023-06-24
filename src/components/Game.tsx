import { ArrowPathIcon, PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import { useAtomValue } from "jotai";
import { levelAtom, recordAtom, scoreAtom, useTetris } from "../tetris";
import { useAudio } from "../tetris/useAudio";
import { Board } from "./Board";
import { Button } from "./menu/Button";
import { LabeledValue } from "./menu/LabeledValue";
import { Slider } from "./menu/Slider";
import { UpcomingPiece } from "./menu/UpcomingPiece";

export function Game() {
  const { musicVolume, setMusicVolume, volume, setVolume } = useAudio();
  const level = useAtomValue(levelAtom);
  const score = useAtomValue(scoreAtom);
  const record = useAtomValue(recordAtom);

  // const { isRunning, isGameOver, setIsRunning} =
  const { reset, isRunning, isGameOver, setIsPaused } = useTetris();

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
    <main className="container mx-auto items-center justify-center bg-neutral-800 text-white flex gap-2 sm:gap-8">
      <Board isRunning={isRunning} />
      <aside className="bg-neutral-700 rounded-2xl p-4 gap-4 sm:p-6 flex flex-col self-stretch justify-between">
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
    </main>
  );
}
