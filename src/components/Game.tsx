import { useEffect } from "react";
import useTetris from "../tetris";
import { Sfx, defaultVolumes, music, play } from "../tetris/audio";
import GameState from "../tetris/gameState";
import { Board } from "./Board";
import { Statistics } from "./Statistics";
import { Controls } from "./controls";
import { Menu } from "./menu";

export function Game() {
  const [update, tickRate, gameState, isMuted, level] = useTetris((t) => [
    t.update,
    t.tickRate(),
    t.gameState,
    t.isMuted,
    t.level(),
  ]);

  useEffect(() => {
    if (tickRate <= 0) return;

    const intervalId = setInterval(update, tickRate);
    music.playbackRate = 1 + level / 20;
    return () => {
      clearInterval(intervalId);
    };
  }, [tickRate]);

  // music
  useEffect(() => {
    if (gameState === GameState.Playing && !isMuted) {
      music.volume = defaultVolumes.korobeiniki;
      void music.play();
    } else {
      music.pause();
    }
  }, [gameState, isMuted]);

  // level up sound
  useEffect(() => {
    if (level === 0) return;
    play(Sfx.LevelUp);
  }, [level]);

  return (
    <>
      <main className="aspect-[9/16] max-w-full h-full flex flex-col items-center p-2">
        <Statistics />
        <section className="flex h-full w-full justify-center">
          <Board />
          <Menu />
        </section>
        <Controls />
      </main>
    </>
  );
}
