import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ScoreState {
  scoreboard: number[];
  save: (score: number) => void;
}

export const useScoreboard = create<ScoreState>()(
  persist(
    (set, get) => ({
      scoreboard: [],
      save: (score: number) =>
        set({
          scoreboard: [...get().scoreboard, score]
            .sort((a, b) => b - a)
            .slice(0, 9),
        }),
    }),
    {
      name: "scoreboard", // unique name
    }
  )
);
