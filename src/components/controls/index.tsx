import { KeyboardControls } from "./keyboard-controls";
import { TouchControls } from "./touch-controls";

export function Controls() {
  const isTouchDevice =
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  return isTouchDevice ? <TouchControls /> : <KeyboardControls />;
}
