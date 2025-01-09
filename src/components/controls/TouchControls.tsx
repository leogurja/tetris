import { ArrowDown, ArrowLeft, ArrowLineDown, ArrowRight, ArrowURightUp } from "phosphor-solid";
import type { JSXElement } from "solid-js";
import { gameStore } from "../../tetris/game";
import { gameControlStore } from "../../tetris/gameControl";

export function TouchControls() {
  return (
    <footer class="flex w-full justify-evenly justify-self-end">
      <div class="flex items-center justify-center p-2">
        <div class="grid grid-cols-3 place-content-stretch">
          <div />
          <Key onClick={() => gameStore.send({ type: "rotate" })}>
            <ArrowURightUp size={64} />
          </Key>
          <div />
          <Key onClick={() => gameStore.send({ type: "moveLeft" })}>
            <ArrowLeft size={64} />
          </Key>
          <div />
          <Key onClick={() => gameStore.send({ type: "moveRight" })}>
            <ArrowRight size={64} />
          </Key>
          <div />
          <Key
            onTouchStart={() => gameControlStore.send({ type: "startSoftDrop" })}
            onTouchEnd={() => gameControlStore.send({ type: "startSoftDrop" })}
          >
            <ArrowDown size={64} />
          </Key>
          <div />
        </div>
      </div>
      <div class="flex items-center justify-center p-2">
        <Key onClick={() => gameStore.send({ type: "hardDrop" })}>
          <ArrowLineDown class="w-20" />
        </Key>
      </div>
    </footer>
  );
}

interface KeyProps {
  onClick?: () => void;
  onTouchStart?: () => void;
  onTouchEnd?: () => void;
  children: JSXElement;
}

function Key({ children, onClick, onTouchStart, onTouchEnd }: KeyProps) {
  return (
    <button
      type="button"
      class="p-4 aspect-square shadow-md font-medium rounded-lg bg-neutral-600 text-neutral-100 border-neutral-500"
      onClick={onClick}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {children}
    </button>
  );
}
