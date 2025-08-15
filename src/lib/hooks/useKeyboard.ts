import { useEffect } from "react";
import { useAudio } from "../contexts/audio";

interface useKeyboardOptions<Key extends string, RepeatableKey extends Key> {
  onKeyDown: Record<Key, () => void>;
  onKeyUp: Partial<Record<Key, () => void>>;
  allowRepeat: RepeatableKey[];
}

export function useKeyboard<Key extends string, RepeatableKey extends Key>({
  onKeyDown,
  onKeyUp,
  allowRepeat,
}: useKeyboardOptions<Key, RepeatableKey>) {
  const { dispatchAudio } = useAudio();
  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (!(event.key in onKeyDown)) return;
      if (!allowRepeat.includes(event.key as RepeatableKey) && event.repeat)
        return;

      event.preventDefault();

      onKeyDown[event.key as Key]();
    };

    const keyUpHandler = (event: KeyboardEvent) => {
      if (!(event.key in onKeyUp)) return;
      event.preventDefault();

      dispatchAudio({ type: "play", sfx: "Click" });
      onKeyUp[event.key as Key]?.();
    };

    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
      document.removeEventListener("keydown", keyUpHandler);
    };
  }, [allowRepeat, onKeyDown, onKeyUp]);
}
