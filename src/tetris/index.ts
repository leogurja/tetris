import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useCallback, useEffect } from "react";
import { Floor } from "./floor";
import { Piece } from "./piece";
import { useAudio } from "./useAudio";
import { useKeyboard } from "./useKeyboard";

export { render } from "./render";
export { type BlockType, type BoardType } from "./types";
export { Piece };

// state
export const pieceAtom = atom(Piece.take());
export const floorAtom = atom(new Floor());
export const scoreAtom = atom(0);
export const recordAtom = atomWithStorage("record", 0);
export const levelAtom = atom((get) =>
  Math.min(Math.floor(get(scoreAtom) / 1000), 15)
);

export const isGameOverAtom = atom((get) =>
  get(pieceAtom).collides(get(floorAtom))
);
export const isRunningAtom = atom(
  (get) => !get(isPausedAtom) && !get(isGameOverAtom)
);

// internals
const isPausedAtom = atom(true);
const isAcceleratedAtom = atom(false);
const tickRateAtom = atom(
  (get) => (0.8 - get(levelAtom) * 0.007) ** get(levelAtom) * 1000
);

export function useTetris() {
  const { play, playMusic, pauseMusic } = useAudio();

  // state
  const [piece, setPiece] = useAtom(pieceAtom);
  const [isAccelerated, setIsAccelerated] = useAtom(isAcceleratedAtom);
  const [score, setScore] = useAtom(scoreAtom);
  const [floor, setFloor] = useAtom(floorAtom);
  const tickRate = useAtomValue(tickRateAtom);
  const level = useAtomValue(levelAtom);
  const setRecord = useSetAtom(recordAtom);
  const setIsPaused = useSetAtom(isPausedAtom);

  // derived state
  const isGameOver = useAtomValue(isGameOverAtom);
  const isRunning = useAtomValue(isRunningAtom);
  const calculatedTickRate = isAccelerated ? 50 : tickRate;

  const update = useCallback(() => {
    setPiece((piece) => {
      const updatedPiece = piece.translate(0, 1);

      if (updatedPiece.collides(floor)) {
        setScore((s) => s + floor.push(piece.blocks));

        return Piece.take();
      }

      return updatedPiece;
    });
  }, [setScore, floor, setPiece]);

  const reset = useCallback(() => {
    setFloor(new Floor());
    setPiece(Piece.take());
    setIsPaused(true);
    setScore(0);
  }, [setFloor, setIsPaused, setPiece, setScore]);

  useKeyboard({
    onKeyDown: {
      ArrowDown: () => setIsAccelerated(true),
      ArrowUp: () => {
        if (!isRunning) return;
        play("click");
        setPiece((piece) => {
          const rotatedPiece = piece.rotate();
          if (rotatedPiece.collides(floor)) return piece;

          return rotatedPiece;
        });
      },
      ArrowLeft: () => {
        if (!isRunning) return;
        play("click");
        setPiece((piece) => {
          const movedPiece = piece.translate(-1, 0);
          if (movedPiece.collides(floor)) return piece;
          return movedPiece;
        });
      },
      ArrowRight: () => {
        if (!isRunning) return;
        play("click");
        setPiece((piece) => {
          const movedPiece = piece.translate(1, 0);
          if (movedPiece.collides(floor)) return piece;
          return movedPiece;
        });
      },
      " ": () => {
        if (!isRunning) return;
        play("drop");
        setScore((s) => s + floor.push(piece.project(floor).blocks));
        setPiece(Piece.take());
      },
    },
    onKeyUp: {
      ArrowDown: () => setIsAccelerated(false),
    },
    allowHold: ["ArrowLeft", "ArrowRight"],
  });

  useEffect(() => {
    if (!isGameOver) return;
    play("gameOver");
    setRecord((prev) => Math.max(prev, score));
  }, [isGameOver, play, setRecord, score]);

  useEffect(() => {
    if (!isRunning) return pauseMusic();
    playMusic();
  }, [isRunning, pauseMusic, playMusic]);

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(update, calculatedTickRate);
    return () => clearInterval(intervalId);
  }, [update, isRunning, isAccelerated, calculatedTickRate]);

  useEffect(() => {
    if (level !== 0) play("levelUp");
  }, [level, play]);

  useEffect(() => {
    if (score !== 0) play("clear");
  }, [score, play]);

  return { reset, isGameOver, isRunning, setIsPaused };
}
