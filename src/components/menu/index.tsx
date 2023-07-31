import { ArrowPathIcon, PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import { useAtom, useAtomValue } from "jotai";
import {
  GameState,
  gameStateAtom,
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
}

export function Menu({ reset }: MenuProps) {
  const { musicVolume, setMusicVolume, volume, setVolume } = useAudio();
  const [gameState, setGameState] = useAtom(gameStateAtom);
  const level = useAtomValue(levelAtom);
  const score = useAtomValue(scoreAtom);
  const record = useAtomValue(recordAtom);

  const icons: Record<GameState, typeof ArrowPathIcon> = {
    GameOver: ArrowPathIcon,
    Playing: PauseIcon,
    Paused: PlayIcon,
  };

  const playPause = () => {
    return setGameState((p) => {
      switch (p) {
        case GameState.Playing:
          return GameState.Paused;
        case GameState.Paused:
          return GameState.Playing;
        case GameState.GameOver:
          reset();
          return GameState.Playing;
      }
    });
  };

  return (
    <aside className="bg-neutral-700 rounded-2xl p-4 gap-4 sm:p-6 flex flex-col self-start">
      <div className="flex items-stretch justify-center gap-2 sm:gap-5">
        <Button onClick={playPause} Icon={icons[gameState]} />
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
