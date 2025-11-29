import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
} from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import type { PropsWithChildren } from "react";
import { useKeyboard } from "@/hooks/use-keyboard";
import { useTetris } from "@/tetris";

export function KeyboardControls() {
  const t = useTranslations("keyboard");
  const [
    startSoftDrop,
    rotate,
    moveLeft,
    moveRight,
    hardDrop,
    stopSoftDrop,
    toggleGameState,
  ] = useTetris((tetris) => [
    tetris.startSoftDrop,
    tetris.rotate,
    tetris.moveLeft,
    tetris.moveRight,
    tetris.hardDrop,
    tetris.stopSoftDrop,
    tetris.toggleGameState,
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
    <div className="mx-20 mt-4 mb-1 grid h-28 w-[80%] grid-cols-5 place-content-evenly items-center gap-2 rounded-2xl p-2 text-xs">
      <Row>
        <Key>
          <ArrowUpIcon size={24} />
        </Key>
        <span>{t("rotate")}</span>
      </Row>

      <Row>
        <span className="flex gap-1">
          <Key>
            <ArrowLeftIcon size={24} />
          </Key>
          <Key>
            <ArrowRightIcon size={24} />
          </Key>
        </span>
        <span>{t("move")}</span>
      </Row>
      <Row>
        <Key>
          <ArrowDownIcon size={24} />
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
    <div className="flex flex-col items-center justify-between gap-2">
      {children}
    </div>
  );
}

function Key({ children }: PropsWithChildren) {
  return (
    <kbd className="rounded-lg border-neutral-500 bg-neutral-600 px-2 py-1.5 font-medium text-md text-neutral-100">
      {children}
    </kbd>
  );
}
