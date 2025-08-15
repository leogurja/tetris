import {
  createContext,
  useContext,
  useReducer,
  type ActionDispatch,
  type ReactNode,
} from "react";
import { music } from "../constants/audio";
import { useAudio } from "./audio";

type ScoreAction = { type: "add"; amount: number } | { type: "reset" };

interface ScoreContextType {
  score: number;
  level: number;
  tickRate: number;
  dispatchScore: ActionDispatch<[action: ScoreAction]>;
}

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export const ScoreProvider = ({ children }: { children: ReactNode }) => {
  const { dispatchAudio } = useAudio();

  function scoreReducer(state: number, action: ScoreAction) {
    switch (action.type) {
      case "add":
        if (action.amount === 0) return state;

        const newLevel = getLevel(state + action.amount);
        if (getLevel(state) < newLevel) {
          dispatchAudio({ type: "play", sfx: "LevelUp" });
          music.playbackRate = 1 + newLevel / 20;
        } else {
          dispatchAudio({ type: "play", sfx: "Clear" });
        }
        return state + action.amount;
      case "reset":
        return 0;
      default:
        throw new Error("Unknown action type");
    }
  }

  const [score, dispatchScore] = useReducer(scoreReducer, 0);
  const level = getLevel(score);
  const tickRate = getTickRate(level);

  return (
    <ScoreContext value={{ score, level, tickRate, dispatchScore }}>
      {children}
    </ScoreContext>
  );
};

export const useScore = () => {
  const context = useContext(ScoreContext);
  if (!context) {
    throw new Error("useScore must be used within a ScoreProvider");
  }
  return context;
};

function getLevel(score: number) {
  return Math.min(Math.floor(score / 1000), 15);
}

function getTickRate(level: number) {
  return (0.8 - level * 0.007) ** level * 1000;
}
