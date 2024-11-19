export default function useTimeout(callback: Function, delay: number): {
    reset: () => void;
    clear: () => void;
};
