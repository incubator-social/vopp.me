import styles from './Button.module.scss';
import { CSSProperties, ReactNode } from 'react';
import clsx from 'clsx';
import { Slot } from '@radix-ui/react-slot';

type SizeProps = {
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  width?: number | string;
  height?: number | string;
  padding?: string | number;
  margin?: string | number;
};

type Props = {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'buttonPrimary' | 'buttonSecondary' | 'buttonOutline' | 'buttonText';
  disabled?: boolean;
  size?: SizeProps;
  type?: 'button' | 'submit' | 'reset';
  asChild?: boolean;
  className?: string;
};

export const Button = ({
  children,
  onClick,
  variant = 'buttonPrimary',
  disabled = false,
  size,
  type = 'button',
  asChild,
  onClick,
  className,
  ...rest
}: Props) => {
  const Component = asChild ? Slot : 'button';

  const buttonStyles: CSSProperties = {
    minWidth: size?.minWidth,
    minHeight: size?.minHeight,
    maxWidth: size?.maxWidth,
    maxHeight: size?.maxHeight,
    width: size?.width,
    height: size?.height,
    padding: size?.padding,
    margin: size?.margin
  };

  const props = {
    className: clsx(styles.button, styles[variant], className),
    style: buttonStyles,
    onClick: disabled ? undefined : onClick,
    ...rest
  };

  if (asChild) {
    return <Component {...props}>{children}</Component>;
  }

  return (
    <Component {...props} type={type} disabled={disabled}>
      {children}
    </Component>
  );
};
