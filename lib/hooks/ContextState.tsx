import React, { createContext, ReactElement, useContext, useEffect } from 'react';
import { darkTheme, lightTheme } from './themes';
import useSessionStorage from './useSessionStorage';

const initialState = {
	theme: 'dark',
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
				<div
					id={`theme-context`}
					style={
						contextState.theme === 'dark'
							? darkTheme(contextState.theme)
							: contextState.theme === 'light'
								? lightTheme(contextState.theme)
								: darkTheme(contextState.theme)
					}
				>
					{children}
				</div>
			</UpdateContextState.Provider>
		</ContextState.Provider>
	);
};
