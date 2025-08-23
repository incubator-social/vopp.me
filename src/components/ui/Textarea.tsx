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
  ({ label, placeholder, disabled = false, errorMessage, resize = 'vertical', className, ...props }, ref) => {
    const getAutoLabel = (): string | undefined => {
      if (label) return label;
      return 'Text';
    };

    const getAutoPlaceholder = (): string | undefined => {
      if (placeholder) return placeholder;
      return 'Enter your text...';
    };

    const autoLabel = getAutoLabel();
    const autoPlaceholder = getAutoPlaceholder();
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
        {autoLabel && <label className={clsx(styles.label, disabled && styles.labelDisabled)}>{autoLabel}</label>}

        <textarea ref={ref} placeholder={autoPlaceholder} disabled={disabled} className={textareaClasses} {...props} />

        {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
