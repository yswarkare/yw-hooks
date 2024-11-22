import { useEffect, useReducer } from 'react';

const getStoredState = (key: string, initialState: object) => {
  const storedState = sessionStorage.getItem(key);
  if (Boolean(storedState)! && typeof storedState === 'string' && !['undefined', 'null', '', 'false'].includes(storedState)) {
    try {
      const obj = JSON.parse(storedState);
      if (typeof obj === 'object') return obj;
    } catch (error) {
      console.log(error)
    }
  };
  return initialState;
};

function reducer (state: any, { key, value }: { key: string, value: any }) {
  for (const prop in state) {
    if (prop == key) {
      return { ...state, [prop]: value }
    }
  }
}

function useObjectReducer(initialState: object, key: string) {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    return getStoredState(key, initialState);
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, dispatch];
};

export default useObjectReducer;
