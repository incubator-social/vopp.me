import React from 'react';
import clsx from 'clsx';
import styles from './Input.module.scss';

type InputProps = {
  type: 'email' | 'password' | 'search';
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  errorMessage?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, label, placeholder, disabled = false, errorMessage, className, ...props }, ref) => {
    const getAutoLabel = () => {
      if (label) return label;

      switch (type) {
        case 'email':
          return 'Email';
        case 'password':
          return 'Password';
        case 'search':
          return null;
      }
    };

    const getAutoPlaceholder = () => {
      if (placeholder) return placeholder;

      switch (type) {
        case 'email':
          return 'example@email.com';
        case 'password':
          return 'Enter your password';
        case 'search':
          return 'Input search';
      }
    };

    const autoLabel = getAutoLabel();

    const currentVariant = errorMessage ? 'error' : 'default';

    const inputClasses = clsx(styles.input, styles[currentVariant], disabled && styles.disabled, className);

    return (
      <div className={styles.container}>
        {autoLabel && <label className={clsx(styles.label, disabled && styles.labelDisabled)}>{autoLabel}</label>}

        <input
          ref={ref}
          type={type}
          placeholder={getAutoPlaceholder()}
          disabled={disabled}
          className={inputClasses}
          {...props}
        />

        {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
