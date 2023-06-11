export enum PieceType {
  I = "I",
  J = "J",
  L = "L",
  O = "O",
  S = "S",
  T = "T",
  Z = "Z",
}

export type BlockType = PieceType | "P" | "";
export type BoardType = BlockType[][];
