export type Sfx = "game-over" | "click" | "clear" | "drop" | "level-up";

export const DEFAULT_VOLUMES = {
  "game-over": 0.05,
  click: 0.25,
  clear: 0.08,
  drop: 0.15,
  "level-up": 0.15,
  korobeiniki: 0.05,
} as const;
