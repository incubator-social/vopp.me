'use client';
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
  disabled?: boolean;
  size?: SizeProps;
  type?: 'button' | 'submit' | 'reset';
};

export const Button = ({
  children,
  onClick,
  variant = 'buttonPrimary',
  disabled = false,
  size = {},
  type = 'button'
}: Props) => {
  const buttonStyles: CSSProperties = {
    minWidth: size.minWidth,
    minHeight: size.minHeight,
    maxWidth: size.maxWidth,
    maxHeight: size.maxHeight,
    width: size.width,
    height: size.height,
    padding: size.padding
  };

  return (
    <button
      className={clsx(styles.button, styles[variant])}
      onClick={onClick}
      disabled={disabled}
      type={type}
      style={buttonStyles}
    >
      {children}
    </button>
  );
};
