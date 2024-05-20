// /src/components/Input.tsx
import React from 'react';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ value, onChange }) => {
  return <input type='text' value={value} onChange={onChange} />;
};

export default Input;
