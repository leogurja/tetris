import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowLineDownIcon,
  ArrowRightIcon,
  ArrowURightUpIcon,
} from "@phosphor-icons/react";
import type { PropsWithChildren } from "react";
import { useTetris } from "@/tetris";

export function TouchControls() {
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
            <ArrowURightUpIcon size={64} />
          </Key>
          <div />
          <Key onClick={moveLeft}>
            <ArrowLeftIcon size={64} />
          </Key>
          <div />
          <Key onClick={moveRight}>
            <ArrowRightIcon size={64} />
          </Key>
          <div />
          <Key onTouchEnd={stopSoftDrop} onTouchStart={startSoftDrop}>
            <ArrowDownIcon size={64} />
          </Key>
          <div />
        </div>
      </div>
      <div className="flex items-center justify-center p-2">
        <Key onClick={hardDrop}>
          <ArrowLineDownIcon className="w-20" />
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
      className="aspect-square rounded-lg border-neutral-500 bg-neutral-600 p-4 font-medium text-neutral-100 shadow-md"
      onClick={onClick}
      onTouchEnd={onTouchEnd}
      onTouchStart={onTouchStart}
      type="button"
    >
      {children}
    </button>
  );
}
