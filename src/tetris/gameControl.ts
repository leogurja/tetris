import { createStore } from "@xstate/store";
import { useSelector } from "@xstate/store/solid";
import { audioStore } from "./audioControl";
import { gameStore } from "./game";
import { GameState } from "./objects/gameState";
import { scoreStore } from "./scoreControl";

export const gameControlStore = createStore({
  context: {
    gameState: GameState.Paused,
    isAccelerated: false,
  },
  on: {
    toggleGameState: {
      gameState: ({ gameState }) => {
        switch (gameState) {
          case GameState.Playing:
            audioStore.send({ type: "pauseMusic" });
            return GameState.Paused;
          case GameState.Paused:
            audioStore.send({ type: "playMusic" });
            return GameState.Playing;
          case GameState.GameOver:
            scoreStore.send({ type: "reset" });
            gameStore.send({ type: "reset" });
            audioStore.send({ type: "reset" });
            return GameState.Playing;
          default:
            throw new TypeError("Unexpected game state");
        }
      },
    },
    setGameState: {
      gameState: (_context, event: { gameState: GameState }) => event.gameState,
    },
    startSoftDrop: {
      isAccelerated: true,
    },
    stopSoftDrop: {
      isAccelerated: false,
    },
  },
});

export function tickRate() {
  const gameState = useSelector(gameControlStore, (g) => g.context.gameState);
  const isAccelerated = useSelector(gameControlStore, (g) => g.context.isAccelerated);
  const level = useSelector(scoreStore, (g) => g.context.level);

  if (gameState() !== GameState.Playing) return 0;
  if (isAccelerated()) return 50;
  return (0.8 - level() * 0.007) ** level() * 1000;
}
