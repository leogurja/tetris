import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          volume: "Volume",
          score: "Score",
          highScore: "High Score",
          level: "Level",
          sourceCode: "Source Code",
          portfolio: "Portfolio",
          rotate: "Rotate",
          move: "Move",
          softDrop: "Soft Drop",
          hardDrop: "Hard Drop",
          space: "Space",
        },
      },
      pt: {
        translation: {
          volume: "Volume",
          score: "Pontuação",
          highScore: "Recorde",
          level: "Nível",
          sourceCode: "Código Fonte",
          portfolio: "Portfólio",
          rotate: "Rotacionar",
          move: "Mover",
          softDrop: "Soft Drop",
          hardDrop: "Hard Drop",
          space: "Espaço",
        },
      },
    },
  })
  .catch((e: unknown) => {
    console.error(e);
  });

export const i18n = i18next;
