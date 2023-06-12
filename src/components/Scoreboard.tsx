import { useEffect } from "react";
import { useTetris } from "../tetris";
import { useScoreboard } from "../tetris/useScoreboard";

export function Scoreboard() {
  const [score, isGameOver] = useTetris((t) => [t.score, t.isGameOver]);
  const [scoreboard, save] = useScoreboard((t) => [t.scoreboard, t.save]);

  useEffect(
    () => {
      if (isGameOver) save(score);
    },
    // não queremos rodar este efeito caso score ou save mudem
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isGameOver]
  );

  return (
    <div>
      <h2>Score Board</h2>
      <p>Score: {score}</p>
      {scoreboard.map((score, index) => (
        <p key={index}>
          {index + 1}. {score}
        </p>
      ))}
    </div>
  );
}
