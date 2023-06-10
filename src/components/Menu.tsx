import { useTetris } from "../tetris";

export function Menu() {
  const reset = useTetris((t) => t.reset);
  const score = useTetris((t) => t.score);

  return (
    <aside className="bg-neutral-700 rounded-lg px-10 py-2 text-white">
      <p>Score: {score}</p>
      <button onClick={reset}>Reset</button>
    </aside>
  );
}
