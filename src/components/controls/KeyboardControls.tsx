import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
} from "@phosphor-icons/react";
import { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { useKeyboard } from "../../hooks/useKeyboard";
import useTetris from "../../tetris";

export function KeyboardControls() {
  const { t } = useTranslation();
  const [
    startSoftDrop,
    rotate,
    moveLeft,
    moveRight,
    hardDrop,
    stopSoftDrop,
    toggleGameState,
  ] = useTetris((t) => [
    t.startSoftDrop,
    t.rotate,
    t.moveLeft,
    t.moveRight,
    t.hardDrop,
    t.stopSoftDrop,
    t.toggleGameState,
  ]);

  // keyboard events
  useKeyboard({
    onKeyDown: {
      ArrowDown: startSoftDrop,
      ArrowUp: rotate,
      ArrowLeft: moveLeft,
      ArrowRight: moveRight,
      " ": hardDrop,
      Escape: toggleGameState,
    },
    onKeyUp: {
      ArrowDown: stopSoftDrop,
    },
    allowRepeat: ["ArrowLeft", "ArrowRight", "ArrowUp"],
  });

  return (
    <div className="w-[80%] mx-20 mb-1 h-28 rounded-2xl gap-2 grid grid-cols-5 place-content-evenly items-center p-2 mt-4 text-xs">
      <Row>
        <Key>
          <ArrowUp size={24} />
        </Key>
        <span>{t("rotate")}</span>
      </Row>

      <Row>
        <span className="flex gap-1">
          <Key>
            <ArrowLeft size={24} />
          </Key>
          <Key>
            <ArrowRight size={24} />
          </Key>
        </span>
        <span>{t("move")}</span>
      </Row>
      <Row>
        <Key>
          <ArrowDown size={24} />
        </Key>
        <span>{t("softDrop")}</span>
      </Row>
      <Row>
        <Key>{t("space")}</Key>
        <span>{t("hardDrop")}</span>
      </Row>
      <Row>
        <Key>Esc</Key>
        <span>Play/Pause</span>
      </Row>
    </div>
  );
}

function Row({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col justify-between items-center gap-2">
      {children}
    </div>
  );
}

function Key({ children }: PropsWithChildren) {
  return (
    <kbd className="px-2 py-1.5 text-md font-medium rounded-lg bg-neutral-600 text-neutral-100 border-neutral-500">
      {children}
    </kbd>
  );
}
