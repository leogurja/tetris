import { cacheTag } from "next/cache";
import { getScores } from "@/lib/data/scores";

export default async function LeaderboardPage() {
  "use cache";
  cacheTag("scores");

  const scores = await getScores();
  return (
    <div>
      <h1>Leaderboard</h1>
      <ul>
        {scores.map((score) => (
          <li key={score.id}>
            {score.player} - {score.score}
          </li>
        ))}
      </ul>
    </div>
  );
}
