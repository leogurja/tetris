import { colors } from "../colors";
import { BlockType } from "../tetris";

interface Props {
  type: BlockType;
}

export function Cell({ type }: Props) {
  return (
    <div className={`h-8 w-8 border-2 border-neutral-900 ${colors[type]}`} />
  );
}
