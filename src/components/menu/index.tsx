import {
  ArrowClockwise,
  Icon,
  Pause,
  Play,
  SpeakerHigh,
  SpeakerSimpleSlash,
} from "@phosphor-icons/react";
import useTetris from "../../tetris";
import GameState from "../../tetris/gameState";
import { Button } from "../ui/Button";
import { UpcomingPiece } from "./UpcomingPiece";

const icons: Record<GameState, Icon> = {
  GameOver: ArrowClockwise,
  Playing: Pause,
  Paused: Play,
};

export function Menu() {
  const [gameState, toggleGameState, isMuted, toggleIsMuted] = useTetris(
    (t) => [t.gameState, t.toggleGameState, t.isMuted, t.toggleIsMuted],
  );

  return (
    <aside className="rounded-2xl min-w-20 md:min-w-24 lg:min-w-28 px-2 flex flex-col self-center justify-start gap-3 h-full items-center">
      <UpcomingPiece />
      <Button onClick={toggleGameState} Icon={icons[gameState]} />
      <Button
        onClick={toggleIsMuted}
        Icon={isMuted ? SpeakerSimpleSlash : SpeakerHigh}
      />
    </aside>
  );
}
