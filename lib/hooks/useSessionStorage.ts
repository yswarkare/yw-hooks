import { useEffect, useState } from 'react';

const getStoredValue = (key: string, initialValue: any = null) => {
	let storedValue = sessionStorage.getItem(key);
	if (storedValue) return JSON.parse(storedValue);
	if (initialValue instanceof Function) return initialValue();
	return initialValue;
};

const useSessionStorage = (key: string, initialValue: any) => {
	const [value, setValue] = useState(() => {
		return getStoredValue(key, initialValue);
	});

	useEffect(() => {
		sessionStorage.setItem(key, JSON.stringify(value));
	}, [value, key]);

	return [value, setValue];
};

export default useSessionStorage;
