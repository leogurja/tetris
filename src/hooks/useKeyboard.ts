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
	// biome-ignore lint/correctness/useExhaustiveDependencies: rule seems to be bugged
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
		[onKeyDown, allowRepeat],
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: rule seems to be bugged
	const unpress = useCallback(
		(key: Key) => {
			if (!(key in onKeyUp)) return false;

			if (isRepeatableKey(key, allowRepeat)) {
				clearTimeout(registeredEvents[key]);
			}
			onKeyUp[key]?.();
			return true;
		},
		[onKeyUp, allowRepeat],
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
