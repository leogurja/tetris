import {
	ArrowDownIcon,
	ArrowDownTrayIcon,
	ArrowLeftIcon,
	ArrowRightIcon,
	ArrowUturnRightIcon,
} from "@heroicons/react/20/solid";
import {
	ForwardRefExoticComponent,
	PropsWithoutRef,
	RefAttributes,
	SVGProps,
} from "react";

export default function TouchControls() {
	return (
		<footer className="flex w-full justify-evenly justify-self-end">
			<div className="flex items-center justify-center p-2">
				<div className="grid grid-cols-3 place-content-stretch">
					<div />
					<Key className="w-16" Icon={ArrowUturnRightIcon} />
					<div />
					<Key className="w-16" Icon={ArrowLeftIcon} />
					<div />
					<Key className="w-16" Icon={ArrowRightIcon} />
					<div />
					<Key className="w-16" Icon={ArrowDownIcon} />
					<div />
				</div>
			</div>
			<div className="flex items-center justify-center p-2">
				<Key className="w-20" Icon={ArrowDownTrayIcon} />
			</div>
		</footer>
	);
}

interface KeyProps {
	large?: boolean;
	className: string;
	Icon: ForwardRefExoticComponent<
		Omit<SVGProps<SVGSVGElement>, "ref"> & {
			title?: string;
			titleId?: string;
		} & RefAttributes<SVGSVGElement>
	>; // tipo dos ícones do heroicons
}

function Key({ Icon, className }: PropsWithoutRef<KeyProps>) {
	return (
		<Icon
			className={`${className} p-4 aspect-square shadow-md font-medium rounded-lg bg-neutral-600 text-neutral-100 border-neutral-500`}
		/>
	);
}
