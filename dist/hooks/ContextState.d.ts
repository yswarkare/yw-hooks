import { default as React, ReactElement } from 'react';
export declare const useContextState: () => {
    isLoggedIn: boolean;
};
export declare const useUpdateContextState: () => Function | null;
type Props = {
    children: ReactElement | JSX.Element;
    initialState: any;
};
export declare const ContextStateProvider: ({ children, initialState }: Props) => React.JSX.Element;
export {};
