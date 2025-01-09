import { Show } from "solid-js";
import { KeyboardControls } from "./KeyboardControls";
import { TouchControls } from "./TouchControls";

const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

export function Controls() {
  return (
    <Show when={isTouchDevice} fallback={<KeyboardControls />}>
      <TouchControls />
    </Show>
  );
}
