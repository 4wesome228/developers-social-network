import { useState } from "react";

export const useForm = (callback, data) => {
  const [formData, setFormData] = useState(data);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSumbit = (e: React.FormEvent) => {
    e.preventDefault();
    callback();
  };

  const optionalDataChanger = (formData) => (callback) => {
    callback(setFormData, formData);
  };

  return {
    handleChange,
    handleSumbit,
    values: formData,
    optionalDataChanger: optionalDataChanger(formData),
  };
};
