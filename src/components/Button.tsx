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
    <span className="bg-neutral-600 p-2 rounded-md" onClick={onClick}>
      <Icon className="h-6 w-full" />
    </span>
  );
}
