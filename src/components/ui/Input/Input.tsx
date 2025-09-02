'use client';
import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './Input.module.scss';

import SearchIcon from './../../../shared/assets/icons/search.svg';
import EyeOpenIcon from './../../../shared/assets/icons/eye-outline.svg';
import EyeClosedIcon from './../../../shared/assets/icons/eye-off-outline.svg';

type InputProps = {
  label?: string;
  errorMessage?: string;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  ref?: React.Ref<HTMLInputElement>;
} & React.InputHTMLAttributes<HTMLInputElement>;

/**
 * Кастомное поле ввода с расширенными возможностями стилизации.
 * Поддерживает различные типы: text, password, search, email и другие.
 *
 * @example
 * // Базовое использование
 * <Input label="Email" placeholder="Enter your email" />
 *
 * @example
 * // Стилизация контейнера
 * <Input
 *   label="Password"
 *   containerStyle={{ padding: '20px', border: '1px solid #ccc' }}
 *   style={{ fontSize: '16px' }} // стили для самого input
 * />
 *
 * @example
 * // Контролируемый режим
 * const [value, setValue] = useState('');
 * <Input value={value} onChange={(e) => setValue(e.target.value)} />
 */

export const Input = ({
  type = 'text',
  label,
  placeholder,
  disabled = false,
  errorMessage,
  className,
  containerClassName,
  containerStyle,
  ref,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    if (!disabled) {
      setShowPassword(!showPassword);
    }
  };

  const getInputType = () => {
    if (type === 'password') {
      return showPassword ? 'text' : 'password';
    }
    return type;
  };

  const inputClasses = clsx(
    styles.input,
    errorMessage && styles.error,
    disabled && styles.disabled,
    type === 'search' && styles.withLeftIcon,
    type === 'password' && styles.withRightIcon,
    className
  );

  return (
    <div className={clsx(styles.container, containerClassName)} style={containerStyle}>
      {label && <label className={clsx(styles.label, disabled && styles.labelDisabled)}>{label}</label>}
      <div className={styles.inputWrapper}>
        <input
          ref={ref}
          type={getInputType()}
          placeholder={placeholder}
          disabled={disabled}
          className={inputClasses}
          {...props}
        />
        {type === 'search' && (
          <div className={clsx(styles.icon, styles.leftIcon)}>
            <SearchIcon />
          </div>
        )}
        {type === 'password' && (
          <button
            type="button"
            className={clsx(styles.iconButton, styles.rightIcon)}
            onClick={togglePasswordVisibility}
            disabled={disabled}
          >
            {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
          </button>
        )}
      </div>

      {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
    </div>
  );
};

Input.displayName = 'Input';
