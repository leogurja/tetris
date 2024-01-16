import {
	ArrowDownIcon,
	ArrowDownTrayIcon,
	ArrowLeftIcon,
	ArrowRightIcon,
	ArrowUturnRightIcon,
} from "@heroicons/react/20/solid";
import { PropsWithChildren } from "react";
import { TetrisActions } from "../../tetris/types";

interface TouchControlsProps {
	actions: TetrisActions;
}

export default function TouchControls({ actions }: TouchControlsProps) {
	return (
		<footer className="flex w-full justify-evenly justify-self-end">
			<div className="flex items-center justify-center p-2">
				<div className="grid grid-cols-3 place-content-stretch">
					<div />
					<Key onClick={actions.rotate}>
						<ArrowUturnRightIcon className="w-16" />
					</Key>
					<div />
					<Key onClick={actions.moveLeft}>
						<ArrowLeftIcon className="w-16" />
					</Key>
					<div />
					<Key onClick={actions.moveRight}>
						<ArrowRightIcon className="w-16" />
					</Key>
					<div />
					<Key
						onTouchStart={actions.startSoftDrop}
						onTouchEnd={actions.stopSoftDrop}
					>
						<ArrowDownIcon className="w-16" />
					</Key>
					<div />
				</div>
			</div>
			<div className="flex items-center justify-center p-2">
				<Key onClick={actions.hardDrop}>
					<ArrowDownTrayIcon className="w-20" />
				</Key>
			</div>
		</footer>
	);
}

interface KeyProps {
	onClick?: () => void;
	onTouchStart?: () => void;
	onTouchEnd?: () => void;
}

function Key({
	children,
	onClick,
	onTouchStart,
	onTouchEnd,
}: PropsWithChildren<KeyProps>) {
	return (
		<button
			type="button"
			className="p-4 aspect-square shadow-md font-medium rounded-lg bg-neutral-600 text-neutral-100 border-neutral-500"
			onClick={onClick}
			onTouchStart={onTouchStart}
			onTouchEnd={onTouchEnd}
		>
			{children}
		</button>
	);
}
