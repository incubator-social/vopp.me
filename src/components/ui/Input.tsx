import React from 'react';

type InputProps = {
  type?: 'email' | 'password' | 'search';
  placeholder?: string;
  disabled?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, placeholder, disabled = false, ...props }, ref) => {
    return <input ref={ref} type={type} placeholder={placeholder} disabled={disabled} {...props} />;
  }
);

Input.displayName = 'Input';
