"use server";

import { createScore } from "../data/scores";
import { createScoreSchema } from "../schemas/create-score";
import { actionClient } from "./safe-action";

export const createScoreAction = actionClient
  .inputSchema(createScoreSchema)
  .action(async ({ parsedInput }) => {
    const score = await createScore(parsedInput);
    return score;
  });
