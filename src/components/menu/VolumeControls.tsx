import { useEffect, useState } from "react";
import { useAudio } from "../../tetris/audio";
import { LabeledValue } from "./LabeledValue";
import { Slider } from "./Slider";

export function VolumeControls() {
  const [musicVolume, setMusicVolume] = useState(0);
  const { volume, setVolume } = useAudio();

  useEffect(() => {
    const element = document.getElementById("korobeiniki") as HTMLAudioElement;
    element.volume = musicVolume / 100;
    element.play();
  }, [musicVolume]);

  return (
    <div className="flex flex-col gap-3">
      <LabeledValue name="music">
        <Slider value={musicVolume} setValue={setMusicVolume} />
      </LabeledValue>
      <LabeledValue name="sfx">
        <Slider value={volume} setValue={setVolume} />
      </LabeledValue>
    </div>
  );
}
