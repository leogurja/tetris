import z from "zod";

export const createScoreSchema = z.object({
  player: z.string().min(1),
  score: z.number().min(0),
});
