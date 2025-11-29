"use client";
import { twMerge } from "tailwind-merge";
import { useContainerSize } from "@/hooks/use-container-size";
import { useTetris } from "@/tetris";

export function Board() {
  const { width, height, ref } = useContainerSize();
  const [piece, floor, gameState] = useTetris((t) => [
    t.piece,
    t.floor,
    t.gameState,
  ]);
  const projectedPiece = piece.project(floor);

  return (
    <main
      className={twMerge(
        "h-fit w-fit select-none overflow-hidden rounded-2xl border border-neutral-700 bg-neutral-900 p-2 shadow-md shadow-neutral-950",
        gameState !== "Playing" ? "blur-sm" : null
      )}
    >
      <div className="relative mt-auto aspect-1/2 w-xs" ref={ref}>
        {projectedPiece.render({ width, height }).map((props, index) => (
          <div
            {...props}
            // biome-ignore lint/suspicious/noArrayIndexKey: array is static
            key={`projected-${index}`}
          />
        ))}
        {piece.render({ width, height }).map((props, index) => (
          <div
            {...props}
            // biome-ignore lint/suspicious/noArrayIndexKey: array is static
            key={`piece-${index}`}
          />
        ))}
        {floor.render({ width, height }).map((props, index) => (
          <div
            {...props}
            // biome-ignore lint/suspicious/noArrayIndexKey: array is static
            key={`floor-${index}`}
          />
        ))}
      </div>
    </main>
  );
}
