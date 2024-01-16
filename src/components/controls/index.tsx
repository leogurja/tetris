import { TetrisActions } from "../../tetris/types";
import KeyboardControls from "./KeyboardControls";
import TouchControls from "./TouchControls";
import isTouchDevice from "./isTouchDevice";

interface ControlsProps {
	actions: TetrisActions;
}

export default function Controls({ actions }: ControlsProps) {
	return isTouchDevice() ? (
		<TouchControls actions={actions} />
	) : (
		<KeyboardControls actions={actions} />
	);
}
