import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "phosphor-solid";
import { type JSXElement, createEffect, onCleanup } from "solid-js";
import { createTranslator } from "../../i18n";
import { gameStore } from "../../tetris/game";
import { gameControlStore } from "../../tetris/gameControl";

const onKeyDown = {
  ArrowDown: () => gameControlStore.send({ type: "startSoftDrop" }),
  ArrowUp: () => gameStore.send({ type: "rotate" }),
  ArrowLeft: () => gameStore.send({ type: "moveLeft" }),
  ArrowRight: () => gameStore.send({ type: "moveRight" }),
  " ": () => gameStore.send({ type: "hardDrop" }),
  Escape: () => gameControlStore.send({ type: "toggleGameState" }),
};

const onKeyUp = {
  ArrowDown: () => gameControlStore.send({ type: "stopSoftDrop" }),
};

const allowRepeat = ["ArrowLeft", "ArrowRight", "ArrowUp"];

export function KeyboardControls() {
  const t = createTranslator();
  createEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (!(event.key in onKeyDown)) return;
      const key = event.key as keyof typeof onKeyDown;
      if (!allowRepeat.includes(key) && event.repeat) return;

      event.preventDefault();
      onKeyDown[key]();
    };

    const keyUpHandler = (event: KeyboardEvent) => {
      if (!(event.key in onKeyUp)) return;
      const key = event.key as keyof typeof onKeyUp;
      event.preventDefault();

      onKeyUp[key]();
    };

    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);

    onCleanup(() => {
      document.removeEventListener("keydown", keyDownHandler);
      document.removeEventListener("keydown", keyUpHandler);
    });
  });

  return (
    <div class="w-[80%] mx-20 mb-1 h-28 rounded-2xl gap-2 grid grid-cols-5 place-content-evenly items-center p-2 mt-4 text-xs">
      <Row>
        <Key>
          <ArrowUp size={24} />
        </Key>
        <span>{t("rotate")}</span>
      </Row>

      <Row>
        <span class="flex gap-1">
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

function Row({ children }: { children: JSXElement }) {
  return <div class="flex flex-col justify-between items-center gap-2">{children}</div>;
}

function Key({ children }: { children: JSXElement }) {
  return (
    <kbd class="px-2 py-1.5 text-md font-medium rounded-lg bg-neutral-600 text-neutral-100 border-neutral-500">
      {children}
    </kbd>
  );
}
