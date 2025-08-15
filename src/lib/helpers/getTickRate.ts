import { GameState } from "../types/gameState";

export function getTickRate(
  level: number,
  gameState: GameState,
  isAccelerated: boolean,
) {
  if (gameState !== GameState.Playing) return 0;
  if (isAccelerated) return 50;

  return (0.8 - level * 0.007) ** level * 1000;
}
