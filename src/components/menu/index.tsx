import {
	ArrowPathIcon,
	PauseIcon,
	PlayIcon,
	SpeakerWaveIcon,
	SpeakerXMarkIcon,
} from "@heroicons/react/20/solid";
import useTetrisStore from "../../tetris";
import GameState from "../../tetris/gameState";
import Button from "./Button";
import UpcomingPiece from "./UpcomingPiece";

export default function Menu() {
	const [gameState, toggleGameState, isMuted, toggleIsMuted] = useTetrisStore(
		(t) => [t.gameState, t.toggleGameState, t.isMuted, t.toggleIsMuted],
	);

	const icons: Record<GameState, typeof ArrowPathIcon> = {
		GameOver: ArrowPathIcon,
		Playing: PauseIcon,
		Paused: PlayIcon,
	};

	return (
		<aside className="rounded-2xl min-w-20 md:min-w-24 lg:min-w-28 px-2 flex flex-col self-center justify-start gap-3 h-full items-center">
			<UpcomingPiece />
			<Button onClick={toggleGameState} Icon={icons[gameState]} />
			<Button
				onClick={toggleIsMuted}
				Icon={isMuted ? SpeakerXMarkIcon : SpeakerWaveIcon}
			/>
		</aside>
	);
}
