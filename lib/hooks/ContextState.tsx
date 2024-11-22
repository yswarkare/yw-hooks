import React, { createContext, ReactElement, useContext, useEffect } from 'react';
import useSessionStorage from './useSessionStorage';

const initialState = {
	isLoggedIn: false
};

const ContextState = createContext(initialState);

export const useContextState = () => {
	return useContext(ContextState);
};

const UpdateContextState = createContext<Function | null>(null);

export const useUpdateContextState = () => {
	return useContext(UpdateContextState);
};

type Props = {
	children: ReactElement | JSX.Element,
	initialState: any
}

export const ContextStateProvider = ({ children, initialState }: Props) => {
	const [contextState, setContextState] = useSessionStorage("context-state", initialState);

	useEffect(() => {
		console.log({ contextState });
	}, [contextState]);

	const updateContextState = (prop: string, value: any) => {
		setContextState((prevState: any) => ({ ...prevState, [prop]: value }));
	};

	return (
		<ContextState.Provider value={contextState}>
			<UpdateContextState.Provider value={updateContextState}>
				{children}
			</UpdateContextState.Provider>
		</ContextState.Provider>
	);
};
