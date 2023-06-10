import { useEffect } from "react";

interface useKeyboardOptions {
  onKeyDown: (event: KeyboardEvent) => void;
  onKeyUp: (event: KeyboardEvent) => void;
  isRunning: boolean;
}

export function useKeyboard({
  onKeyDown,
  onKeyUp,
  isRunning,
}: useKeyboardOptions) {
  useEffect(() => {
    if (!isRunning) return;
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keydown", onKeyUp);
    };
  }, [onKeyDown, onKeyUp, isRunning]);
}
