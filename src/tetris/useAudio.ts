import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useCallback } from "react";

const files = {
  gameOver: document.getElementById("game-over") as HTMLAudioElement,
  click: document.getElementById("click") as HTMLAudioElement,
  clear: document.getElementById("clear") as HTMLAudioElement,
  drop: document.getElementById("drop") as HTMLAudioElement,
  levelUp: document.getElementById("level-up") as HTMLAudioElement,
  korobeiniki: document.getElementById("korobeiniki") as HTMLAudioElement,
};

const musicVolumeAtom = atomWithStorage("musicVolume", 30);
const volumeAtom = atomWithStorage("volume", 30);

export function useAudio() {
  const [musicVolume, setMusicVolume] = useAtom(musicVolumeAtom);
  const [volume, setVolume] = useAtom(volumeAtom);

  const play = useCallback(
    (audio: keyof typeof files) => {
      const clone = files[audio].cloneNode(true) as HTMLAudioElement;
      clone.volume = volume / 100;
      clone.play();
    },
    [volume]
  );

  const playMusic = useCallback(() => {
    files.korobeiniki.volume = musicVolume / 100;
    files.korobeiniki.play();
  }, [musicVolume]);

  const pauseMusic = useCallback(() => {
    files.korobeiniki.pause();
  }, []);

  return {
    volume,
    musicVolume,
    play,
    setMusicVolume,
    setVolume,
    playMusic,
    pauseMusic,
  };
}
