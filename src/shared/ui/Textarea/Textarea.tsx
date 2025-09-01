import React, { useId } from 'react';
import clsx from 'clsx';
import styles from './Textarea.module.scss';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;
type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

type Props = {
  ref?: React.Ref<HTMLTextAreaElement>;
  label?: string;
  errorMessage?: string;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  containerProps?: Omit<ContainerProps, 'className' | 'style'>;
} & TextareaProps;

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
  containerClassName,
  containerStyle,
  containerProps,
  ref,
  ...props
}: Props) => {
  const generatedId = useId();
  const textareaId = props.id || generatedId;

  const textareaClasses = clsx(
    styles.textarea,
    styles[`resize${resize.charAt(0).toUpperCase() + resize.slice(1)}`],
    errorMessage && styles.error,
    disabled && styles.disabled,
    className
  );

  return (
    <div className={clsx(styles.container, containerClassName)} style={containerStyle} {...containerProps}>
      {label && (
        <label htmlFor={textareaId} className={clsx(styles.label, disabled && styles.labelDisabled)}>
          {label}
        </label>
      )}

      <textarea
        ref={ref}
        id={textareaId}
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
