import { ArrowClockwise, type Icon, Pause, Play } from "@phosphor-icons/react";
import { useSelector } from "@xstate/store/react";
import { gameControlStore } from "../../tetris/gameControl";
import type { GameState } from "../../tetris/objects/gameState";
import { Button } from "../ui/Button";
import { UpcomingPiece } from "./UpcomingPiece";

const icons: Record<GameState, Icon> = {
  gameOver: ArrowClockwise,
  playing: Pause,
  paused: Play,
};

export function Menu() {
  const gameState = useSelector(gameControlStore, (g) => g.context.gameState);
  return (
    <aside className="rounded-2xl min-w-20 md:min-w-24 lg:min-w-28 px-2 flex flex-col self-center justify-start gap-3 h-full items-center">
      <UpcomingPiece />
      <Button onClick={() => gameControlStore.send({ type: "toggleGameState" })} Icon={icons[gameState]} />
      {/* <Button onClick={() => audioControl.sfxVolume } Icon={audioControl.sfxVolume === 0 ? SpeakerSimpleSlash : SpeakerHigh} /> */}
    </aside>
  );
}
