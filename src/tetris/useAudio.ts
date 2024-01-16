import { useCallback, useEffect, useState } from "react";
import GameState from "./gameState";

export enum Sfx {
	GameOver = "game-over",
	Click = "click",
	Clear = "clear",
	Drop = "drop",
	LevelUp = "level-up",
}

const defaultVolumes = {
	"game-over": 0.1,
	click: 0.4,
	clear: 0.15,
	drop: 0.3,
	"level-up": 0.2,
	korobeiniki: 0.1,
} as const;

const music = document.getElementById("korobeiniki") as HTMLAudioElement;

export default function useAudio(gameState: GameState) {
	const [isMuted, setIsMuted] = useState(false);

	const toggleIsMuted = useCallback(() => {
		setIsMuted((p) => !p);
	}, []);

	// music
	useEffect(() => {
		if (gameState === GameState.Playing && !isMuted) {
			music.volume = defaultVolumes.korobeiniki;
			music.play();
		} else {
			music.pause();
		}
	}, [gameState, isMuted]);

	return {
		isMuted,
		toggleIsMuted,
		play: useCallback(
			(audio: Sfx) => {
				if (isMuted) return;
				// biome-ignore lint/style/noNonNullAssertion: can't be null if it's an AudioFile
				const clone = document
					.getElementById(audio)!
					.cloneNode(true) as HTMLAudioElement;
				clone.volume = defaultVolumes[audio];
				clone.play();
			},
			[isMuted],
		),
	};
}
