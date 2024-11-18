# Top 10 Most Useful Custom Hooks in React

## Table Of Content

- [Top 10 Most Useful Custom Hooks in React](#top-10-most-useful-custom-hooks-in-react)
  - [Table Of Content](#table-of-content)
  - [1. UseLocalStorage](#1-uselocalstorage)
    - [Usage-1](#usage-1)
  - [2. UseForm](#2-useform)
    - [Usage-2](#usage-2)
  - [3. UseFetch](#3-usefetch)
    - [Usage-3](#usage-3)
  - [4. UseMediaQuery](#4-usemediaquery)
    - [Usage-4](#usage-4)
  - [5. UseScroll](#5-usescroll)
    - [Usage-5](#usage-5)
  - [6. UseIntersectionObserver](#6-useintersectionobserver)
    - [Usage-6](#usage-6)
  - [7. UseAnimation](#7-useanimation)
    - [Usage-7](#usage-7)
  - [8. UseDebounce](#8-usedebounce)
    - [Usage-8](#usage-8)
  - [9. UseThrottle](#9-usethrottle)
    - [Usage-9](#usage-9)
  - [10. UseAuthentication](#10-useauthentication)
    - [Usage-10](#usage-10)
  - [Conclusion](#conclusion)


React’s custom hooks have transformed how developers construct reusable logic and distribute functionality across components. These hooks encapsulate prevalent patterns and behaviors, simplifying the creation of cleaner, more maintainable code. In this article, we will explore the ten most beneficial custom hooks in React, complemented by code examples illustrating their practical utility.

## 1. UseLocalStorage

Managing data in local storage is a common task in web development. The useLocalStorage hook simplifies this process by providing a convenient way to read from and write to local storage.

```javascript
import { useState } from 'react';

function useLocalStorage(key, initialValue) {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.error(error);
			return initialValue;
		}
	});

	const setValue = (value) => {
		try {
			setStoredValue(value);
			window.localStorage.setItem(key, JSON.stringify(value));
		} catch (error) {
			console.error(error);
		}
	};

	return [storedValue, setValue];
}
```

### Usage-1

```javascript
const [name, setName] = useLocalStorage('name', 'John');
```

## 2. UseForm

Handling form state and validation can be repetitive. The useForm hook simplifies this process by managing form state, validation, and submission logic in a reusable manner.

```javascript
import { useState } from 'react';

function useForm(initialValues, validate) {
	const [values, setValues] = useState(initialValues);
	const [errors, setErrors] = useState({});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setValues({ ...values, [name]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const validationErrors = validate(values);
		setErrors(validationErrors);
		if (Object.keys(validationErrors).length === 0) {
			// Handle form submission
		}
	};

	return { values, errors, handleChange, handleSubmit };
}
```

### Usage-2

```javascript
const { values, errors, handleChange, handleSubmit } = useForm({ email: '', password: '' }, (values) => {
	let errors = {};
	if (!values.email) {
		errors.email = 'Email is required';
	}
	if (!values.password) {
		errors.password = 'Password is required';
	}
	return errors;
});
```

## 3. UseFetch

Fetching data from APIs is a common task in web applications. The useFetch hook simplifies data fetching by providing a simple interface for making HTTP requests and handling loading, error, and data states.

```javascript
import { useState, useEffect } from 'react';

function useFetch(url) {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(url);
				const jsonData = await response.json();
				setData(jsonData);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [url]);

	return { data, loading, error };
}
```

### Usage-3

```javascript
const { data, loading, error } = useFetch('https://api.example.com/data');
```

## 4. UseMediaQuery

Creating responsive layouts is crucial for modern web development. The useMediaQuery hook enables developers to conditionally render components based on the user’s device or screen size.

```javascript
import { useState, useEffect } from 'react';

function useMediaQuery(query) {
	const [matches, setMatches] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia(query);
		const handleChange = () => setMatches(mediaQuery.matches);

		setMatches(mediaQuery.matches);
		mediaQuery.addListener(handleChange);

		return () => {
			mediaQuery.removeListener(handleChange);
		};
	}, [query]);

	return matches;
}
```

### Usage-4

```javascript
const isMobile = useMediaQuery('(max-width: 768px)');
```

## 5. UseScroll

Tracking scroll position and implementing scroll-based effects are common requirements in web development. The `useScroll` hook provides access to the scroll position and handles scroll event listeners.

```javascript
import { useState, useEffect } from 'react';

function useScroll() {
	const [scrollPosition, setScrollPosition] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			setScrollPosition(window.scrollY);
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return scrollPosition;
}
```

### Usage-5

```javascript
const scrollPosition = useScroll();
```

## 6. UseIntersectionObserver

The Intersection Observer API is useful for detecting when an element enters or exits the viewport. The useIntersectionObserver hook encapsulates this functionality, enabling lazy-loaded images, infinite scroll, and other dynamic behaviors.

```javascript
import { useState, useEffect } from 'react';

function useIntersectionObserver(ref, options) {
	const [intersecting, setIntersecting] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			setIntersecting(entry.isIntersecting);
		}, options);

		if (ref.current) {
			observer.observe(ref.current);
		}

		return () => {
			observer.disconnect();
		};
	}, [ref, options]);

	return intersecting;
}
```

### Usage-6

```javascript
const ref = useRef(null);
const intersecting = useIntersectionObserver(ref, { threshold: 0.5 });
```

## 7. UseAnimation

Animating elements in React can be challenging. The useAnimation hook simplifies this task by abstracting away the complexities of animation libraries like GSAP or Framer Motion.

```javascript
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

function useAnimation(options) {
	const elementRef = useRef(null);

	useEffect(() => {
		const element = elementRef.current;
		if (element) {
			gsap.to(element, options);
		}
	}, [options]);

	return elementRef;
}
```

### Usage-7

```javascript
const animationRef = useAnimation({ opacity: 0, duration: 1 });
```

## 8. UseDebounce

Debouncing is useful for delaying the execution of a function until after a specified period of inactivity. The useDebounce hook helps mitigate performance issues by debouncing expensive operations such as API requests or search input handling.

```javascript
import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
}
```

### Usage-8

```javascript
const debouncedValue = useDebounce(inputValue, 300);
```

## 9. UseThrottle

Similar to debouncing, throttling limits the rate at which a function is executed. The useThrottle hook is useful for scenarios where you want to limit the frequency of event handlers, such as scroll or resize events.

```javascript
import { useState, useEffect } from 'react';

function useThrottle(value, delay) {
	const [throttledValue, setThrottledValue] = useState(value);
	const [lastExecuted, setLastExecuted] = useState(Date.now());

	useEffect(() => {
		const handler = setTimeout(() => {
			setThrottledValue(value);
			setLastExecuted(Date.now());
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return throttledValue;
}
```

### Usage-9

```javascript
const throttledValue = useThrottle(inputValue, 300);
```

## 10. UseAuthentication

Managing user authentication state is a common requirement in web applications. The `useAuthentication` hook abstracts away the complexities of authentication logic, handling login/logout actions, and persisting authentication tokens securely.

```javascript
import { useState } from 'react';

function useAuthentication() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const login = () => {
		// Perform login logic
		setIsLoggedIn(true);
	};

	const logout = () => {
		// Perform logout logic
		setIsLoggedIn(false);
	};

	return { isLoggedIn, login, logout };
}
```

### Usage-10

```javascript
const { isLoggedIn, login, logout } = useAuthentication();
```

## Conclusion

Custom hooks are powerful tools that enable developers to encapsulate and reuse logic across React components. By leveraging the top 10 most useful custom hooks outlined in this article, developers can streamline common tasks, enhance application functionality, and build better user experiences in their React applications. Whether you’re managing form state, fetching data from APIs, or handling user authentication, custom hooks provide a flexible and efficient way to solve complex problems in React development.
