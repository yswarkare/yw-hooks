export default function useAsync(callback: Function, dependencies?: Array<any>): {
    loading: boolean;
    error: undefined;
    value: undefined;
};
