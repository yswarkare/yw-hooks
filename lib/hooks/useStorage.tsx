import { useCallback, useState, useEffect } from 'react';

function getInitialValue<T>(key: string, defaultValue: T, storageObject: Storage) {
	const jsonValue = storageObject.getItem(key);
	if (jsonValue != null) return JSON.parse(jsonValue);
	if (typeof defaultValue === 'function') return defaultValue()
	else return defaultValue
}

export function useLocalStorage<T>(key: string, defaultValue: T) {
	return useStorage(key, defaultValue, window.localStorage);
}

export function useSessionStorage<T>(key: string, defaultValue: T) {
	return useStorage(key, defaultValue, window.sessionStorage);
}

function useStorage<T>(key: string, defaultValue: T, storageObject: Storage) {
	const [value, setValue] = useState<T | null>(getInitialValue<T>(key, defaultValue, storageObject));

	useEffect(() => {
		if (value === undefined) return storageObject.removeItem(key);
		storageObject.setItem(key, JSON.stringify(value));
	}, [key, value, storageObject]);

	const remove = useCallback(() => {
		setValue(null);
	}, []);

	return [value, setValue, remove];
}