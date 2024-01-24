export enum Sfx {
	GameOver = "game-over",
	Click = "click",
	Clear = "clear",
	Drop = "drop",
	LevelUp = "level-up",
}

export const defaultVolumes = {
	"game-over": 0.1,
	click: 0.4,
	clear: 0.15,
	drop: 0.3,
	"level-up": 0.2,
	korobeiniki: 0.1,
} as const;

export const music = document.getElementById("korobeiniki") as HTMLAudioElement;

export const play = (audio: Sfx) => {
	// biome-ignore lint/style/noNonNullAssertion: can't be null if it's an AudioFile
	const clone = document
		.getElementById(audio)!
		.cloneNode(true) as HTMLAudioElement;
	clone.volume = defaultVolumes[audio];
	clone.play();
};
