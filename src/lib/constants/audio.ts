export const volumeMultipliers = {
  GameOver: 0.05,
  Click: 0.25,
  Clear: 0.08,
  Drop: 0.15,
  LevelUp: 0.15,
  Korobeiniki: 0.05,
} as const;

export type Sfx = Exclude<keyof typeof volumeMultipliers, "Korobeiniki">;

export const music = document.getElementById("Korobeiniki") as HTMLAudioElement;
