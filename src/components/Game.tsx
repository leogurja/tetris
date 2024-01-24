import { useEffect } from "react";
import useInterval from "../hooks/useInterval";
import useTetris from "../tetris";
import { Sfx, defaultVolumes, music, play } from "../tetris/audio";
import GameState from "../tetris/gameState";
import Board from "./Board";
import Statistics from "./Statistics";
import Controls from "./controls";
import Menu from "./menu";

export default function Game() {
	const [update, tickRate, gameState, isMuted, level] = useTetris((t) => [
		t.update,
		t.tickRate,
		t.gameState,
		t.isMuted,
		t.level(),
	]);

	useInterval(update, tickRate());

	// music
	useEffect(() => {
		if (gameState === GameState.Playing && !isMuted) {
			music.volume = defaultVolumes.korobeiniki;
			music.play();
		} else {
			music.pause();
		}
	}, [gameState, isMuted]);

	// level up sound
	useEffect(() => {
		if (level === 0) return;
		play(Sfx.LevelUp);
	}, [level]);

	return (
		<>
			<main className="aspect-[9/16] max-w-full h-full flex flex-col items-center p-2">
				<Statistics />
				<section className="flex h-full w-full justify-center">
					<Board />
					<Menu />
				</section>
				<Controls />
			</main>
		</>
	);
}
