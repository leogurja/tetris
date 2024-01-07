import { useCallback, useEffect } from "react";

interface useKeyboardOptions<Key extends string, RepeatableKey extends Key> {
	onKeyDown: Record<Key, () => void>;
	onKeyUp: Partial<Record<Key, () => void>>;
	allowRepeat: RepeatableKey[];
}

const registeredEvents: Record<string, number> = {};

export default function useKeyboard<
	Key extends string,
	RepeatableKey extends Key,
>({ onKeyDown, onKeyUp, allowRepeat }: useKeyboardOptions<Key, RepeatableKey>) {
	const press = useCallback(
		(key: Key) => {
			if (!(key in onKeyDown)) return false;

			if (isRepeatableKey(key, allowRepeat)) {
				const keyLoop = () => {
					onKeyDown[key]();
					registeredEvents[key] = setTimeout(keyLoop, 200);
				};
				clearTimeout(registeredEvents[key]);
				registeredEvents[key] = setTimeout(keyLoop, 500);
			}
			onKeyDown[key]();

			return true;
		},
		[allowRepeat, onKeyDown],
	);

	const unpress = useCallback(
		(key: Key) => {
			if (!(key in onKeyDown)) return false;

			if (isRepeatableKey(key, allowRepeat)) {
				clearTimeout(registeredEvents[key]);
			}
			onKeyUp[key]?.();
			return true;
		},
		[allowRepeat, onKeyDown, onKeyUp],
	);

	useEffect(() => {
		const keyDownHandler = (event: KeyboardEvent) => {
			if (press(event.key as Key)) event.preventDefault();
		};

		const keyUpHandler = (event: KeyboardEvent) => {
			if (unpress(event.key as Key)) event.preventDefault();
		};

		document.addEventListener("keydown", keyDownHandler);
		document.addEventListener("keyup", keyUpHandler);
		return () => {
			document.removeEventListener("keydown", keyDownHandler);
			document.removeEventListener("keydown", keyUpHandler);
		};
	}, [press, unpress]);

	return { press, unpress };
}

function isRepeatableKey<Key extends string, RepeatableKey extends Key>(
	key: Key,
	repeatables: RepeatableKey[],
): key is RepeatableKey {
	return repeatables.includes(key as RepeatableKey);
}
