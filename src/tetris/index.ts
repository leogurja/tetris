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

export enum GameState {
  Playing = "Playing",
  GameOver = "GameOver",
  Paused = "Paused",
}

// state
export const pieceAtom = atom(Piece.take());
export const floorAtom = atom(new Floor());
export const scoreAtom = atom(0);
export const recordAtom = atomWithStorage("record", 0);
export const gameStateAtom = atom(GameState.Paused);
export const levelAtom = atom((get) =>
  Math.min(Math.floor(get(scoreAtom) / 1000), 15)
);

// internals
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
  const [gameState, setGameState] = useAtom(gameStateAtom);
  const tickRate = useAtomValue(tickRateAtom);
  const level = useAtomValue(levelAtom);
  const setRecord = useSetAtom(recordAtom);

  // derived state
  const calculatedTickRate = isAccelerated ? 50 : tickRate;

  const update = useCallback(() => {
    setPiece((piece) => {
      const updatedPiece = piece.translate(0, 1);

      if (updatedPiece.collides(floor)) {
        const addedScore = floor.push(piece.blocks);
        if (addedScore > 0) play("clear");
        setScore((s) => s + addedScore);
        const newPiece = Piece.take();

        if (newPiece.collides(floor)) setGameState(GameState.GameOver);
        return newPiece;
      }

      return updatedPiece;
    });
  }, [setScore, floor, setPiece, setGameState, play]);

  const reset = useCallback(() => {
    setFloor(new Floor());
    setPiece(Piece.take());
    setScore(0);
  }, [setFloor, setPiece, setScore]);

  // keyboard events
  useKeyboard({
    onKeyDown: {
      ArrowDown: () => setIsAccelerated(true),
      ArrowUp: () => {
        if (gameState !== GameState.Playing) return;
        play("click");
        setPiece((piece) => {
          const rotatedPiece = piece.rotate();
          if (rotatedPiece.collides(floor)) return piece;

          return rotatedPiece;
        });
      },
      ArrowLeft: () => {
        if (gameState !== GameState.Playing) return;
        play("click");
        setPiece((piece) => {
          const movedPiece = piece.translate(-1, 0);
          if (movedPiece.collides(floor)) return piece;
          return movedPiece;
        });
      },
      ArrowRight: () => {
        if (gameState !== GameState.Playing) return;
        play("click");
        setPiece((piece) => {
          const movedPiece = piece.translate(1, 0);
          if (movedPiece.collides(floor)) return piece;
          return movedPiece;
        });
      },
      " ": () => {
        if (gameState !== GameState.Playing) return;
        play("drop");
        const addedScore = floor.push(piece.project(floor).blocks);
        if (addedScore > 0) play("clear");
        setScore((s) => s + addedScore);
        setPiece(Piece.take());
      },
    },
    onKeyUp: {
      ArrowDown: () => setIsAccelerated(false),
    },
    allowRepeat: ["ArrowLeft", "ArrowRight"],
  });

  // handle gameState change
  useEffect(() => {
    switch (gameState) {
      case GameState.GameOver:
        play("gameOver");
        pauseMusic();
        setRecord((prev) => Math.max(prev, score));
        break;
      case GameState.Playing:
        playMusic();
        break;
      case GameState.Paused:
        pauseMusic();
        break;
    }
  }, [play, setRecord, score, gameState, pauseMusic, playMusic]);

  // game loop
  useEffect(() => {
    if (gameState !== GameState.Playing) return;

    const intervalId = setInterval(update, calculatedTickRate);
    return () => clearInterval(intervalId);
  }, [update, gameState, isAccelerated, calculatedTickRate]);

  // play levelup sound
  useEffect(() => {
    if (level !== 0) play("levelUp");
  }, [level, play]);

  return { reset };
}
