import { ChangeEvent, FormEvent } from 'react';
export default function useForm<T>(initialValues: T, validate: Function): {
    values: T;
    errors: {};
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: FormEvent) => void;
};
