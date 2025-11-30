"use client";
import { useEffect, useRef, useState } from "react";
import { DEFAULT_VOLUMES } from "@/lib/constants/audio-files";
import { useTetris } from "@/tetris";
import { play } from "@/tetris/audio";
import Audio from "./audio";
import { Board } from "./board";
import { Controls } from "./controls";
import { Menu } from "./menu";
import { SaveScoreModal } from "./save-score-modal";
import { Statistics } from "./statistics";

export function Game() {
  const musicRef = useRef<HTMLAudioElement>(null);
  const [saveScoreOpen, setSaveScoreOpen] = useState(false);
  const [update, tickRate, gameState, isMuted, level] = useTetris((t) => [
    t.update,
    t.tickRate(),
    t.gameState,
    t.isMuted,
    t.level(),
  ]);

  useEffect(() => {
    if (tickRate <= 0 || !musicRef.current) return;

    const intervalId = setInterval(update, tickRate);
    musicRef.current.playbackRate = 1 + level / 20;
    return () => {
      clearInterval(intervalId);
    };
  }, [tickRate, level, update]);

  // music
  useEffect(() => {
    if (!musicRef.current) return;
    if (gameState === "Playing" && !isMuted) {
      musicRef.current.volume = DEFAULT_VOLUMES.korobeiniki;
      musicRef.current.play();
    } else {
      musicRef.current.pause();
    }
  }, [gameState, isMuted]);

  // level up sound
  useEffect(() => {
    if (level === 0) return;
    play("level-up");
  }, [level]);

  useEffect(() => {
    if (gameState === "GameOver") setSaveScoreOpen(true);
  }, [gameState]);

  return (
    <main className="flex h-full max-w-full flex-col items-center p-2">
      <Statistics />
      <section className="flex h-full w-full justify-center">
        <Board />
        <Menu />
      </section>
      <Controls />
      <Audio musicRef={musicRef} />
      <SaveScoreModal onOpenChange={setSaveScoreOpen} open={saveScoreOpen} />
    </main>
  );
}
