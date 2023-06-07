import Board from "./components/Board";
import useTetris from "./hooks/useTetris";

export default function App() {
  const { board, isPlaying, reset } = useTetris();

  return (
    <main className="bg-neutral-800 h-screen">
      <h1 className="text-center text-4xl p-10 font-bold text-white">Tetris</h1>
      <p className="text-center text-2xl p-2 font-semibold text-white">
        {!isPlaying ? "Game Over" : "a"}
      </p>
      <Board board={board} />
      <button onClick={reset}>Reset</button>
    </main>
  );
}
