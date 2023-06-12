export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;
export const PIECE_STARTING_X = 4;
export const PIECE_STARTING_Y = 0;
export const TICK_MS = 500;
export const LEVEL_SPEED = (level: number) =>
  (0.8 - level * 0.007) ** level * 1000;
