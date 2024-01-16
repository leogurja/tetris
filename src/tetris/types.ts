import GameState from "./gameState";

export enum PieceType {
	I = "I",
	J = "J",
	L = "L",
	O = "O",
	S = "S",
	T = "T",
	Z = "Z",
}

export type BlockType = PieceType | "P" | "";
export type BoardType = BlockType[];

export interface TetrisActions {
	moveLeft: () => void;
	moveRight: () => void;
	rotate: () => void;
	startSoftDrop: () => void;
	stopSoftDrop: () => void;
	hardDrop: () => void;
}

export interface TetrisSettings {
	gameState: GameState;
	isMuted: boolean;
	toggleGameState: () => void;
	toggleIsMuted: () => void;
}

export interface TetrisGame {
	level: number;
	score: number;
	record: number;
	gameState: GameState;
	board: BlockType[];
}
