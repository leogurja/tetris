import { useEffect, useState } from "react";

export default function usePersistedState<T>(
  initialState: T | (() => T),
  key: string
) {
  const [state, setState] = useState<T>(() => {
    const savedState = localStorage.getItem(key);

    try {
      if (savedState != null) return JSON.parse(savedState);
    } catch (err) {
      console.warn(err);
    }

    return initialState instanceof Function ? initialState() : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState] as const;
}
