import { GameControls } from "./GameControls";
import { Score } from "./Score";
import { UpcomingPiece } from "./UpcomingPiece";
import { VolumeControls } from "./VolumeControls";

export function Menu() {
  return (
    <aside className="bg-neutral-700 rounded-2xl p-6">
      <div className="flex gap-3">
        <GameControls />
        <UpcomingPiece />
      </div>
      <VolumeControls />
      <Score />
    </aside>
  );
}
