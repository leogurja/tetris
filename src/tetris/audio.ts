import { create } from "zustand";
import { persist } from "zustand/middleware";

const files = {
  gameOver: document.getElementById("game-over") as HTMLAudioElement,
  click: document.getElementById("click") as HTMLAudioElement,
  clear: document.getElementById("clear") as HTMLAudioElement,
  drop: document.getElementById("drop") as HTMLAudioElement,
  levelUp: document.getElementById("level-up") as HTMLAudioElement,
};

interface VolumeState {
  volume: number;
  setVolume: (volume: number) => void;
}

export const useVolume = create<VolumeState>()(
  persist(
    (set) => ({
      volume: 1,
      setVolume: (volume) => set({ volume }),
    }),
    {
      name: "volume",
    }
  )
);

export function play(audio: keyof typeof files) {
  const clone = files[audio].cloneNode(true) as HTMLAudioElement;
  clone.volume = useVolume.getState().volume;
  clone.play();
}
