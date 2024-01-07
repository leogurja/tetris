import { useCallback, useEffect, useMemo, useState } from "react";
import useInterval from "../hooks/useInterval";
import useKeyboard from "../hooks/useKeyboard";
import usePersistedState from "../hooks/usePersistedState";
import audioFiles from "./audioFiles";
import Floor from "./floor";
import GameState from "./gameState";
import Piece from "./piece";
import render from "./render";

export { type BlockType } from "./types";

export default function useTetris() {
	// state
	const [piece, setPiece] = useState(() => Piece.take());
	const [floor, setFloor] = useState(() => new Floor());
	const [isAccelerated, setIsAccelerated] = useState(false);
	const [score, setScore] = useState(0);
	const [gameState, setGameState] = useState(GameState.Paused);
	const [record, setRecord] = usePersistedState(0, "record");
	const [musicVolume, setMusicVolume] = usePersistedState(30, "musicVolume");
	const [volume, setVolume] = usePersistedState(30, "volume");

	// derived state
	const level = Math.min(Math.floor(score / 1000), 15);
	const tickRate = (0.8 - level * 0.007) ** level * 1000;
	const effectiveTickRate =
		gameState === GameState.Playing ? (isAccelerated ? 50 : tickRate) : 0;
	const board = useMemo(() => render(floor, piece), [piece, floor]);

	// actions
	const play = useCallback(
		(audio: keyof typeof audioFiles) => {
			const clone = audioFiles[audio].cloneNode(true) as HTMLAudioElement;
			clone.volume = volume / 100;
			clone.play();
		},
		[volume],
	);
	const update = useCallback(() => {
		setPiece((piece) => {
			const updatedPiece = piece.translate(0, 1);

			if (updatedPiece.collides(floor)) {
				const addedScore = floor.push(piece.blocks);
				if (addedScore > 0) play("clear");
				setScore((s) => s + addedScore);
				const newPiece = Piece.take();

				if (newPiece.collides(floor)) {
					setGameState(GameState.GameOver);
					play("gameOver");
					setRecord((prev) => Math.max(prev, score));
				}
				return newPiece;
			}

			return updatedPiece;
		});
	}, [floor, play, score, setRecord]);

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

	// keyboard events
	useKeyboard({
		onKeyDown: {
			ArrowDown: () => setIsAccelerated(true),
			ArrowUp: () => {
				if (gameState !== GameState.Playing) return;
				play("click");
				setPiece((piece) => {
					const rotatedPiece = piece.rotate();
					if (rotatedPiece.collides(floor)) return piece;

					return rotatedPiece;
				});
			},
			ArrowLeft: () => {
				if (gameState !== GameState.Playing) return;
				play("click");
				setPiece((piece) => {
					const movedPiece = piece.translate(-1, 0);
					if (movedPiece.collides(floor)) return piece;
					return movedPiece;
				});
			},
			ArrowRight: () => {
				if (gameState !== GameState.Playing) return;
				play("click");
				setPiece((piece) => {
					const movedPiece = piece.translate(1, 0);
					if (movedPiece.collides(floor)) return piece;
					return movedPiece;
				});
			},
			" ": () => {
				if (gameState !== GameState.Playing) return;
				play("drop");
				const addedScore = floor.push(piece.project(floor).blocks);
				if (addedScore > 0) play("clear");
				setScore((s) => s + addedScore);
				setPiece(Piece.take());
			},
		},
		onKeyUp: {
			ArrowDown: () => setIsAccelerated(false),
		},
		allowRepeat: ["ArrowLeft", "ArrowRight"],
	});

	// game loop
	useInterval(update, effectiveTickRate);

	// play levelup sound
	useEffect(() => {
		if (level !== 0) play("levelUp");
	}, [level, play]);

	// music
	useEffect(() => {
		if (gameState === GameState.Playing) {
			audioFiles.korobeiniki.volume = musicVolume / 100;
			audioFiles.korobeiniki.play();
		} else {
			audioFiles.korobeiniki.pause();
		}
	}, [gameState, musicVolume]);

	return {
		toggleGameState,
		gameState,
		board,
		level,
		record,
		score,
		volume,
		setVolume,
		musicVolume,
		setMusicVolume,
	};
}
