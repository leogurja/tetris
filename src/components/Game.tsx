import useTetris from "../tetris";
import Board from "./Board";
import Statistics from "./Statistics";
import Controls from "./controls";
import Menu from "./menu";

export default function Game() {
	const tetris = useTetris();

	return (
		<>
			<main className="aspect-[9/16] max-w-full h-full flex flex-col items-center p-2">
				<Statistics {...tetris} />
				<section className="flex h-full w-full justify-center">
					<Board {...tetris} />
					<Menu {...tetris} />
				</section>
				<Controls />
			</main>
		</>
	);
}
