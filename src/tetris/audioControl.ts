import { createStore } from "@xstate/store";

const volumeMultipliers = {
  "game-over": 0.001,
  click: 0.005,
  clear: 0.0016,
  drop: 0.003,
  "level-up": 0.003,
  korobeiniki: 0.001,
} as const;

const music = document.getElementById("korobeiniki") as HTMLAudioElement;

type PlaySfxEvent = { sfx: keyof Omit<typeof volumeMultipliers, "korobeiniki">; type: "playSfx" };
type SetVolumeEvent = { type: "setVolume"; volume: number };

export const audioStore = createStore({
  context: {
    volume: 50,
  },
  on: {
    playMusic: (context) => {
      music.volume = volumeMultipliers.korobeiniki * context.volume;
      music.play();
      return {};
    },
    pauseMusic: () => {
      music.pause();
      return {};
    },
    playSfx: (context, event: PlaySfxEvent) => {
      const clone = document.getElementById(event.sfx)?.cloneNode(true) as HTMLAudioElement;
      clone.volume = volumeMultipliers[event.sfx] * context.volume;
      clone.play();
      return {};
    },
    setVolume: {
      volume: (_context, event: SetVolumeEvent) => event.volume,
    },
    setPlaybackRate: (_context, event: { speed: number }) => {
      music.playbackRate = event.speed;
      return {};
    },
    reset: () => {
      music.playbackRate = 1;
      music.currentTime = 0;
      music.play();
      return {};
    },
  },
});
