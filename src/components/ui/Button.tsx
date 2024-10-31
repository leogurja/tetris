import type { Icon } from "@phosphor-icons/react";
import { MouseEvent, PropsWithoutRef } from "react";

interface ButtonProps {
  onClick: (event: MouseEvent) => void;
  Icon: Icon;
}

export function Button({ onClick, Icon }: PropsWithoutRef<ButtonProps>) {
  return (
    <span
      className="bg-neutral-600 p-2 w-full rounded-md flex justify-center items-center"
      onClick={onClick}
    >
      <Icon size={24} weight="fill" />
    </span>
  );
}
