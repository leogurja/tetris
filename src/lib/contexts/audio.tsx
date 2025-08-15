import {
  createContext,
  useContext,
  useReducer,
  type ActionDispatch,
  type ReactNode,
} from "react";
import { music, volumeMultipliers, type Sfx } from "../constants/audio";

type AudioAction =
  | { type: "play"; sfx: Sfx }
  | { type: "playMusic" | "stopMusic" | "toggleMute" | "reset" }
  | { type: "setVolume"; volume: number };

interface AudioContextType {
  isMuted: boolean;
  volume: number;
  dispatchAudio: ActionDispatch<[action: AudioAction]>;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

function audioReducer(
  state: {
    isMuted: boolean;
    volume: number;
  },
  action: AudioAction,
) {
  switch (action.type) {
    case "play":
      if (state.isMuted) break;

      const clone = document
        .getElementById(action.sfx)!
        .cloneNode(true) as HTMLAudioElement;
      clone.volume = state.volume * volumeMultipliers[action.sfx];
      void clone.play();
      break;
    case "playMusic":
      if (!state.isMuted) {
        music.volume = state.volume * volumeMultipliers.Korobeiniki;
        void music.play();
      }
      break;
    case "stopMusic":
      music.pause();
      break;
    case "reset":
      music.currentTime = 0;
      break;
    case "toggleMute":
      return { ...state, isMuted: !state.isMuted };
    case "setVolume":
      music.volume = action.volume * volumeMultipliers.Korobeiniki;
      return { ...state, volume: action.volume };
    default:
      throw new Error("Unknown action type");
  }
  return state;
}

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [{ isMuted, volume }, dispatchAudio] = useReducer(audioReducer, {
    isMuted: false,
    volume: 30,
  });
  return (
    <AudioContext value={{ isMuted, volume, dispatchAudio }}>
      {children}
    </AudioContext>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
