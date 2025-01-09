import { useSelector } from "@xstate/store/solid";
import { createTranslator } from "../i18n";
import { scoreStore } from "../tetris/scoreControl";

export function Statistics() {
  const t = createTranslator();
  const level = useSelector(scoreStore, (g) => g.context.level);
  const score = useSelector(scoreStore, (g) => g.context.score);
  const highScore = useSelector(scoreStore, (g) => g.context.highScore);

  return (
    <header class="w-full rounded-2xl pb-2 grid grid-cols-3 place-items-stretch justify-between items-center">
      <h2 class="font-bold text-sm">
        {t("level")} {level() + 1}
      </h2>
      <h2 class="font-bold text-lg text-center">{score()}</h2>
      <h2 class="font-bold text-sm text-end">
        {t("highScore")} {highScore()}
      </h2>
    </header>
  );
}
