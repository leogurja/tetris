import { useEffect } from "react";

interface useKeyboardOptions {
  onKeyDown: Record<string, () => void>;
  onKeyUp: Record<string, () => void>;
  allowHold: string[];
  isRunning: boolean;
}

export function useKeyboard({
  onKeyDown,
  onKeyUp,
  allowHold,
  isRunning,
}: useKeyboardOptions) {
  useEffect(() => {
    if (!isRunning) return;
    const keyDownHandler = (event: KeyboardEvent) => {
      const handler = onKeyDown[event.key];
      if (!handler) return;
      event.preventDefault();
      if (event.repeat && !allowHold.includes(event.key)) return;
      handler();
    };
    const keyUpHandler = (event: KeyboardEvent) => {
      const handler = onKeyUp[event.key];
      if (!handler) return;
      event.preventDefault();
      handler();
    };

    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
      document.removeEventListener("keydown", keyUpHandler);
    };
  }, [onKeyDown, onKeyUp, isRunning, allowHold]);
}
