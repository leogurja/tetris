import { useMemo } from "react";
import Piece from "../../tetris/piece";
import { BoardType } from "../../tetris/types";

export default function UpcomingPiece() {
	const upcomingPiece = Piece.peek();

	const board = useMemo<BoardType>(() => {
		const board = Array(4 * 4).fill("");

		for (const block of upcomingPiece.blocks) {
			board[block.y * 4 + block.x] = block.type;
		}

		return board;
	}, [upcomingPiece]);

	return (
		<div className="grid grid-cols-4 w-full gap-px aspect-square place-content-center rounded-xl p-1 select-none bg-neutral-900">
			{board.map((cell, index) => (
				<div
					className={`upcoming aspect-square flex border sm:border-2 border-transparent ${cell}`}
					// biome-ignore lint/suspicious/noArrayIndexKey: the order of the array never changes
					key={index}
				/>
			))}
		</div>
	);
}
