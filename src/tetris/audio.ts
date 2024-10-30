export enum Sfx {
  GameOver = "game-over",
  Click = "click",
  Clear = "clear",
  Drop = "drop",
  LevelUp = "level-up",
}

export const defaultVolumes = {
  "game-over": 0.05,
  click: 0.25,
  clear: 0.08,
  drop: 0.15,
  "level-up": 0.15,
  korobeiniki: 0.05,
} as const;

export const music = document.getElementById("korobeiniki") as HTMLAudioElement;

export const play = (audio: Sfx) => {
  const clone = document
    .getElementById(audio)
    ?.cloneNode(true) as HTMLAudioElement;
  clone.volume = defaultVolumes[audio];
  void clone.play();
};
