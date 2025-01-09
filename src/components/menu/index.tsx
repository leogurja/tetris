import { useSelector } from "@xstate/store/solid";
import { ArrowClockwise, Pause, Play } from "phosphor-solid";
import type { ValidComponent } from "solid-js";
import { Dynamic } from "solid-js/web";
import { gameControlStore } from "../../tetris/gameControl";
import type { GameState } from "../../tetris/objects/gameState";
import { Button } from "../ui/Button";
import { UpcomingPiece } from "./UpcomingPiece";

const icons: Record<GameState, ValidComponent> = {
  gameOver: ArrowClockwise as ValidComponent,
  playing: Pause as ValidComponent,
  paused: Play as ValidComponent,
} as const;

export function Menu() {
  const gameState = useSelector(gameControlStore, (g) => g.context.gameState);
  return (
    <aside class="rounded-2xl min-w-20 md:min-w-24 lg:min-w-28 px-2 flex flex-col self-center justify-start gap-3 h-full items-center">
      <UpcomingPiece />
      <Button onClick={() => gameControlStore.send({ type: "toggleGameState" })}>
        <Dynamic component={icons[gameState()]} size={24} weight="fill" />
      </Button>
      {/* <Button onClick={() => audioControl.sfxVolume } Icon={audioControl.sfxVolume === 0 ? SpeakerSimpleSlash : SpeakerHigh} /> */}
    </aside>
  );
}
