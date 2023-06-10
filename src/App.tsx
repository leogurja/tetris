import { Game } from "./components/Game";

export default function App() {
  return (
    <main className="bg-neutral-800 text-white h-screen overflow-hidden">
      <h1 className="text-center text-4xl p-10 font-bold">Tetris</h1>
      <Game />
    </main>
  );
}
