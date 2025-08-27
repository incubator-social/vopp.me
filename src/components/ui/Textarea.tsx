import React from 'react';
import clsx from 'clsx';
import styles from './Textarea.module.scss';

type TextareaProps = {
  label?: string;
  errorMessage?: string;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  placeholder?: string;
  disabled?: boolean;
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'placeholder' | 'disabled'>;

/**
 * Кастомное текстовое поле с расширенными возможностями стилизации.
 *
 * @example
 * // Базовое использование
 * <Textarea label="Описание" placeholder="Введите текст" />
 */

export const Textarea = ({
  label,
  placeholder = 'Enter text',
  disabled = false,
  errorMessage,
  resize = 'vertical',
  className,
  ref,
  ...props
}: TextareaProps & { ref?: React.Ref<HTMLTextAreaElement> }) => {
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
      {label && (
        <label htmlFor={props.id} className={clsx(styles.label, disabled && styles.labelDisabled)}>
          {label}
        </label>
      )}

      <textarea
        ref={ref}
        id={props.id}
        placeholder={placeholder}
        disabled={disabled}
        className={textareaClasses}
        {...props}
      />

      {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
    </div>
  );
};

Textarea.displayName = 'Textarea';
