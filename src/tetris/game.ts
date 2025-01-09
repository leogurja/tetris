import { createStore } from "@xstate/store";
import { audioStore } from "./audioControl";
import { gameControlStore } from "./gameControl";
import { Floor } from "./objects/floor";
import { GameState } from "./objects/gameState";
import { Piece } from "./objects/piece";
import { scoreStore } from "./scoreControl";

export const gameStore = createStore({
  context: {
    piece: Piece.take(),
    nextPiece: Piece.peek(),
    floor: new Floor(),
  },
  on: {
    update: ({ piece, floor }) => {
      const updatedPiece = piece.translate(0, 1);
      if (!updatedPiece.collides(floor)) return { piece: updatedPiece };

      const addedScore = floor.push(piece.blocks);
      if (addedScore > 0) scoreStore.send({ type: "add", by: addedScore });

      piece = Piece.take();
      if (piece.collides(floor)) {
        audioStore.send({ type: "playSfx", sfx: "game-over" });
        audioStore.send({ type: "pauseMusic" });
        gameControlStore.send({ type: "setGameState", gameState: GameState.GameOver });
        return {};
      }

      return {
        floor,
        piece: Piece.take(),
        nextPiece: Piece.peek(),
      };
    },
    reset: {
      piece: () => Piece.take(),
      nextPiece: () => Piece.peek(),
      floor: () => new Floor(),
    },
    // piece movements
    rotate: {
      piece: ({ piece, floor }) => {
        audioStore.send({ type: "playSfx", sfx: "click" });

        const rotatedPiece = piece.rotate();
        return rotatedPiece.collides(floor) ? piece : rotatedPiece;
      },
    },
    moveLeft: {
      piece: ({ piece, floor }) => {
        audioStore.send({ type: "playSfx", sfx: "click" });

        const movedPiece = piece.translate(-1, 0);
        return movedPiece.collides(floor) ? piece : movedPiece;
      },
    },
    moveRight: {
      piece: ({ piece, floor }) => {
        audioStore.send({ type: "playSfx", sfx: "click" });

        const movedPiece = piece.translate(1, 0);
        return movedPiece.collides(floor) ? piece : movedPiece;
      },
    },
    hardDrop: ({ piece, floor }) => {
      audioStore.send({ type: "playSfx", sfx: "drop" });

      const addedScore = floor.push(piece.project(floor).blocks);
      if (addedScore > 0) scoreStore.send({ type: "add", by: addedScore });

      return { piece: Piece.take(), nextPiece: Piece.peek() };
    },
  },
});
