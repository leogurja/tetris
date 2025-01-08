import { useEffect, useState } from "react";

export function usePersistedState(initialState: string, localStorageName: string) {
  const [state, setState] = useState(() => localStorage.getItem(localStorageName) ?? initialState);

  useEffect(() => {
    localStorage.setItem(localStorageName, state);
  }, [state, localStorageName]);

  return [state, setState];
}
