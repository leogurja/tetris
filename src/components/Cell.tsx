import { BlockType } from "../tetris";

interface Props {
  type: BlockType;
  upcoming?: boolean;
}

export function Cell({ type, upcoming = false }: Props) {
  return (
    <div
      className={`aspect-square h-6 md:h-7 lg:h-8 border-2 border-neutral-900 ${type} ${
        upcoming ? "upcoming" : ""
      }`}
    />
  );
}
