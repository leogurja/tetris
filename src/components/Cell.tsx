import { BlockType } from "../tetris";

interface Props {
	type: BlockType;
	upcoming?: boolean;
}

export default function Cell({ type, upcoming = false }: Props) {
	return (
		<div
			className={`aspect-square flex border sm:border-2 border-neutral-900 ${type} ${
				upcoming ? "upcoming" : null
			}`}
		/>
	);
}
