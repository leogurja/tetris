import {
  ArrowDown,
  ArrowLeft,
  ArrowLineDown,
  ArrowRight,
  ArrowURightUp,
} from "@phosphor-icons/react";
import { PropsWithChildren } from "react";
import useTetris from "../../tetris";

export default function TouchControls() {
  const [rotate, moveLeft, moveRight, startSoftDrop, stopSoftDrop, hardDrop] =
    useTetris((t) => [
      t.rotate,
      t.moveLeft,
      t.moveRight,
      t.startSoftDrop,
      t.stopSoftDrop,
      t.hardDrop,
    ]);
  return (
    <footer className="flex w-full justify-evenly justify-self-end">
      <div className="flex items-center justify-center p-2">
        <div className="grid grid-cols-3 place-content-stretch">
          <div />
          <Key onClick={rotate}>
            <ArrowURightUp size={64} />
          </Key>
          <div />
          <Key onClick={moveLeft}>
            <ArrowLeft size={64} />
          </Key>
          <div />
          <Key onClick={moveRight}>
            <ArrowRight size={64} />
          </Key>
          <div />
          <Key onTouchStart={startSoftDrop} onTouchEnd={stopSoftDrop}>
            <ArrowDown size={64} />
          </Key>
          <div />
        </div>
      </div>
      <div className="flex items-center justify-center p-2">
        <Key onClick={hardDrop}>
          <ArrowLineDown className="w-20" />
        </Key>
      </div>
    </footer>
  );
}

interface KeyProps {
  onClick?: () => void;
  onTouchStart?: () => void;
  onTouchEnd?: () => void;
}

function Key({
  children,
  onClick,
  onTouchStart,
  onTouchEnd,
}: PropsWithChildren<KeyProps>) {
  return (
    <button
      type="button"
      className="p-4 aspect-square shadow-md font-medium rounded-lg bg-neutral-600 text-neutral-100 border-neutral-500"
      onClick={onClick}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {children}
    </button>
  );
}
