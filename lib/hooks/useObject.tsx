import { useState } from 'react';

export default function useObject(defaultValue: object) {
	const [obj, setObj] = useState(defaultValue);

	function update(key: string, value: any) {
		setObj((a) => (({...a, [key]: value})));
	}

	function clear() {
		setObj({});
	}

	return { obj, set: setObj, update, clear };
}