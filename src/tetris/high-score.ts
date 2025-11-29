import "client-only";
import { create } from "zustand";

interface HighScoreSlice {
  highScore: number;
  save: (score: number) => void;
}

export const useHighScore = create<HighScoreSlice>()((set, get) => ({
  highScore: 0,
  save: (score) => {
    set({ highScore: Math.max(get().highScore, score) });
  },
}));
