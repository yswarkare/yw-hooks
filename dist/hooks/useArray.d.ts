export default function useArray<T>(defaultValue: Array<T>): {
    array: T[];
    set: import('react').Dispatch<import('react').SetStateAction<T[]>>;
    push: (element: T) => void;
    filter: (callback: (value: T, index: number, array: T[]) => value is T) => void;
    update: (index: number, newElement: T) => void;
    remove: (index: number) => void;
    clear: () => void;
};
