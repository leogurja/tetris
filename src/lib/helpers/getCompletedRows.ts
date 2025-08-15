import type { Floor } from "../types/entities";

export function getCompletedRows(floor: Floor) {
  const occupiedYs = [...new Set(floor.map((b) => b.y))].sort((a, b) => a - b);
  return occupiedYs.filter((y) => floor.filter((b) => b.y === y).length === 10);
}
