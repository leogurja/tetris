import { createStore } from "@xstate/store";
import { audioStore } from "./audioControl";

export interface ScoreControlSnapshot {
  score: number;
  highScore: number;
}

type AddScoreEvent = { type: "add"; by: number };

export const scoreStore = createStore({
  context: {
    score: 0,
    highScore: Number.parseInt(localStorage.getItem("tetris.gurgel.io/highScore@v1") ?? "0"),
    level: 0,
  },
  on: {
    reset: {
      highScore: (context) => {
        const newHighScore = Math.max(context.highScore, context.score);
        localStorage.setItem("tetris.gurgel.io/highScore@v1", newHighScore.toString());

        return newHighScore;
      },
      score: 0,
    },
    add: ({ score, level }, { by }: AddScoreEvent) => {
      audioStore.send({ type: "playSfx", sfx: "clear" });
      score += by;
      const newLevel = Math.min(Math.floor(score / 1000), 15);
      if (newLevel !== level) {
        audioStore.send({ type: "playSfx", sfx: "level-up" });
        audioStore.send({ type: "setPlaybackRate", speed: 1 + level / 20 });
      }
      return { level: newLevel, score };
    },
  },
});
