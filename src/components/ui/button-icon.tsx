"use client";
import type { Icon as IconType } from "@phosphor-icons/react";
import type { MouseEvent } from "react";

interface ButtonProps {
  onClick: (event: MouseEvent) => void;
  icon: IconType;
}

export function Button({ onClick, icon: Icon }: ButtonProps) {
  return (
    <button
      className="flex w-full items-center justify-center rounded-md bg-neutral-600 p-2 shadow-sm"
      onClick={onClick}
      type="button"
    >
      <Icon size={24} weight="fill" />
    </button>
  );
}
