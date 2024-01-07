import Block from "./block";
import { BOARD_HEIGHT, BOARD_WIDTH } from "./config";
import Floor from "./floor";
import Piece from "./piece";
import { BoardType } from "./types";

export default function render(floor: Floor, piece: Piece) {
	const board = getEmptyBoard();
	drawBlocks(board, floor.blocks);
	drawBlocks(board, piece.project(floor).blocks, true);
	drawBlocks(board, piece.blocks);
	return board;
}

function drawBlocks(board: BoardType, blocks: Block[], projection = false) {
	for (const block of blocks) {
		if (block.y < 0) return;
		board[block.y * BOARD_WIDTH + block.x] = projection ? "P" : block.type;
	}
}

function getEmptyBoard(): BoardType {
	return Array(BOARD_HEIGHT * BOARD_WIDTH).fill("");
}
