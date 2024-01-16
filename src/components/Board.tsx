import GameState from "../tetris/gameState";
import { BoardType } from "../tetris/types";

interface BoardProps {
	gameState: GameState;
	board: BoardType;
}

export default function Board({ gameState, board }: BoardProps) {
	return (
		<main
			className={`aspect-[1/2] place-content-end gap-px grid grid-cols-10 rounded-2xl p-2 select-none border border-neutral-700 shadow-neutral-950 shadow-md bg-neutral-900 transition-all ${
				gameState === GameState.Playing ? "" : "blur-sm"
			}`}
		>
			{board.map((cell, index) => (
				<div
					className={`w-full aspect-square ${cell}`}
					// biome-ignore lint/suspicious/noArrayIndexKey: the order of the array never changes
					key={index}
				/>
			))}
		</main>
	);
}
