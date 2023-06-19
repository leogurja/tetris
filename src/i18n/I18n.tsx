import { useTranslation } from "react-i18next";
import { Flag } from "./Flag";
import BrazilFlag from "./flags/brazil.svg";
import UsaFlag from "./flags/usa.svg";

export function I18n() {
  const { i18n } = useTranslation();

  return (
    <div className="flex">
      <Flag
        image={BrazilFlag}
        isSelected={i18n.language === "pt"}
        onClick={() => i18n.changeLanguage("pt")}
      />
      <Flag
        image={UsaFlag}
        isSelected={i18n.language === "en"}
        onClick={() => i18n.changeLanguage("en")}
      />
    </div>
  );
}
