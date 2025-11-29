/** biome-ignore-all lint/a11y/useMediaCaption: files are not accessible */
"use client";

import type { RefObject } from "react";

interface AudioProps {
  musicRef: RefObject<HTMLAudioElement | null>;
}
export default function Audio({ musicRef }: AudioProps) {
  return (
    <>
      <audio id="clear" preload="auto" src="clear.mp3" />
      <audio id="click" preload="auto" src="click.mp3" />
      <audio id="drop" preload="auto" src="drop.mp3" />
      <audio id="game-over" preload="auto" src="game-over.mp3" />
      <audio id="level-up" preload="auto" src="level-up.mp3" />
      <audio
        id="korobeiniki"
        loop
        preload="auto"
        ref={musicRef}
        src="korobeiniki.mp3"
      />
    </>
  );
}
