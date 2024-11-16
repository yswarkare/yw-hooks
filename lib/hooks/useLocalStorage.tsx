import { useEffect, useState } from 'react';

const getStoredValue = (key: string, initialValue: any = null) => {
	let storedValue = localStorage.getItem(key)
	if (storedValue) return JSON.parse(storedValue);
	if (initialValue instanceof Function) return initialValue();
	return initialValue;
};

const useLocalStorage = (key: string, initialValue: any) => {
	const [value, setValue] = useState(() => {
		return getStoredValue(key, initialValue);
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [value, key]);

	return [value, setValue];
};

export default useLocalStorage;
