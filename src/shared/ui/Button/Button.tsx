import styles from './Button.module.scss';
import { ReactNode } from 'react';
import clsx from 'clsx';

type Props = {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'buttonPrimary' | 'buttonSecondary' | 'buttonOutline' | 'buttonText';
  isDisabled?: boolean;
  minWidth?: number;
  minHeight?: number;
  padding?: string;
  type?: 'button' | 'submit' | 'reset';
};

export const Button = ({
  children,
  onClick,
  variant = 'buttonPrimary',
  isDisabled = false,
  minWidth,
  minHeight,
  padding,
  type = 'button'
}: Props) => {
  return (
    <button
      className={clsx(styles.button, styles[variant])}
      onClick={onClick}
      disabled={isDisabled}
      type={type}
      style={{ minWidth: minWidth, minHeight: minHeight, padding: `${padding}` }}
    >
      {children}
    </button>
  );
};
