import styles from './Button.module.scss';
import { CSSProperties, ReactNode } from 'react';
import clsx from 'clsx';

type SizeProps = {
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  width?: number | string;
  height?: number | string;
  padding?: string | number;
};

type Props = {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'buttonPrimary' | 'buttonSecondary' | 'buttonOutline' | 'buttonText';
  isDisabled?: boolean;
  size?: SizeProps;
  type?: 'button' | 'submit' | 'reset';
};

export const Button = ({
  children,
  onClick,
  variant = 'buttonPrimary',
  isDisabled = false,
  size = {},
  type = 'button'
}: Props) => {
  // Функция для преобразования размеров
  const getSizeValue = (value: number | string | undefined): string | undefined => {
    if (value === undefined) return undefined;
    return typeof value === 'number' ? `${value}px` : value;
  };

  const buttonStyles: CSSProperties = {
    ...styles,
    minWidth: getSizeValue(size.minWidth),
    minHeight: getSizeValue(size.minHeight),
    maxWidth: getSizeValue(size.maxWidth),
    maxHeight: getSizeValue(size.maxHeight),
    width: getSizeValue(size.width),
    height: getSizeValue(size.height),
    padding: getSizeValue(size.padding)
  };

  return (
    <button
      className={clsx(styles.button, styles[variant])}
      onClick={onClick}
      disabled={isDisabled}
      type={type}
      style={buttonStyles}
    >
      {children}
    </button>
  );
};
