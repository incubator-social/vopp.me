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
 * @param {Object} props - Свойства компонента.
 * @param {string} [props.label] - Текст метки над полем ввода.
 * @param {string} [props.placeholder='Enter text'] - Текст-заполнитель.
 * @param {boolean} [props.disabled=false] - Отключено ли поле.
 * @param {string} [props.errorMessage] - Сообщение об ошибке (если есть, поле стилизуется как ошибочное).
 * @param {'none' | 'both' | 'horizontal' | 'vertical'} [props.resize='vertical'] - Направление изменения размера.
 * @param {React.Ref<HTMLTextAreaElement>} ref - Ref для доступа к нативному textarea элементу.
 * @returns {React.ReactElement} Кастомный текстовый компонент.
 *
 * @example
 * // Базовое использование
 * <Textarea label="Описание" placeholder="Введите текст" />
 *
 * @example
 * // С отключением resize и сообщением об ошибке
 * <Textarea
 *   label="Комментарий"
 *   resize="none"
 *   errorMessage="Поле обязательно для заполнения!"
 * />
 */

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
