import { useCallback, useEffect, useMemo, useState } from "react";
import useInterval from "../hooks/useInterval";
import usePersistedState from "../hooks/usePersistedState";
import Floor from "./floor";
import GameState from "./gameState";
import Piece from "./piece";
import render from "./render";
import { TetrisActions, TetrisGame, TetrisSettings } from "./types";
import useAudio, { Sfx } from "./useAudio";

export { type BlockType } from "./types";

interface Tetris {
	game: TetrisGame;
	settings: TetrisSettings;
	actions: TetrisActions;
}

export default function useTetris(): Tetris {
	// state
	const [piece, setPiece] = useState(() => Piece.take());
	const [floor, setFloor] = useState(() => new Floor());
	const [isAccelerated, setIsAccelerated] = useState(false);
	const [score, setScore] = useState(0);
	const [gameState, setGameState] = useState(GameState.Paused);
	const [record, setRecord] = usePersistedState(0, "record");
	const { play, isMuted, toggleIsMuted } = useAudio(gameState);

	// derived state
	const level = Math.min(Math.floor(score / 1000), 15);
	const tickRate = () => {
		if (gameState !== GameState.Playing) return 0;
		if (isAccelerated) return 50;

		return (0.8 - level * 0.007) ** level * 1000;
	};
	const board = useMemo(() => render(floor, piece), [piece, floor]);

	// actions
	const update = useCallback(() => {
		setPiece((piece) => {
			const updatedPiece = piece.translate(0, 1);

			if (updatedPiece.collides(floor)) {
				const addedScore = floor.push(piece.blocks);
				if (addedScore > 0) play(Sfx.Clear);
				setScore((s) => s + addedScore);
				const newPiece = Piece.take();

				if (newPiece.collides(floor)) {
					setGameState(GameState.GameOver);
					play(Sfx.GameOver);
					setRecord((prev) => Math.max(prev, score));
				}
				return newPiece;
			}

			return updatedPiece;
		});
	}, [floor, score, setRecord, play]);

	const toggleGameState = useCallback(() => {
		setGameState((p) => {
			switch (p) {
				case GameState.Playing:
					return GameState.Paused;
				case GameState.Paused:
					return GameState.Playing;
				case GameState.GameOver:
					setFloor(new Floor());
					setPiece(Piece.take());
					setScore(0);
					return GameState.Playing;
			}
		});
	}, []);

	const startSoftDrop = useCallback(() => {
		setIsAccelerated(true);
	}, []);

	const stopSoftDrop = useCallback(() => {
		setIsAccelerated(false);
	}, []);

	const rotate = useCallback(() => {
		if (gameState !== GameState.Playing) return;
		play(Sfx.Click);
		setPiece((piece) => {
			const rotatedPiece = piece.rotate();
			if (rotatedPiece.collides(floor)) return piece;

			return rotatedPiece;
		});
	}, [gameState, floor, play]);

	const moveLeft = useCallback(() => {
		if (gameState !== GameState.Playing) return;
		play(Sfx.Click);
		setPiece((piece) => {
			const movedPiece = piece.translate(-1, 0);
			if (movedPiece.collides(floor)) return piece;
			return movedPiece;
		});
	}, [gameState, floor, play]);

	const moveRight = useCallback(() => {
		if (gameState !== GameState.Playing) return;
		play(Sfx.Click);
		setPiece((piece) => {
			const movedPiece = piece.translate(1, 0);
			if (movedPiece.collides(floor)) return piece;
			return movedPiece;
		});
	}, [gameState, floor, play]);

	const hardDrop = useCallback(() => {
		if (gameState !== GameState.Playing) return;
		play(Sfx.Drop);
		const addedScore = floor.push(piece.project(floor).blocks);
		if (addedScore > 0) play(Sfx.Clear);
		setScore((s) => s + addedScore);
		setPiece(Piece.take());
	}, [gameState, play, floor, piece]);

	// game loop
	useInterval(update, tickRate());

	// play levelup sound
	useEffect(() => {
		if (level !== 0) play(Sfx.LevelUp);
	}, [level, play]);

	return {
		game: {
			level,
			score,
			record,
			gameState,
			board,
		},
		settings: {
			gameState,
			isMuted,
			toggleIsMuted,
			toggleGameState,
		},
		actions: {
			startSoftDrop,
			stopSoftDrop,
			moveLeft,
			moveRight,
			rotate,
			hardDrop,
		},
	};
}
