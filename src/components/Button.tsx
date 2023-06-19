import {
  ForwardRefExoticComponent,
  MouseEvent,
  PropsWithoutRef,
  RefAttributes,
  SVGProps,
} from "react";

interface ButtonProps {
  onClick: (event: MouseEvent) => void;
  Icon: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, "ref"> & {
      title?: string;
      titleId?: string;
    } & RefAttributes<SVGSVGElement>
  >; // tipo dos ícones do heroicons
}

export function Button({ onClick, Icon }: PropsWithoutRef<ButtonProps>) {
  return (
    <span
      className="bg-neutral-600 p-2 h-full w-full rounded-md flex items-center justify-center"
      onClick={onClick}
    >
      <Icon className="w-6 aspect-square" />
    </span>
  );
}
