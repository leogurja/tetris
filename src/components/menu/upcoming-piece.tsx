"use client";
import { useContainerSize } from "@/hooks/use-container-size";
import { useTetris } from "@/tetris";

export function UpcomingPiece() {
  const { width, height, ref } = useContainerSize();
  const [nextPiece] = useTetris((t) => [t.nextPiece]);

  return (
    <div className="flex aspect-square w-full flex-col items-center justify-center rounded-xl bg-neutral-900 p-1">
      <div className="relative aspect-square w-20 select-none" ref={ref}>
        {nextPiece
          .render({ width, height, isUpcoming: true })
          .map((props, index) => (
            <div
              {...props}
              // biome-ignore lint/suspicious/noArrayIndexKey: array is static
              key={index}
            />
          ))}
      </div>
    </div>
  );
}
