import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAudio } from "../tetris/audio";
import { Slider } from "./Slider";

export function VolumeControls() {
  const [musicVolume, setMusicVolume] = useState(0);
  const { volume, setVolume } = useAudio();
  const { t } = useTranslation();

  useEffect(() => {
    const element = document.getElementById("korobeiniki") as HTMLAudioElement;
    element.volume = musicVolume / 100;
    element.play();
  }, [musicVolume]);

  return (
    <div className="flex flex-col gap-3">
      <fieldset>
        <label className="block text-md">{t("music")}</label>
        <Slider value={musicVolume} setValue={setMusicVolume} />
      </fieldset>
      <fieldset>
        <label className="block text-md">{t("sfx")}</label>
        <Slider value={volume} setValue={setVolume} />
      </fieldset>
    </div>
  );
}
