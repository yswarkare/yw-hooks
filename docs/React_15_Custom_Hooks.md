# 15 Useful React Custom Hooks That You Can Use In Any Project

React custom hooks allow for reusable logic in functional components, making it possible to separate components and keep parts small and focused on their intended purpose. Custom hooks also make it easier to test and understand the logic of a component, as it can be isolated and tested separately from the component itself. Custom hooks can also make sharing logic between different components easier, reducing code duplication and making it easier to maintain and update the codebase.

There are infinite possibilities for React hooks, but not all are created equal. In this article, I will be going over Thirty potent custom hooks that you can use in any project that is also super quick to implement.

NOTE: The YouTuber [Web Dev Simplified](https://www.youtube.com/@WebDevSimplified) created these hooks. You can check out his videos if you want an in-depth video explanation. However, If you're going to just read about them, continue.

## Table of contents

- [15 Useful React Custom Hooks That You Can Use In Any Project](#15-useful-react-custom-hooks-that-you-can-use-in-any-project)
  - [Table of contents](#table-of-contents)
    - [1. useToggle](#1-usetoggle)
    - [2. useTimeout](#2-usetimeout)
    - [3. useDebounce](#3-usedebounce)
    - [4. useUpdateEffect](#4-useupdateeffect)
    - [5. useArray](#5-usearray)
    - [6. usePrevious](#6-useprevious)
    - [7. useStateWithHistory](#7-usestatewithhistory)
    - [8. useStorage](#8-usestorage)
    - [9. useAsync](#9-useasync)
    - [10. useFetch](#10-usefetch)
    - [11. useScript](#11-usescript)
    - [12. useDeepCompareEffect](#12-usedeepcompareeffect)
    - [13. useEventListener](#13-useeventlistener)
    - [14. useOnScreen](#14-useonscreen)
    - [15. useWindowSize](#15-usewindowsize)
  - [Conclusion](#conclusion)


### 1. useToggle

```javascript
import { useState } from 'react';

export default function useToggle(defaultValue) {
	const [value, setValue] = useState(defaultValue);

	function toggleValue(value) {
		setValue((currentValue) => (typeof value === 'boolean' ? value : !currentValue));
	}

	return [value, toggleValue];
}
```

`useToggle` is a custom React hook that allows a component to toggle a value between true and false. It uses the useState hook to manage its state. First, the hook accepts a defaultValue argument to initialize the value state. Then, it returns an array with two elements: the current value and a function called toggleValue that toggles the value between true and false. The function accepts one parameter. It sets the value to the parameter If the parameter is boolean. Otherwise, it toggles the current value.

Here is an example of how you can use this hook:

```javascript
import useToggle from './useToggle';

export default function ToggleComponent() {
	const [value, toggleValue] = useToggle(false);

	return (
		<div>
			<div>{value.toString()}</div>
			<button onClick={toggleValue}>Toggle</button>
			<button onClick={() => toggleValue(true)}>Make True</button>
			<button onClick={() => toggleValue(false)}>Make False</button>
		</div>
	);
}
```

### 2. useTimeout

```javascript
import { useCallback, useEffect, useRef } from 'react';

export default function useTimeout(callback, delay) {
	const callbackRef = useRef(callback);
	const timeoutRef = useRef();

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	const set = useCallback(() => {
		timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
	}, [delay]);

	const clear = useCallback(() => {
		timeoutRef.current && clearTimeout(timeoutRef.current);
	}, []);

	useEffect(() => {
		set();
		return clear;
	}, [delay, set, clear]);

	const reset = useCallback(() => {
		clear();
		set();
	}, [clear, set]);

	return { reset, clear };
}
```

`useTimeout` is a custom React hook that allows a component to set and clear a timeout. It uses the `useCallback`, `useEffect`, and `useRef` hooks from the React library. The hook takes in two arguments: a callback that will be called after the specified delay, and a delay is the time in milliseconds that should pass before the callback is invoked.

The hook returns an object with two properties: reset and clear, functions that can be used to reset or clear the timeout.

The hook uses the `useRef` hook to create two references: `callbackRef` and `timeoutRef`. The `callbackRef` holds the callback function as a mutable value, and `timeoutRef` contains the timeout id returned by `setTimeout()` function.

The `useEffect` hook is used to ensure that the `callbackRef.current` always has the latest callback passed.
The set function creates a new timeout using `setTimeout`, invoking the callback function after the specified delay. The clear function clears the timeout using `clearTimeout`. Then there is an another `useEffect` hook is used to set the timeout on mount and remove it on unmount. The reset function is a combination of clear and set functions. Finally, the `useCallback` hook ensures that the functions are only recreated when their dependencies change.

Here is an example of how you can use this hook:

```javascript
import { useState } from 'react';
import useTimeout from './useTimeout';

export default function TimeoutComponent() {
	const [count, setCount] = useState(10);
	const { clear, reset } = useTimeout(() => setCount(0), 1000);

	return (
		<div>
			<div>{count}</div>
			<button onClick={() => setCount((c) => c + 1)}>Increment</button>
			<button onClick={clear}>Clear Timeout</button>
			<button onClick={reset}>Reset Timeout</button>
		</div>
	);
}
```

This custom `useTimeout` hook can be helpful in various situations where a component needs to act as an unavoidable delay. For example:

- A notification message that disappears after a certain amount of time
- A form submission that shows a loading spinner for a certain amount of time before redirecting
- A slideshow that automatically advances to the next slide after a certain amount of time
- A countdown timer that displays the remaining time and triggers an action when it reaches zero
- An auto-save feature that saves the form data after a certain amount of time
- A session timeout that logs the user out after a certain amount of inactivity
- A debounce function that delays the callback execution for a certain amount of time.

It can be used in any situation where you need to wait for a certain amount of time before acting or to repeat an action multiple times with a delay between them.

### 3. useDebounce

```javascript
import { useEffect } from 'react';
import useTimeout from '../2-useTimeout/useTimeout';

export default function useDebounce(callback, delay, dependencies) {
	const { reset, clear } = useTimeout(callback, delay);
	useEffect(reset, [...dependencies, reset]);
	useEffect(clear, []);
}
```

`useDebounce` is a custom React hook that allows a component to delay the execution of a callback function for a specified amount of time. It uses the built-in `useEffect` hook from the React library and the `useTimeout` (2nd custom hook) custom hook.

The hook takes in three arguments:

- "callback" is the function that should be debounced.
- "delay" is the time in milliseconds that should pass before the callback is invoked.
- "dependencies" is an array of values that the hook should listen to for changes and re-run the callback if any of the changes.

The hook uses the `useTimeout` hook to create a timeout that will invoke the callback function after the specified delay. The `useEffect` hook is used to set the timeout on mount and clear it on unmount. The first `useEffect` will call the reset function when any dependencies change, and the second `useEffect` call the clear function when the component unmounts.

Here is an example of how to use this hook:

```javascript
import { useState } from 'react';
import useDebounce from './useDebounce';

export default function DebounceComponent() {
	const [count, setCount] = useState(10);
	useDebounce(() => alert(count), 1000, [count]);

	return (
		<div>
			<div>{count}</div>
			<button onClick={() => setCount((c) => c + 1)}>Increment</button>
		</div>
	);
}
```

This hook can be helpful in situations where you want to limit the number of times a callback function is invoked in a short period. For example, when you have an input field that sends a search request to the server on every keystroke, you should wait for a user to stop typing before sending the request to avoid unnecessary network traffic and improve the user experience.

### 4. useUpdateEffect

```javascript
import { useEffect, useRef } from 'react';

export default function useUpdateEffect(callback, dependencies) {
	const firstRenderRef = useRef(true);

	useEffect(() => {
		if (firstRenderRef.current) {
			firstRenderRef.current = false;
			return;
		}
		return callback();
	}, dependencies);
}
```

`useUpdateEffect` is a custom React hook that allows a component to run a callback function only when specific dependencies change. It uses the React library's built-in `useEffect` and `useRef` hooks.

The hook takes in two arguments:

- callback is the function that should be called when the dependencies change
- dependencies is an array of values that the hook should listen to for changes.

The hook uses the `useRef` hook to create a reference firstRenderRef with the initial value as true. This reference will be used to track the first render of the component.
The `useEffect` hook is used to listen for changes in the dependencies array and call the callback function. Inside the `useEffect` function, it checks whether this is the first render of the component by checking the firstRenderRef value. If yes, it sets it to false and returns. If not, it means this is an update, so it will call the callback function and return the callback function.

Here is an example of how to use this hook:

```javascript
import { useState } from 'react';
import useUpdateEffect from './useUpdateEffect';

export default function UpdateEffectComponent() {
	const [count, setCount] = useState(10);
	useUpdateEffect(() => alert(count), [count]);

	return (
		<div>
			<div>{count}</div>
			<button onClick={() => setCount((c) => c + 1)}>Increment</button>
		</div>
	);
}
```

This hook can be helpful in situations where you want to run some logic only when specific values change and not on the initial render. For example, when you want to fetch data from an API after the user has selected a particular option from a drop-down menu or when you want to update the position of an element on the screen after the size of the window changes.

### 5. useArray

```javascript
import { useState } from 'react';

export default function useArray(defaultValue) {
	const [array, setArray] = useState(defaultValue);

	function push(element) {
		setArray((a) => [...a, element]);
	}

	function filter(callback) {
		setArray((a) => a.filter(callback));
	}

	function update(index, newElement) {
		setArray((a) => [...a.slice(0, index), newElement, ...a.slice(index + 1, a.length)]);
	}

	function remove(index) {
		setArray((a) => [...a.slice(0, index), ...a.slice(index + 1, a.length)]);
	}

	function clear() {
		setArray([]);
	}

	return { array, set: setArray, push, filter, update, remove, clear };
}
```

`useArray` is a custom React hook that allows a component to manage an array state. It uses the built-in `useState` hook from the React library. The hook takes in an argument, defaultValue, which is used to initialize the array state. The hook returns an object with several properties:

- **array** is the current array state
- **set** is a function that allows you to set the array state to a new value
- **push** is a function that will enable you to add an element to the end of the array
- **filter** is a function that allows you to filter the array by passing a callback function
- **update** is a function that will enable you to update an element at a specific index of the array
- **remove** is a function that will allow you to remove an element to a particular index of the array
- **clear** is a function that will enable you to clear the array.

All the functions that change the array state use the setArray function. Still, they do it in a way that preserves the immutability of the state by creating a new array, adding or removing the elements, and then passing it to the setArray function.

Here is an example of how to use this hook:

```javascript
import useArray from './useArray';

export default function ArrayComponent() {
	const { array, set, push, remove, filter, update, clear } = useArray([1, 2, 3, 4, 5, 6]);

	return (
		<div>
			<div>{array.join(', ')}</div>
			<button onClick={() => push(7)}>Add 7</button>
			<button onClick={() => update(1, 9)}>Change Second Element To 9</button>
			<button onClick={() => remove(1)}>Remove Second Element</button>
			<button onClick={() => filter((n) => n < 3)}>Keep Numbers Less Than 4</button>
			<button onClick={() => set([1, 2])}>Set To 1, 2</button>
			<button onClick={clear}>Clear</button>
		</div>
	);
}
```

This hook can be helpful in situations where you want to manage an array of data in the state of a component and perform everyday array operations such as adding, removing, updating, and filtering elements.

### 6. usePrevious

```javascript
import { useRef } from 'react';

export default function usePrevious(value) {
	const currentRef = useRef(value);
	const previousRef = useRef();

	if (currentRef.current !== value) {
		previousRef.current = currentRef.current;
		currentRef.current = value;
	}

	return previousRef.current;
}
```

`usePrevious` is a custom React hook that allows a component to keep track of the previous value of a variable. It uses the built-in `useRef` hook from the React library.

The hook takes in an argument value, which is the current value of the variable. Then, it creates two refs, one called `currentRef`, which holds the present value of the variable, and another called `previousRef`, which has the previous value of the variable.

The hook compares the current value with the previous value. If it's different, it updates the `previousRef` with the current value and the `currentRef` with the new value. Then it returns the `previousRef`.current.

Here is an example of how to use this hook:

```javascript
import { useState } from 'react';
import usePrevious from './usePrevious';

export default function PreviousComponent() {
	const [count, setCount] = useState(0);
	const [name, setName] = useState('Kyle');
	const previousCount = usePrevious(count);

	return (
		<div>
			<div>
				{count} - {previousCount}
			</div>
			<div>{name}</div>
			<button onClick={() => setCount((currentCount) => currentCount + 1)}>Increment</button>
			<button onClick={() => setName('John')}>Change Name</button>
		</div>
	);
}
```

This hook can be helpful in situations where you need to have access to the previous value of a variable, for example, when you want to compare the current value with the value earlier to check if it has changed or when you want to track the changes of a variable over time.

### 7. useStateWithHistory

```javascript
import { useCallback, useRef, useState } from 'react';

export default function useStateWithHistory(defaultValue, { capacity = 10 } = {}) {
	const [value, setValue] = useState(defaultValue);
	const historyRef = useRef([value]);
	const pointerRef = useRef(0);

	const set = useCallback(
		(v) => {
			const resolvedValue = typeof v === 'function' ? v(value) : v;
			if (historyRef.current[pointerRef.current] !== resolvedValue) {
				if (pointerRef.current < historyRef.current.length - 1) {
					historyRef.current.splice(pointerRef.current + 1);
				}
				historyRef.current.push(resolvedValue);

				while (historyRef.current.length > capacity) {
					historyRef.current.shift();
				}
				pointerRef.current = historyRef.current.length - 1;
			}
			setValue(resolvedValue);
		},
		[capacity, value]
	);

	const back = useCallback(() => {
		if (pointerRef.current <= 0) return;
		pointerRef.current--;
		setValue(historyRef.current[pointerRef.current]);
	}, []);

	const forward = useCallback(() => {
		if (pointerRef.current >= historyRef.current.length - 1) return;
		pointerRef.current++;
		setValue(historyRef.current[pointerRef.current]);
	}, []);

	const go = useCallback((index) => {
		if (index < 0 || index > historyRef.current.length - 1) return;
		pointerRef.current = index;
		setValue(historyRef.current[pointerRef.current]);
	}, []);

	return [
		value,
		set,
		{
			history: historyRef.current,
			pointer: pointerRef.current,
			back,
			forward,
			go,
		},
	];
}
```

`useStateWithHistory` is a custom React hook that allows a component to keep track of the state's history. It uses the built-in `useState`, `useCallback`, and `useRef` hooks from the React library.

The hook takes in two arguments:

- **defaultValue** is the initial value of the state
- **capacity** is an optional argument that sets the maximum number of states that should be stored in history.

The hook creates two refs, one called `historyRef` that holds an array of the state's history, and another called `pointerRef` that has the current pointer of the history. It also creates three callback functions: set, back, and forward.
The `set` function is used to set the state, it works similarly to the built-in setState function, but it also keeps track of the state's history by adding the new value to the history array and updating the `pointerRef`. The function can take a value or a callback function that receives the current state as an argument. The function also ensures that the history array's capacity is not exceeded by removing the oldest element.

The `back` function navigates the previous state in history. It decrements the `pointerRef` and updates the state with the earlier value of the history array.

The `forward` function navigates the next state in history. It increments the `pointerRef` and updates the state with the next value in the history array.

The `go` function navigates a specific state in history. It sets the `pointerRef` to the index passed as an argument and updates the state with the value at that index in the history array.

The hook returns an array with two elements:

- the current state value
- an object that contains the history array, the pointer, and the functions `set`, `back`, `forward`, and `go`.

Here is an example of how to use this hook:

```javascript
import { useState } from "react"
import useStateWithHistory from "./useStateWithHistory"

export default function StateWithHistoryComponent() {
const [count, setCount, { history, pointer, back, forward, go }] =
useStateWithHistory(1)
const [name, setName] = useState("Kyle")

return (

<div>
<div>{count}</div>
<div>{history.join(", ")}</div>
<div>Pointer - {pointer}</div>
<div>{name}</div>
<button onClick={() => setCount(currentCount => currentCount \* 2)}>
Double
</button>
<button onClick={() => setCount(currentCount => currentCount + 1)}>
Increment
</button>
<button onClick={back}>Back</button>
<button onClick={forward}>Forward</button>
<button onClick={() => go(2)}>Go To Index 2</button>
<button onClick={() => setName("John")}>Change Name</button>
</div>
)
}
```

This hook can be helpful in situations where you want to keep track of the state's history, for example, when you want to implement undo or redo functionality or to allow the user to navigate through the history of changes.

### 8. useStorage

```javascript
import { useCallback, useState, useEffect } from 'react';

export function useLocalStorage(key, defaultValue) {
	return useStorage(key, defaultValue, window.localStorage);
}

export function useSessionStorage(key, defaultValue) {
	return useStorage(key, defaultValue, window.sessionStorage);
}

function useStorage(key, defaultValue, storageObject) {
	const [value, setValue] = useState(() => {
		const jsonValue = storageObject.getItem(key);
		if (jsonValue != null) return JSON.parse(jsonValue);

		if (typeof defaultValue === 'function') {
			return defaultValue();
		} else {
			return defaultValue;
		}
	});

	useEffect(() => {
		if (value === undefined) return storageObject.removeItem(key);
		storageObject.setItem(key, JSON.stringify(value));
	}, [key, value, storageObject]);

	const remove = useCallback(() => {
		setValue(undefined);
	}, []);

	return [value, setValue, remove];
}
```

`useLocalStorage` and `useSessionStorage` is a custom React hook that allows a component to store a value in the browser's **LocalStorage** or **SessionStorage** and keep it in sync with the component's state. It uses the built-in useState and `useEffect` hooks from the React library and the `useCallback` hook.

The `useLocalStorage` and `useSessionStorage` functions are similar but use different storage localStorage and sessionStorage respectively. They take in two arguments: `key` and `defaultValue`. `key` is the key that is used to store the value in the storage object, and `defaultValue` is the value that will be used if the `key` is not found in the storage object.

Both functions use the `storage` function, which takes in three arguments: `key`, `defaultValue`, and `storageObject` and return an array with three elements:

- The current value
- A function "setValue" that can be used to update the value in the state and storage.
- A function "remove" that can be used to remove the value from the state and storage.

The `useEffect` hook keeps the value stored in the browser's storage in sync with the component's state.
The `useStorage` function uses the `JSON.stringify()` and `JSON.parse` methods to convert the value to a `JSON` string when storing it in the storage object and back to a JavaScript object when retrieving it from the storage object. This allows the hook to work with any data, not just strings.

The `useEffect` hook runs whenever the `key`, `value`, or `storageObject` changes. First, it checks if the value is undefined. In that case, it removes the item from the storage object. Otherwise, it stores the value in the storage object.

Here is an example of how to use this hook:

```javascript
import { useSessionStorage, useLocalStorage } from './useStorage';

export default function StorageComponent() {
	const [name, setName, removeName] = useSessionStorage('name', 'Kyle');
	const [age, setAge, removeAge] = useLocalStorage('age', 26);

	return (
		<div>
			<div>
				{name} - {age}
			</div>
			<button onClick={() => setName('John')}>Set Name</button>
			<button onClick={() => setAge(40)}>Set Age</button>
			<button onClick={removeName}>Remove Name</button>
			<button onClick={removeAge}>Remove Age</button>
		</div>
	);
}
```

This hook can be helpful in situations where you want to persist data across browser sessions or pages and keep the data in sync with the component's state. For example, you can store a user's settings, a form's data, or a to-do list. Using the `useLocalStorage` and `useSessionStorage` hooks provides the flexibility of using the browser's local storage or session storage as per the requirement.

### 9. useAsync

```javascript
import { useCallback, useEffect, useState } from 'react';

export default function useAsync(callback, dependencies = []) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState();
	const [value, setValue] = useState();

	const callbackMemoized = useCallback(() => {
		setLoading(true);
		setError(undefined);
		setValue(undefined);
		callback()
			.then(setValue)
			.catch(setError)
			.finally(() => setLoading(false));
	}, dependencies);

	useEffect(() => {
		callbackMemoized();
	}, [callbackMemoized]);

	return { loading, error, value };
}
```

`useAsync` is a custom React hook that allows a component to handle asynchronous operations and keep track of the `loading`, `error`, and `value` states. It uses the built-in `useState` and `useEffect` hooks from the React library and the `useCallback` hook.

The hook takes in two arguments:

- `callback` is a function that returns a promise. This function is responsible for performing the async operation.
- `dependencies` is an array of dependencies the hook should listen for changes. The callback function will be executed when any of the dependencies change.

The hook creates three state variables: **loading**, **error**, and **value**. The **loading** state is used to indicate whether the async operation is currently in progress, the **error** state is used to store the **error** object in case the promise is rejected, and the value state is used to store the resolved value in case the promise is fulfilled.

The hook also creates a callback function called callbackMemoized using useCallback. This function sets the **loading**, **error**, and **value** states to their initial values and then calls the callback function passed in.
The useEffect hook calls the callbackMemoized function when the dependencies change.

Here is an example of how to use this hook:

```javascript
import useAsync from './useAsync';

export default function AsyncComponent() {
	const { loading, error, value } = useAsync(() => {
		return new Promise((resolve, reject) => {
			const success = false;
			setTimeout(() => {
				success ? resolve('Hi') : reject('Error');
			}, 1000);
		});
	});

	return (
		<div>
			<div>Loading: {loading.toString()}</div>
			<div>{error}</div>
			<div>{value}</div>
		</div>
	);
}
```

This hook can be useful in situations where you want to handle async operations such as fetching data from an API, uploading a file, or saving data to a database. It provides a simple way to manage the loading, error, and value states in a component and also allows the component to re-run the async operation when certain values change.

### 10. useFetch

```javascript
import useAsync from '../9-useAsync/useAsync';

const DEFAULT_OPTIONS = {
	headers: { 'Content-Type': 'application/json' },
};

export default function useFetch(url, options = {}, dependencies = []) {
	return useAsync(() => {
		return fetch(url, { ...DEFAULT_OPTIONS, ...options }).then((res) => {
			if (res.ok) return res.json();
			return res.json().then((json) => Promise.reject(json));
		});
	}, dependencies);
}
```

`useFetch` is a custom React hook that allows a component to handle fetching data from a URL and keep track of the **loading**, **error**, and **value** states. It uses the built-in fetch API and custom hook `useAsync` that allows a component to handle asynchronous operations and keep track of the **loading**, **error**, and **value** states.

The hook takes in three arguments:

- **URL** is the URL of the endpoint to fetch data from
- **options** is an object that contains options such as headers, method, and body for the fetch request.
- **dependencies** is an array of dependencies the hook should listen for changes. The callback function will be executed when any of the dependencies change.

The hook creates a **callback** function that uses the fetch API to request the given **URL** with the options passed in and the default options.
It then checks if the response is ok. If yes, it returns the response in json format. If not, it returns the JSON response and rejects it.

Here is an example of how to use this hook:

```javascript
import { useState } from 'react';
import useFetch from './useFetch';

export default function FetchComponent() {
	const [id, setId] = useState(1);
	const { loading, error, value } = useFetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {}, [id]);

	return (
		<div>
			<div>{id}</div>
			<button onClick={() => setId((currentId) => currentId + 1)}>Increment ID</button>
			<div>Loading: {loading.toString()}</div>
			<div>{JSON.stringify(error, null, 2)}</div>
			<div>{JSON.stringify(value, null, 2)}</div>
		</div>
	);
}
```

This hook can be helpful in situations where you want to handle fetching data from an API. It provides a simple way to manage the **loading**, **error**, and **value** states in a component and also allows the component.

### 11. useScript

```javascript
import useAsync from '../9-useAsync/useAsync';

export default function useScript(url) {
	return useAsync(() => {
		const script = document.createElement('script');
		script.src = url;
		script.async = true;

		return new Promise((resolve, reject) => {
			script.addEventListener('load', resolve);
			script.addEventListener('error', reject);
			document.body.appendChild(script);
		});
	}, [url]);
}
```

`useScript` is a custom React hook that allows a component to load a JavaScript file from a given URL and keep track of the **loading**, **error**, and **value** states. In addition, it uses the custom useAsync hook that allows a component to handle asynchronous operations and keep track of the **loading**, **error**, and **value** states.

The hook takes in one argument:

- URL is the URL of the JavaScript file to be loaded.

The hook creates a callback function that uses the DOM API to create a new script element and sets its src to the URL passed in. It also sets the async property to true.
It then returns a new promise that resolves or rejects when the script loads or is in error respectively.

Here is an example of how to use this hook:

```javascript
import useScript from './useScript';

export default function ScriptComponent() {
	const { loading, error } = useScript('https://code.jquery.com/jquery-3.6.0.min.js');

	if (loading) return <div>Loading</div>;
	if (error) return <div>Error</div>;
	return <div>{window.$(window).width()}</div>;
}
```

This hook can be helpful in situations where you want to load external JavaScript libraries dynamically. It provides a simple way to manage a component's loading, error, and value states and also allows the component to re-load the script when the URL changes.

### 12. useDeepCompareEffect

```javascript
import { useEffect, useRef } from 'react';
import isEqual from 'lodash/fp/isEqual';

export default function useDeepCompareEffect(callback, dependencies) {
	const currentDependenciesRef = useRef();

	if (!isEqual(currentDependenciesRef.current, dependencies)) {
		currentDependenciesRef.current = dependencies;
	}

	useEffect(callback, [currentDependenciesRef.current]);
}
```

`useDeepCompareEffect` is a custom React hook that allows a component to run an effect only when the dependencies have changed using a deep comparison instead of a shallow comparison. It uses the built-in `useEffect` hook from the **React** library and **lodash** `isEqual` function for deep comparison.

The hook takes two arguments:

- **callback** is a function that represents the effect of being executed.
- **dependencies** is an array of values that the effect depends on.

It also creates a ref called `currentDependenciesRef` to store the current dependencies.
It then compares the current dependencies with the new dependencies using the isEqual function. If they are not equal, it updates the current dependencies ref with the new dependencies.
Then it calls `useEffect` with the callback function and the currentDependenciesRef.current as the dependencies.

Here is an example of how to use this hook:

```javascript
import { useEffect, useState, useRef } from 'react';
import useDeepCompareEffect from './useDeepCompareEffect';

export default function DeepCompareEffectComponent() {
	const [age, setAge] = useState(0);
	const [otherCount, setOtherCount] = useState(0);
	const useEffectCountRef = useRef();
	const useDeepCompareEffectCountRef = useRef();

	const person = { age: age, name: 'Kyle' };

	useEffect(() => {
		useEffectCountRef.current.textContent = parseInt(useEffectCountRef.current.textContent) + 1;
	}, [person]);

	useDeepCompareEffect(() => {
		useDeepCompareEffectCountRef.current.textContent = parseInt(useDeepCompareEffectCountRef.current.textContent) + 1;
	}, [person]);

	return (
		<div>
			<div>
				useEffect: <span ref={useEffectCountRef}>0</span>
			</div>
			<div>
				useDeepCompareEffect: <span ref={useDeepCompareEffectCountRef}>0</span>
			</div>
			<div>Other Count: {otherCount}</div>
			<div>{JSON.stringify(person)}</div>
			<button onClick={() => setAge((currentAge) => currentAge + 1)}>Increment Age</button>
			<button onClick={() => setOtherCount((count) => count + 1)}>Increment Other Count</button>
		</div>
	);
}
```

This hook can be helpful in situations where the dependencies are complex objects or arrays, and you want to ensure that the effect only runs when the specific values inside the dependencies have changed. It can help prevent unnecessary re-renders and improve performance.

### 13. useEventListener

```javascript
import { useEffect, useRef } from 'react';

export default function useEventListener(eventType, callback, element = window) {
	const callbackRef = useRef(callback);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		if (element == null) return;
		const handler = (e) => callbackRef.current(e);
		element.addEventListener(eventType, handler);

		return () => element.removeEventListener(eventType, handler);
	}, [eventType, element]);
}
```

`useEventListener` is a custom React hook that allows a component to add an event listener to a specific DOM element and execute a callback function when the event occurs. It uses the built-in `useEffect` hook from the React library.

The hook takes three arguments:

- **eventType** is a string representing the type of event to listen for, such as "click" or "keydown".
- **callback** is a function that represents the action to be taken when the event occurs.
- **element** is an optional DOM element to add the event listener. The default value is window, meaning the event listener will be added to the global window object.

It also creates a ref called `callbackRef` to store the current callback function.
The `useEffect` hook is used to set up the event listener when the component mounts and to remove the event listener when the component unmounts. It also updates the callback ref when the callback function changes.

Here is an example of how to use this hook:

```javascript
import { useState } from 'react';
import useEventListener from './useEventListener';

export default function EventListenerComponent() {
	const [key, setKey] = useState('');
	useEventListener('keydown', (e) => {
		setKey(e.key);
	});

	return <div>Last Key: {key}</div>;
}
```

This hook can be helpful in situations where you want to handle events such as clicks, key presses, or form submissions in a declarative way and keep your component logic separate from your event-handling logic.

### 14. useOnScreen

```javascript
import { useEffect, useState } from 'react';

export default function useOnScreen(ref, rootMargin = '0px') {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		if (ref.current == null) return;
		const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { rootMargin });
		observer.observe(ref.current);
		return () => {
			if (ref.current == null) return;
			observer.unobserve(ref.current);
		};
	}, [ref.current, rootMargin]);

	return isVisible;
}
```

`useOnScreen` is a custom React hook that allows a component to detect when a specific DOM element is visible within the viewport and keep track of the visibility status. It uses the built-in `useEffect` hook from the React library and the **IntersectionObserver** API.

The hook takes two arguments:

- **ref** is a reference to the DOM element to detect visibility, which is typically created using the React "useRef" hook.
- **rootMargin** is an optional string that defines an offset around the root element. It can be used to enlarge or shrink the root element's bounding box before checking for an intersection. The default value is "0px".

The `useEffect` hook is used to set up the **IntersectionObserver** when the component mounts and to remove the observer when the component unmounts. It also updates the observer when the ref or rootMargin changes.
It returns a boolean value isVisible that indicates whether the DOM element is currently visible or not.

Here is an example of how to use this hook:

```javascript
import { useRef } from 'react';
import useOnScreen from './useOnScreen';

export default function OnScreenComponentComponent() {
	const headerTwoRef = useRef();
	const visible = useOnScreen(headerTwoRef, '-100px');

	return (
		<div>
			<h1>Header</h1>
			<div>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde incidunt, nam id itaque error dicta? Numquam earum iusto
				optio officia, molestias debitis illum facilis nemo asperiores eaque voluptates modi? Dicta mollitia fugit doloremque
				vitae, dolores sequi fuga quas vel incidunt animi architecto dignissimos amet in quam praesentium corrupti voluptate
				dolorem impedit numquam aut cupiditate nulla! Nisi dolore dicta, cumque illum tempora enim dolores eum quis itaque nostrum
				architecto vel cum officiis aperiam qui exercitationem voluptatibus. Veritatis unde doloribus dolorem architecto, eum
				reprehenderit possimus similique eius cum obcaecati totam placeat. Delectus nulla, quae temporibus omnis assumenda autem
				ad quibusdam facilis aspernatur inventore nobis. Vitae architecto, unde consequuntur velit consequatur dicta mollitia,
				fuga iure hic accusamus blanditiis. Dignissimos, tenetur amet adipisci nostrum perferendis ad rerum accusamus distinctio
				repellendus eius, quisquam repellat nesciunt, consequatur culpa neque? Inventore vitae laborum aperiam ullam dolorem
				officiis ipsum aliquid doloribus pariatur, commodi iure illum soluta delectus, architecto ratione maiores accusamus.
				Provident quia sequi dolorum asperiores necessitatibus consequatur perspiciatis at a, inventore, deserunt corporis
				recusandae earum vero voluptas saepe pariatur, libero illo. Numquam facilis magnam exercitationem ipsam libero quidem
				minima dolores perferendis eveniet impedit eos, nesciunt unde velit facere itaque eum quasi laboriosam veritatis aliquid
				tenetur. Blanditiis exercitationem laborum, optio nulla minima libero sed doloremque soluta, dignissimos tempora rerum id
				nostrum iusto eveniet illo corrupti dicta. Non fuga exercitationem sit dignissimos voluptatibus cumque nobis iste
				asperiores illum fugit
			</div>
			<h1 ref={headerTwoRef}>Header 2 {visible && '(Visible)'}</h1>
			<div>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde incidunt, nam id itaque error dicta? Numquam earum iusto
				optio officia, molestias debitis illum facilis nemo asperiores eaque voluptates modi? Dicta mollitia fugit doloremque
				vitae, dolores sequi fuga quas vel incidunt animi architecto dignissimos amet in quam praesentium corrupti voluptate
				dolorem impedit numquam aut cupiditate nulla! Nisi dolore dicta, cumque illum tempora enim dolores eum quis itaque nostrum
				architecto vel cum officiis aperiam qui exercitationem voluptatibus. Veritatis unde doloribus dolorem architecto, eum
				reprehenderit possimus similique eius cum obcaecati totam placeat. Delectus nulla, quae temporibus omnis assumenda autem
				ad quibusdam facilis aspernatur inventore nobis. Vitae architecto, unde consequuntur velit consequatur dicta mollitia,
				fuga iure hic accusamus blanditiis. Dignissimos, tenetur amet adipisci nostrum perferendis ad rerum accusamus distinctio
				repellendus eius, quisquam repellat nesciunt, consequatur culpa neque? Inventore vitae laborum aperiam ullam dolorem
				officiis ipsum aliquid doloribus pariatur, commodi iure illum soluta delectus, architecto ratione maiores accusamus.
				Provident quia sequi dolorum asperiores necessitatibus consequatur perspiciatis at a, inventore, deserunt corporis
				recusandae earum vero voluptas saepe pariatur, libero illo. Numquam facilis magnam exercitationem ipsam libero quidem
				minima dolores perferendis eveniet impedit eos, nesciunt unde velit facere itaque eum quasi laboriosam veritatis aliquid
				tenetur. Blanditiis exercitationem laborum, optio nulla minima libero sed doloremque soluta, dignissimos tempora rerum id
				nostrum iusto eveniet illo corrupti dicta. Non fuga exercitationem sit dignissimos voluptatibus cumque nobis iste
				asperiores illum fugit veritatis fugiat quia voluptates cupiditate vel rerum eligendi facere sint nostrum quam, maiores
				dolorem repellat voluptas! Magnam ullam quis quas aut consequuntur quo doloremque, earum sint soluta vero iste quasi
				voluptates labore rerum aspernatur illum esse maxime laudantium? Tempore perspiciatis perferendis ea dolorem et quasi eos
				illo beatae consectetur maxime, enim ducimus corrupti, accusantium quisquam rem dolorum itaque iste velit. Amet similique
				accusamus doloribus expedita modi a architecto accusantium labore unde non, dolore totam quaerat sit laboriosam quae ullam
				impedit, pariatur repudiandae quisquam debitis repellendus nihil. Cumque blanditiis ut recusandae illum! Maiores eveniet
				nulla exercitationem natus delectus est minus a architecto pariatur molestias quo nihil maxime quasi facere magnam neque
				dolorem ad, doloribus hic! Qui corporis perspiciatis dolores rem minima tenetur. Fugit ipsa consectetur ad reiciendis,
				quia iste, sapiente rerum exercitationem reprehenderit laborum eligendi cumque? Quia porro modi repudiandae nostrum
				accusamus! Corporis eum fugit nihil facilis placeat ab est obcaecati consequuntur qui atque tempore soluta aliquid saepe
				ducimus, at sed modi illo ipsa numquam ratione vero eos reprehenderit! Sapiente nesciunt consequatur labore iste quas
				possimus rem cumque, fugit laborum repellendus nisi adipisci officia temporibus quaerat! Beatae doloribus veritatis at,
				maiores suscipit debitis reiciendis cum impedit non aut modi iste? Placeat illo quisquam assumenda esse cum ipsum quasi
				perspiciatis voluptatem rerum itaque, similique quidem molestias exercitationem ullam eum amet tempore dolor aliquid unde
				deserunt dolore excepturi. Aut dolore rerum sequi nihil soluta eum expedita consequatur aliquid consequuntur saepe esse
				necessitatibus repudiandae, natus, officia enim odit rem nobis adipisci, voluptates autem dolor blanditiis ipsam animi a.
				Illo accusantium iure qui aperiam commodi, quidem, dolorem error eum animi, id nam? Corporis, non adipisci!
			</div>
		</div>
	);
}
```

This hook can be helpful when you want to track when a specific DOM element comes into view or goes out of sight, for example, to lazy-load images, track scroll position, or display elements on demand.

### 15. useWindowSize

```javascript
import { useState } from 'react';
import useEventListener from '../13-useEventListener/useEventListener';

export default function useWindowSize() {
	const [windowSize, setWindowSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	useEventListener('resize', () => {
		setWindowSize({ width: window.innerWidth, height: window.innerHeight });
	});

	return windowSize;
}
```

`useWindowSize` is a custom React hook that allows a component to keep track of the current size of the browser window. It uses the built-in `useState` hook from the React library and a custom hook called `useEventListener` that allows a component to add an event listener to a specific DOM element and execute a callback function when the event occurs.

The hook creates an object called `windowSize` that contains the width and height of the browser window and sets the initial state using the window.innerWidth and window.innerHeight properties.

It uses the `useEventListener` hook to add a `resize` event listener to the window object and updates the state with the new width and height of the window when the event occurs.
It returns the `windowSize` object, which contains the current width and height of the browser window.

Here is an example of how to use this hook:

```javascript
import useWindowSize from './useWindowSize';

export default function WindowSizeComponent() {
	const { width, height } = useWindowSize();

	return (
		<div>
			{width} x {height}
		</div>
	);
}
```

This hook can be helpful in situations where you want to make a responsive design and adapt the layout or behavior of a component based on the size of the browser window.

## Conclusion

These custom hooks can be essential when making good scalable and bug-free projects. They work like a charm, even on significant projects. Therefore feel free to use them whenever you need them. So, Thanks for reading this article, guys. I know It was a bit lengthy. However, I hope that It was worthwhile reading it. See you all in my next article😊.
