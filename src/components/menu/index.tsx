import {
  ArrowClockwiseIcon,
  type Icon,
  PauseIcon,
  PlayIcon,
  SpeakerHighIcon,
  SpeakerSimpleSlashIcon,
} from "@phosphor-icons/react";
import { useAudio } from "../../lib/contexts/audio";
import { useGame } from "../../lib/contexts/game";
import type { GameState } from "../../lib/types/gameState";
import { Button } from "../ui/Button";
import { UpcomingPiece } from "./UpcomingPiece";

const icons: Record<GameState, Icon> = {
  GameOver: ArrowClockwiseIcon,
  Playing: PauseIcon,
  Paused: PlayIcon,
};

export function Menu() {
  const { isMuted, dispatchAudio } = useAudio();
  const { gameState, toggleGameState } = useGame();

  const toggleGameStateIcon = icons[gameState];
  const audioIcon = isMuted ? SpeakerSimpleSlashIcon : SpeakerHighIcon;
  const toggleMute = () => dispatchAudio({ type: "toggleMute" });

  return (
    <aside className="rounded-2xl min-w-20 md:min-w-24 lg:min-w-28 px-2 flex flex-col self-center justify-start gap-3 h-full items-center">
      <UpcomingPiece />
      <Button onClick={toggleGameState} Icon={toggleGameStateIcon} />
      <Button onClick={toggleMute} Icon={audioIcon} />
    </aside>
  );
}
