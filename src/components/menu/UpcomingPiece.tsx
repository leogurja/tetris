import { For } from "million/react";
import { useMemo } from "react";
import Piece from "../../tetris/piece";
import { BoardType } from "../../tetris/types";
import Cell from "../Cell";

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
		<div className="grid grid-cols-4 grow place-content-center rounded-md p-2 select-none bg-neutral-900">
			<For each={board}>
				{(cell, cellIndex) => <Cell type={cell} upcoming key={cellIndex} />}
			</For>
		</div>
	);
}
