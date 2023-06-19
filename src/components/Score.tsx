import { useEffect, useState } from "react";
import { useTetris } from "../tetris";
import { useAudio } from "../tetris/audio";

export function Score() {
  const [score, isGameOver] = useTetris((t) => [t.score, t.isGameOver()]);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem("highScore") || "0")
  );
  const play = useAudio((state) => state.play);

  useEffect(
    () => {
      if (!isGameOver) return;
      if (highScore < score) {
        localStorage.setItem("highScore", score.toString());
        setHighScore(score);
      }
    },
    // não queremos rodar este efeito caso score ou save mudem
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isGameOver]
  );

  useEffect(() => {
    if (score != 0) play("clear");
    // não queremos rodar este efeito caso score ou save mudem
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score]);

  return (
    <div>
      <h2 className="font-bold text-lg mt-8">Score</h2>
      <p className="text-4xl">{score}</p>
      <h2 className="font-bold text-lg mt-8">Record</h2>
      <p className="text-4xl">{highScore}</p>
    </div>
  );
}
