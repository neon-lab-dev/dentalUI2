type ValidationType = string | number | Date | undefined | null;

interface ValidationRule {
  validate: (value: ValidationType) => boolean;
  message: string;
}

interface ValidationRules {
  [key: string]: ValidationRule[];
}

interface ValidationErrors {
  [key: string]: string;
}

type FormData = {
  [key: string]: ValidationType;
};

export const validators = {
  required: (fieldName: string): ValidationRule => ({
    validate: (value: ValidationType): boolean => 
      value !== undefined && value !== null && value !== '',
    message: `${fieldName} is required`,
  }),
  email: (): ValidationRule => ({
    validate: (value: ValidationType): boolean => 
      typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: 'Invalid email format',
  }),
  phone: (): ValidationRule => ({
    validate: (value: ValidationType): boolean => 
      typeof value === 'string' && /^\d{10}$/.test(value) || 
      typeof value === 'number' && /^\d{10}$/.test(value.toString()),
    message: 'Please enter a valid 10-digit phone number',
  }),
  date: (message: string): ValidationRule => ({
    validate: (value: ValidationType): boolean => {
      if (!value) return false;
      const date = new Date(value);
      return !isNaN(date.getTime());
    },
    message,
  }),
  futureDate: (): ValidationRule => ({
    validate: (value: ValidationType): boolean => {
      if (!value) return false;
      const date = new Date(value);
      return date > new Date();
    },
    message: 'Date must be in the future',
  }),
  password: (): ValidationRule => ({
    validate: (value: ValidationType): boolean => 
      typeof value === 'string' && value.length >= 8,
    message: 'Password must be at least 8 characters long',
  }),
  passwordMatch: (compareValue: string): ValidationRule => ({
    validate: (value: ValidationType): boolean => 
      typeof value === 'string' && value === compareValue,
    message: 'Passwords do not match',
  }),
};

export const validateForm = (
  data: FormData,
  rules: ValidationRules
): ValidationErrors => {
  const errors: ValidationErrors = {};

  Object.entries(rules).forEach(([field, fieldRules]) => {
    const value = data[field];

    for (const rule of fieldRules) {
      if (!rule.validate(value)) {
        errors[field] = rule.message;
        break;
      }
    }
  });

  return errors;
};
