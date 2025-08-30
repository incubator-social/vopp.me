import styles from './Button.module.scss';

type Props = {
  title: string;
  onClick?: () => void;
  variant: string;
  size?: string;
  isDisabled?: boolean;
};

export const Button = ({
  title,
  onClick,
  variant = 'buttonPrimary',
  size = 'ButtonBig',
  isDisabled = false
}: Props) => {
  return (
    <button className={`${styles.button} ${styles[variant]} ${styles[size]}`} onClick={onClick} disabled={isDisabled}>
      {title}
    </button>
  );
};
