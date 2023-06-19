import { create } from "zustand";
import { persist } from "zustand/middleware";

const files = {
  gameOver: document.getElementById("game-over") as HTMLAudioElement,
  click: document.getElementById("click") as HTMLAudioElement,
  clear: document.getElementById("clear") as HTMLAudioElement,
  drop: document.getElementById("drop") as HTMLAudioElement,
  levelUp: document.getElementById("level-up") as HTMLAudioElement,
  korobeiniki: document.getElementById("korobeiniki") as HTMLAudioElement,
};

interface AudioState {
  volume: number;
  setVolume: (volume: number) => void;
  play: (audio: keyof typeof files) => void;
}

export const useAudio = create<AudioState>()(
  persist(
    (set, get) => ({
      volume: 1,
      setVolume: (volume) => {
        set({ volume });
      },

      play: (audio) => {
        const clone = files[audio].cloneNode(true) as HTMLAudioElement;
        clone.volume = get().volume / 100;
        clone.play();
      },
    }),
    {
      name: "volume",
    }
  )
);
