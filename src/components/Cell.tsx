import { BlockType } from "../tetris";

interface Props {
  type: BlockType;
  upcoming?: boolean;
}

export function Cell({ type, upcoming = false }: Props) {
  return (
    <div
      className={`aspect-square border sm:h-6 md:h-8 lg:h-10 sm:border-2 border-neutral-900 ${type} ${
        upcoming ? "upcoming h-3" : "h-5"
      }`}
    />
  );
}
