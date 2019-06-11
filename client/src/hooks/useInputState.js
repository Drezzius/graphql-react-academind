import { useState } from 'react';

export const useInputState = value => {
  const [inputValue, setValue] = useState(value);
  const handleChange = e => setValue(e.target.value);
  const handleReset = () => setValue('');
  return [inputValue, handleChange, handleReset];
};
