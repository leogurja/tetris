import { ArrowPathIcon, PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import { Dispatch, SetStateAction } from "react";
import GameState from "../../tetris/gameState";
import Button from "./Button";
import LabeledValue from "./LabeledValue";
import Slider from "./Slider";
import UpcomingPiece from "./UpcomingPiece";

interface MenuProps {
	gameState: GameState;
	toggleGameState: () => void;
	level: number;
	score: number;
	record: number;
	musicVolume: number;
	volume: number;
	setMusicVolume: Dispatch<SetStateAction<number>>;
	setVolume: Dispatch<SetStateAction<number>>;
}

export default function Menu({
	gameState,
	toggleGameState,
	level,
	score,
	record,
	musicVolume,
	setMusicVolume,
	volume,
	setVolume,
}: MenuProps) {
	const icons: Record<GameState, typeof ArrowPathIcon> = {
		GameOver: ArrowPathIcon,
		Playing: PauseIcon,
		Paused: PlayIcon,
	};

	return (
		<aside className="bg-neutral-700 rounded-2xl p-4 gap-4 sm:p-6 flex flex-col self-start">
			<div className="flex items-stretch justify-center gap-2 sm:gap-5">
				<Button onClick={toggleGameState} Icon={icons[gameState]} />
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
