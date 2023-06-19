import { useEffect, useState } from "react";
import { useTetris } from "../tetris";
import { useAudio } from "../tetris/audio";
import { LabeledValue } from "./LabeledValue";

export function Score() {
  const [score, level, isGameOver] = useTetris((t) => [
    t.score,
    t.level(),
    t.isGameOver(),
  ]);
  const [record, setRecord] = useState(
    parseInt(localStorage.getItem("Record") || "0")
  );
  const play = useAudio((state) => state.play);

  useEffect(
    () => {
      if (!isGameOver) return;
      if (record < score) {
        localStorage.setItem("Record", score.toString());
        setRecord(score);
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
    <>
      <LabeledValue name="level">{level + 1}</LabeledValue>
      <LabeledValue name="score">{score}</LabeledValue>
      <LabeledValue name="record">{record}</LabeledValue>
    </>
  );
}
