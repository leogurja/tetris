import type { JSX, JSXElement } from "solid-js";

interface ButtonProps {
  onClick: JSX.EventHandler<HTMLSpanElement, MouseEvent>;
  children: JSXElement;
}

export function Button({ onClick, children }: ButtonProps) {
  return (
    <span
      class="bg-neutral-600 p-2 w-full rounded-md flex justify-center items-center"
      onClick={onClick}
      onKeyDown={() => {}}
    >
      {children}
    </span>
  );
}
