import { BlockType } from "../tetris";

interface Props {
  type: BlockType;
  upcoming?: boolean;
}

export function Cell({ type, upcoming = false }: Props) {
  return (
    <div
      className={`aspect-square border-2 border-neutral-900 ${type} ${
        upcoming ? "upcoming h-6" : "h-8"
      }`}
    />
  );
}
