import React from 'react';
import clsx from 'clsx';
import styles from './Textarea.module.scss';

type TextareaProps = {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  errorMessage?: string;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { label, placeholder = 'Enter text', disabled = false, errorMessage, resize = 'vertical', className, ...props },
    ref
  ) => {
    const currentVariant = errorMessage ? 'error' : 'default';

    const textareaClasses = clsx(
      styles.textarea,
      styles[`resize${resize.charAt(0).toUpperCase() + resize.slice(1)}`],
      styles[currentVariant],
      disabled && styles.disabled,
      className
    );

    return (
      <div className={styles.container}>
        {label && <label className={clsx(styles.label, disabled && styles.labelDisabled)}>{label}</label>}

        <textarea ref={ref} placeholder={placeholder} disabled={disabled} className={textareaClasses} {...props} />

        {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
