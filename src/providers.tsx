import type { ReactNode } from "react";
import { AudioProvider } from "./lib/contexts/audio";
import { GameProvider } from "./lib/contexts/game";
import { ScoreProvider } from "./lib/contexts/score";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AudioProvider>
      <ScoreProvider>
        <GameProvider>{children}</GameProvider>
      </ScoreProvider>
    </AudioProvider>
  );
}
