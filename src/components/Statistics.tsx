import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import useTetris from "../tetris";
import GameState from "../tetris/gameState";
import useHighScore from "../tetris/highScore";

export default function Statistics() {
  const { t } = useTranslation();
  const [gameState, level, score] = useTetris((t) => [
    t.gameState,
    t.level(),
    t.score,
  ]);
  const { highScore, save } = useHighScore();

  // save high score
  useEffect(() => {
    if (gameState === GameState.GameOver) save(score);
  }, [gameState, save, score]);

  return (
    <header className="w-full rounded-2xl pb-2 grid grid-cols-3 place-items-stretch justify-between items-center">
      <h2 className="font-bold text-sm">
        {t("level")} {level + 1}
      </h2>
      <h2 className="font-bold text-lg text-center">{score}</h2>
      <h2 className="font-bold text-sm text-end">
        {t("highScore")} {highScore}
      </h2>
    </header>
  );
}
