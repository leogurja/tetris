import { createTranslator } from "../i18n";
import { I18n } from "../i18n/I18n";
import { ExternalLink } from "./ui/ExternalLink";

export function Nav() {
  const t = createTranslator();

  return (
    <nav class="flex items-center border-b-neutral-700 border-b p-3 px-6">
      <h1 class="text-lg font-bold">Tetris</h1>

      <div class="ml-auto flex items-center gap-5">
        {/*<ExternalLink href="https://gurgel.io">{t("portfolio")}</ExternalLink>*/}
        <ExternalLink href="https://github.com/gurgelio/tetris">
          <img src="/github.svg" alt="GitHub" class="w-4 mr-0.5" />
          {t("sourceCode")}
        </ExternalLink>
        <I18n />
      </div>
    </nav>
  );
}
