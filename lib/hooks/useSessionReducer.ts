import { useEffect, useReducer } from 'react';

const getStoredState = (key: string, initialState: any = null) => {
	let storedState = sessionStorage.getItem(key);
	if (storedState) return JSON.parse(storedState);
	if (initialState instanceof Function) return initialState();
	return initialState;
};

const useSessionReducer = (reducer: React.ReducerWithoutAction<any>, initialState: any, key: string) => {
	const [state, dispatch] = useReducer(reducer, initialState, () => {
		return getStoredState(key, initialState);
	});

	useEffect(() => {
		sessionStorage.setItem(key, JSON.stringify(state));
	}, [state, key]);

	return [state, dispatch];
};

export default useSessionReducer;
