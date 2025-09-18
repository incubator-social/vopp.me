import styles from './Button.module.scss';
import { cloneElement, CSSProperties, isValidElement, ReactElement, ReactNode } from 'react';
import clsx from 'clsx';

interface InjectedButtonProps {
  className?: string;
  style?: CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
}

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
  href?: string;
  target?: '_self' | '_blank';
};

export const Button = ({
  children,
  onClick,
  variant = 'buttonPrimary',
  disabled = false,
  size = {},
  type = 'button',
  href,
  target = '_self'
}: Props) => {
  const buttonStyles: CSSProperties = {
    minWidth: size?.minWidth,
    minHeight: size?.minHeight,
    maxWidth: size?.maxWidth,
    maxHeight: size?.maxHeight,
    width: size?.width,
    height: size?.height,
    padding: size?.padding
  };

  // Если передан href, рендерим как ссылку
  if (href) {
    return (
      <a
        className={clsx(styles.button, styles[variant])}
        href={href}
        style={buttonStyles}
        target={target}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  // Стандартный вариант - кнопка
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
