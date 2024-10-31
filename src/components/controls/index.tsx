import { KeyboardControls } from "./KeyboardControls";
import { TouchControls } from "./TouchControls";

const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

export function Controls() {
  return isTouchDevice ? <TouchControls /> : <KeyboardControls />;
}
