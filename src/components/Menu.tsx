import { useTetris } from "../tetris";

export default function Menu() {
  const reset = useTetris((t) => t.reset);

  return (
    <aside>
      <button onClick={reset}>Reset</button>
    </aside>
  );
}
