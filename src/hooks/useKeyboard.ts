import { useEffect } from "react";

interface useKeyboardOptions {
  onKeyDown: (event: KeyboardEvent) => void;
  onKeyUp: (event: KeyboardEvent) => void;
}

export default function useKeyboard({
  onKeyDown,
  onKeyUp,
}: useKeyboardOptions) {
  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keydown", onKeyUp);
    };
  }, []);
}
