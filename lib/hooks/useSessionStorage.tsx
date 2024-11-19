import { useEffect, useState } from 'react';

function getStoredValue<T> (key: string, initialValue: T) {
	let storedValue = sessionStorage.getItem(key);
	if (storedValue) return JSON.parse(storedValue);
	if (initialValue instanceof Function) return initialValue();
	return initialValue;
};

function useSessionStorage<T> (key: string, initialValue: T){
	const [value, setValue] = useState(() => {
		return getStoredValue<T>(key, initialValue);
	});

	useEffect(() => {
		sessionStorage.setItem(key, JSON.stringify(value));
	}, [value, key]);

	return [value, setValue];
};

export default useSessionStorage;
