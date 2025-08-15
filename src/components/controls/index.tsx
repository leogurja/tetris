import { isTouchDevice } from "../../lib/helpers/isTouchDevice";
import { KeyboardControls } from "./KeyboardControls";
import { TouchControls } from "./TouchControls";

export function Controls() {
  return isTouchDevice ? <TouchControls /> : <KeyboardControls />;
}
