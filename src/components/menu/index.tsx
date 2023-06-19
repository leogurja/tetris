import { GameControls } from "./GameControls";
import { Score } from "./Score";
import { UpcomingPiece } from "./UpcomingPiece";
import { VolumeControls } from "./VolumeControls";

export function Menu() {
  return (
    <aside className="bg-neutral-700 rounded-2xl p-4 gap-4 sm:p-6 flex flex-col self-stretch justify-between">
      <div className="flex w-full justify-stretch gap-2 sm:gap-5">
        <GameControls />
        <UpcomingPiece />
      </div>
      <VolumeControls />
      <Score />
    </aside>
  );
}
