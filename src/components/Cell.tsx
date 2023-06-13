import { BlockType } from "../tetris";

interface Props {
  type: BlockType;
  upcoming?: boolean;
}

export function Cell({ type, upcoming = false }: Props) {
  return (
    <div
      className={`h-8 w-8 border-2 border-neutral-900 ${type} ${
        upcoming ? "upcoming" : null
      }`}
    />
  );
}
