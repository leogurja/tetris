import type { Score } from "@prisma/client";
import { cacheTag, revalidateTag } from "next/cache";
import { prisma } from "./prisma";

const PAGE_SIZE = 50;

export function getScores(page = 1) {
  return prisma.score.findMany({
    orderBy: {
      score: "desc",
    },
    take: PAGE_SIZE,
    skip: (page - 1) * PAGE_SIZE,
  });
}

export function getPlayerScores(player: string, page = 1) {
  cacheTag("scores");
  return prisma.score.findMany({
    where: {
      player,
    },
    orderBy: {
      score: "desc",
    },
    take: PAGE_SIZE,
    skip: (page - 1) * PAGE_SIZE,
  });
}

export function createScore(score: Omit<Score, "id" | "createdAt">) {
  revalidateTag("scores", "max");
  return prisma.score.create({
    data: score,
  });
}
