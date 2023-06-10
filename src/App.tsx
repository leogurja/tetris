import Board from "./components/Board";
import Menu from "./components/Menu";
import { useGameLoop } from "./tetris";

export default function App() {
  useGameLoop();

  return (
    <main className="bg-neutral-800 h-screen overflow-hidden">
      <h1 className="text-center text-4xl p-10 font-bold text-white">Tetris</h1>
      <p className="text-center text-2xl p-2 font-semibold text-white"></p>
      <div className="flex flex-row">
        <Board />
        <Menu />
      </div>
    </main>
  );
}
