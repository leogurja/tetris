"use client";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useTetris } from "@/tetris";
import { useHighScore } from "@/tetris/high-score";

export function Statistics() {
  const t = useTranslations("statistics");
  const [gameState, level, score] = useTetris((tetris) => [
    tetris.gameState,
    tetris.level(),
    tetris.score,
  ]);
  const { highScore, save } = useHighScore();

  // save high score
  useEffect(() => {
    if (gameState === "GameOver") save(score);
  }, [gameState, save, score]);

  return (
    <header className="grid w-full grid-cols-3 place-items-stretch items-center justify-between rounded-2xl pb-2">
      <h2 className="font-bold text-sm">
        {t("level")} {level + 1}
      </h2>
      <h2 className="text-center font-bold text-lg">{score}</h2>
      <h2 className="text-end font-bold text-sm">
        {t("highScore")} {highScore}
      </h2>
    </header>
  );
}
