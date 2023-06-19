import { useEffect, useState } from "react";
import { useAudio } from "../tetris/audio";

export function VolumeControls() {
  const [musicVolume, setMusicVolume] = useState(0);
  const { volume, setVolume } = useAudio();

  useEffect(() => {
    const element = document.getElementById("korobeiniki") as HTMLAudioElement;
    element.volume = musicVolume / 100;
    element.play();
  }, [musicVolume]);

  return (
    <div className="flex flex-col mt-3 gap-2">
      <fieldset>
        <label className="block text-md">Música</label>
        <input
          type="range"
          value={musicVolume}
          className="appearance-none bg-neutral-600 outline-none h-2 rounded-full"
          min="0"
          max="100"
          step="1"
          onChange={(e) => setMusicVolume(parseInt(e.target.value))}
        />
        <span className="inline-block ml-2 w-8">{musicVolume}%</span>
      </fieldset>
      <fieldset>
        <label className="block text-md">Efeitos Sonoros</label>
        <input
          type="range"
          value={volume}
          className="appearance-none bg-neutral-600 outline-none h-2 rounded-full"
          min="0"
          max="100"
          step="1"
          onChange={(e) => setVolume(parseInt(e.target.value))}
        />
        <span className="inline-block ml-2 w-8">{volume}%</span>
      </fieldset>
    </div>
  );
}
