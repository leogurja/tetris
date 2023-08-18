import { useTranslation } from "react-i18next";
import I18n from "../../i18n/I18n";
import ExternalLink from "./ExternalLink";

export default function Nav() {
  const { t } = useTranslation();

  return (
    <nav className="text-white flex items-center border-b-neutral-700 border-b p-3 px-6 mb-5">
      <h1 className="text-lg font-bold">Tetris</h1>

      <div className="ml-auto flex items-center gap-5">
        {/*<ExternalLink href="https://gurgel.io">{t("portfolio")}</ExternalLink>*/}
        <ExternalLink href="https://github.com/gurgelio/tetris">
          <img src="/github.svg" alt="GitHub" className="w-4 mr-0.5" />
          {t("sourceCode")}
        </ExternalLink>
        <I18n />
      </div>
    </nav>
  );
}
