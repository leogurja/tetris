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

export default function Button({
	onClick,
	Icon,
}: PropsWithoutRef<ButtonProps>) {
	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: Keys must be captured for movement
		<span
			className="bg-neutral-600 p-2 w-full rounded-md flex justify-center items-center"
			onClick={onClick}
		>
			<Icon className="w-6 aspect-square" />
		</span>
	);
}
