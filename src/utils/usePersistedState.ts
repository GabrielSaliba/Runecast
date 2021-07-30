import { useState, useEffect } from 'react'

function usePersistedState(key: string, initialState: any) {
  const [state, setState] = useState(() => {

    let storageValue;
    if (typeof window !== "undefined") {
      storageValue = JSON.parse(localStorage.getItem(key));
    } 

    if (storageValue) {
      return storageValue;
    } else {
      return initialState
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [key, state]);

  return [state, setState];
}



export default usePersistedState;