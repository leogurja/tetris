import { useEffect, useRef } from "react";

export default function useInterval(fn: () => void, interval: number) {
	const fnRef = useRef(fn);

	useEffect(() => {
		fnRef.current = fn;
	}, [fn]);

	useEffect(() => {
		if (interval <= 0) return;

		const intervalId = setInterval(fnRef.current, interval);
		return () => clearInterval(intervalId);
	}, [interval]);
}
