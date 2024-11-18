import { ChangeEvent, FormEvent, useState } from 'react';

export default function useForm<T>(initialValues: T, validate: Function) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      // Handle form submission
    }
  };

  return { values, errors, handleChange, handleSubmit };
}