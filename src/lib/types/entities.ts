export type PieceType = "I" | "J" | "L" | "O" | "S" | "T" | "Z";

export type Color = PieceType | "P" | "";

export interface Block {
  x: number;
  y: number;
  color: Color;
}

export type Floor = Block[];

export type Piece = Block[];

export type Board = Color[];
