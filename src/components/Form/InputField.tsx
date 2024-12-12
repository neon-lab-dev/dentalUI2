import React from 'react';

interface InputFieldProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'select' | 'date'; 
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>; 
  className?: string;
  options?: string[]; 
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
}: InputFieldProps) => {
  
  if (type === 'select') {
    return (
      <div className={`flex flex-col space-y-1 ${className}`}>
        {/* Label */}
        <label htmlFor={id} className="lg:text-[32px] md:text-[24px] text-[16px]  leading-[36px] lg:leading-[48px] font-bold font-Amiri text-black">
          {label}
        </label>

        {/* Select */}
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className="px-4 py-3 bg-transparent lg:text-2xl md:text-base text-xs text-black border border-black rounded-xl"
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }

  // Default input rendering for other types
  return (
    <div className={`flex flex-col space-y-1 ${className}`}>
      {/* Label */}
      <label htmlFor={id} className="lg:text-[32px] md:text-[24px] text-[16px]  leading-[36px] lg:leading-[48px] font-bold font-Amiri border-black">
        {label}
      </label>

      {/* Input */}
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="px-4 py-3 bg-transparent g:text-2xl md:text-base text-xs text-black border border-black rounded-xl"
      />
    </div>
  );
};

export default InputField;
