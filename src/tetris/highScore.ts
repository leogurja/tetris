import { create } from "zustand";
import { persist } from "zustand/middleware";

interface HighScoreSlice {
  highScore: number;
  save: (score: number) => void;
}

const useHighScore = create<HighScoreSlice>()(
  persist(
    (set, get) => ({
      highScore: 0,
      save: (score) => {
        set({ highScore: Math.max(get().highScore, score) });
      },
    }),
    { name: "highScoreStore" },
  ),
);

export default useHighScore;
