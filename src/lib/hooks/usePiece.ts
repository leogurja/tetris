import { useReducer } from "react";
import { rotatePiece } from "../actions/rotate";
import { translatePiece } from "../actions/translate";
import { useAudio } from "../contexts/audio";
import { projectPiece } from "../helpers/projectPiece";
import type { Floor, Piece } from "../types/entities";

export type PieceAction =
  | {
      type: "move";
      x: number;
    }
  | {
      type: "set";
      piece: Piece;
    }
  | {
      type: "fall" | "rotate";
    }
  | {
      type: "drop";
      floor: Floor;
    };

export function usePiece(initialPiece: () => Piece) {
  const { dispatchAudio } = useAudio();

  const pieceReducer = (piece: Piece, action: PieceAction) => {
    switch (action.type) {
      case "fall":
        return translatePiece(piece, 0, 1);
      case "rotate":
        return rotatePiece(piece);
      case "move":
        return translatePiece(piece, 1, 0);
      case "set":
        return action.piece;
      case "drop":
        dispatchAudio({ type: "play", sfx: "Drop" });
        return projectPiece(piece, action.floor);
      default:
        throw new Error("Unknown action type");
    }
  };
  return useReducer(pieceReducer, null, initialPiece);
}
