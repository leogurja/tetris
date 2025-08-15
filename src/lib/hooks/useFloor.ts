import { useReducer } from "react";
import { translateBlock } from "../actions/translate";
import type { Floor, Piece } from "../types/entities";

type Action =
  | {
      type: "push";
      piece: Piece;
    }
  | {
      type: "reset";
    }
  | {
      type: "clear";
      completedRows: number[];
    };

function floorReducer(floor: Floor, action: Action): Floor {
  switch (action.type) {
    case "push":
      return [...floor, ...action.piece];
    case "reset":
      return [];
    case "clear":
      for (const y of action.completedRows) {
        // Remove blocks from the floor that are in the completed rows
        floor = floor
          .filter((block) => block.y !== y)
          .map((b) => (b.y < y ? translateBlock(b, 0, 1) : b));
      }
      return floor;
    default:
      throw new Error("Unknown action type");
  }
}

export function useFloor() {
  return useReducer(floorReducer, []);
}
