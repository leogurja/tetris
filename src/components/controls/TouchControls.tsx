import {
	ArrowDownIcon,
	ArrowDownTrayIcon,
	ArrowLeftIcon,
	ArrowRightIcon,
	ArrowUturnRightIcon,
} from "@heroicons/react/20/solid";
import { PropsWithChildren } from "react";
import useTetrisStore from "../../tetris";

export default function TouchControls() {
	const [rotate, moveLeft, moveRight, startSoftDrop, stopSoftDrop, hardDrop] =
		useTetrisStore((t) => [
			t.rotate,
			t.moveLeft,
			t.moveRight,
			t.startSoftDrop,
			t.stopSoftDrop,
			t.hardDrop,
		]);
	return (
		<footer className="flex w-full justify-evenly justify-self-end">
			<div className="flex items-center justify-center p-2">
				<div className="grid grid-cols-3 place-content-stretch">
					<div />
					<Key onClick={rotate}>
						<ArrowUturnRightIcon className="w-16" />
					</Key>
					<div />
					<Key onClick={moveLeft}>
						<ArrowLeftIcon className="w-16" />
					</Key>
					<div />
					<Key onClick={moveRight}>
						<ArrowRightIcon className="w-16" />
					</Key>
					<div />
					<Key onTouchStart={startSoftDrop} onTouchEnd={stopSoftDrop}>
						<ArrowDownIcon className="w-16" />
					</Key>
					<div />
				</div>
			</div>
			<div className="flex items-center justify-center p-2">
				<Key onClick={hardDrop}>
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
