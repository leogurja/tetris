import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ActionDispatch,
  type ReactNode,
} from "react";
import { translatePiece } from "../actions/translate";
import { scoreTable } from "../constants/scoreTable";
import { useAudio } from "../contexts/audio";
import { useScore } from "../contexts/score";
import { pieceCollidesWithFloor } from "../helpers/collidesWithFloor";
import { getCompletedRows } from "../helpers/getCompletedRows";
import { projectPiece } from "../helpers/projectPiece";
import { renderBoard } from "../helpers/renderBoard";
import { useBag } from "../hooks/useBag";
import { useFloor } from "../hooks/useFloor";
import { usePiece, type PieceAction } from "../hooks/usePiece";
import type { Board, Piece } from "../types/entities";
import { GameState } from "../types/gameState";

interface GameContextType {
  board: Board;
  nextPiece: Piece;
  dispatch: ActionDispatch<[action: PieceAction]>;
  gameState: GameState;
  toggleGameState: () => void;
  dropPiece: () => void;
  setIsAccelerated: (value: boolean) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const { dispatchAudio } = useAudio();
  const { tickRate, dispatchScore } = useScore();
  const bag = useBag();
  const [floor, dispatchFloor] = useFloor();
  const [piece, dispatchPiece] = usePiece(() => bag.take());
  const [isAccelerated, setIsAccelerated] = useState(false);
  const [gameState, setGameState] = useState(GameState.Paused);

  const toggleGameState = () =>
    setGameState((prev) => {
      switch (prev) {
        case GameState.Playing:
          return GameState.Paused;
        case GameState.Paused:
          return GameState.Playing;
        case GameState.GameOver:
          bag.reset();
          dispatchScore({ type: "reset" });
          dispatchFloor({ type: "reset" });
          dispatchPiece({ type: "set", piece: bag.take() });
          return GameState.Playing;
      }
    });

  const nextPiece = bag.peek();
  const projectedPiece = projectPiece(piece, floor);
  const board = renderBoard(floor, piece, projectedPiece);

  // actions
  const update = () => {
    // handle game over
    if (pieceCollidesWithFloor(piece, floor)) {
      setGameState(GameState.GameOver);
      dispatchAudio({ type: "play", sfx: "GameOver" });
      return;
    }

    // add score for rows completed on the previous tick
    const completedRows = getCompletedRows(floor);
    dispatchScore({ type: "add", amount: scoreTable[completedRows.length]! });
    dispatchFloor({ type: "clear", completedRows });

    let newPiece = translatePiece(piece, 0, 1);

    if (pieceCollidesWithFloor(newPiece, floor)) {
      dispatchFloor({ type: "push", piece });
      newPiece = bag.take();
    }

    dispatchPiece({ type: "set", piece: newPiece });
  };

  const dropPiece = () => {
    dispatchPiece({ type: "set", piece: projectPiece(piece, floor) });
  };

  // game loop
  useEffect(() => {
    if (gameState !== GameState.Playing) return;
    const interval = setInterval(update, isAccelerated ? 50 : tickRate);
    return () => clearInterval(interval);
  }, [gameState, tickRate, isAccelerated, update]);

  return (
    <GameContext.Provider
      value={{
        board,
        gameState,
        nextPiece,
        dispatch: dispatchPiece,
        dropPiece,
        setIsAccelerated,
        toggleGameState,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
