export default function useObject(defaultValue: object): {
    obj: object;
    set: import('react').Dispatch<import('react').SetStateAction<object>>;
    update: (key: string, value: any) => void;
    clear: () => void;
};
