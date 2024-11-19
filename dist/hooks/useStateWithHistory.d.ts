export default function useStateWithHistory<T>(defaultValue: T, { capacity }?: {
    capacity?: number | undefined;
}): (T | ((v: Function) => void) | {
    history: T[];
    pointer: number;
    back: () => void;
    forward: () => void;
    go: (index: number) => void;
})[];
