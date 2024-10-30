import { useEffect } from "react";

interface useKeyboardOptions<Key extends string, RepeatableKey extends Key> {
  onKeyDown: Record<Key, () => void>;
  onKeyUp: Partial<Record<Key, () => void>>;
  allowRepeat: RepeatableKey[];
}

export default function useKeyboard<
  Key extends string,
  RepeatableKey extends Key,
>({ onKeyDown, onKeyUp, allowRepeat }: useKeyboardOptions<Key, RepeatableKey>) {
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

      onKeyUp[event.key as Key]?.();
    };

    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
      document.removeEventListener("keydown", keyUpHandler);
    };
  }, []);
}
