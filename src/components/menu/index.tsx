import {
  ArrowClockwiseIcon,
  type Icon,
  PauseIcon,
  PlayIcon,
  SpeakerHighIcon,
  SpeakerSimpleSlashIcon,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button-icon";
import type { GameState } from "@/lib/constants/game-state";
import { useTetris } from "@/tetris";
import { UpcomingPiece } from "./upcoming-piece";

const icons: Record<GameState, Icon> = {
  GameOver: ArrowClockwiseIcon,
  Playing: PauseIcon,
  Paused: PlayIcon,
  Initial: PlayIcon,
};

export function Menu() {
  const [gameState, toggleGameState, isMuted, toggleIsMuted] = useTetris(
    (t) => [t.gameState, t.toggleGameState, t.isMuted, t.toggleIsMuted]
  );

  const soundIcon = isMuted ? SpeakerSimpleSlashIcon : SpeakerHighIcon;

  return (
    <aside className="flex h-full w-20 flex-col items-center justify-start gap-3 self-center rounded-2xl px-2 md:min-w-24 lg:min-w-28">
      <UpcomingPiece />
      <Button icon={icons[gameState]} onClick={toggleGameState} />
      <Button icon={soundIcon} onClick={toggleIsMuted} />
    </aside>
  );
}
