import React, { useState } from 'react';

interface InputFieldProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'select' | 'date';
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  className?: string;
  options?: string[];
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string; // For regex validation
  errorMessage?: string; // Custom error message
  disabled? :boolean
}

const InputField: React.FC<InputFieldProps> = ({
  type = 'text',
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  className = '',
  options = [],
  required = false,
  minLength,
  maxLength,
  pattern,
  errorMessage = 'Invalid input',

}: InputFieldProps) => {
  const [error, setError] = useState('');

  // Validate the input value based on props
  const validateInput = () => {
    if (required && !value) {
      setError('This field is required.');
      return false;
    }
    if (minLength && value.length < minLength) {
      setError(`Must be at least ${minLength} characters.`);
      return false;
    }
    if (maxLength && value.length > maxLength) {
      setError(`Must be no more than ${maxLength} characters.`);
      return false;
    }
    if (pattern && !new RegExp(pattern).test(value)) {
      setError(errorMessage);
      return false;
    }
    setError(''); // Clear errors if all validations pass
    return true;
  };

  // Handle blur event to trigger validation
  const handleBlur = () => {
    validateInput();
  };

  // For `select` type
  if (type === 'select') {
    return (
      <div className={`flex flex-col space-y-1 ${className}`}>
        <label
          htmlFor={id}
          className="lg:text-[32px] md:text-[24px] text-[16px] leading-[36px] lg:leading-[48px] font-bold font-Amiri text-black"
        >
          {label}
        </label>
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          className="px-4 py-3 bg-transparent lg:text-2xl md:text-base text-xs text-black border border-black rounded-xl"
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }

  // Default input rendering for other types
  return (
    <div className={`flex flex-col space-y-1 ${className}`}>
      <label
        htmlFor={id}
        className="lg:text-[32px] md:text-[24px] text-[16px] leading-[36px] lg:leading-[48px] font-bold font-Amiri text-black"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className="px-4 py-3 bg-transparent lg:text-2xl md:text-base text-xs text-black border border-black rounded-xl"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default InputField;
