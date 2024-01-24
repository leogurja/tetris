import KeyboardControls from "./KeyboardControls";
import TouchControls from "./TouchControls";
import isTouchDevice from "./isTouchDevice";

export default function Controls() {
	return isTouchDevice() ? <TouchControls /> : <KeyboardControls />;
}
