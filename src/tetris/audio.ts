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
  isMuted: boolean;
  effectiveVolume: () => number;
  setVolume: (volume: number) => void;
  setIsMuted: (isMuted: boolean) => void;
}

export const useVolume = create<VolumeState>()(
  persist(
    (set, get) => ({
      volume: 1,
      isMuted: false,
      effectiveVolume: () => (get().isMuted ? 0 : get().volume),
      setVolume: (volume) => set({ volume }),
      setIsMuted: (isMuted) => set({ isMuted }),
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
