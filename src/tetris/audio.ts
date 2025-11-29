import { DEFAULT_VOLUMES, type Sfx } from "@/lib/constants/audio-files";

export const play = (audio: Sfx) => {
  const clone = document
    .getElementById(audio)
    ?.cloneNode(true) as HTMLAudioElement;
  clone.volume = DEFAULT_VOLUMES[audio];
  clone.play();
};
