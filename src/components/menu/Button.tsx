import type { Icon } from "@phosphor-icons/react";
import { MouseEvent, PropsWithoutRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace Button {
  export interface Props {
    onClick: (event: MouseEvent) => void;
    Icon: Icon;
  }
}

export default function Button({
  onClick,
  Icon,
}: PropsWithoutRef<Button.Props>) {
  return (
    <span
      className="bg-neutral-600 p-2 w-full rounded-md flex justify-center items-center"
      onClick={onClick}
    >
      <Icon size={24} weight="fill" />
    </span>
  );
}
