import { useTranslation } from "react-i18next";
import { useScore } from "../lib/contexts/score";

export function Statistics() {
  const { t } = useTranslation();
  const { score, level } = useScore();

  return (
    <header className="w-full rounded-2xl pb-2 grid grid-cols-3 place-items-stretch justify-between items-center">
      <h2 className="font-bold text-sm">
        {t("level")} {level + 1}
      </h2>
      <h2 className="font-bold text-lg text-center">{score}</h2>
      <h2 className="font-bold text-sm text-end">
        {t("highScore")} TODO: reimplement high score
      </h2>
    </header>
  );
}
