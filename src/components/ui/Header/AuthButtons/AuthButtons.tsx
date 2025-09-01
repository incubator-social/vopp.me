import { clsx } from 'clsx';
import { Button } from '@/src/shared/ui/button/Button';
import styles from './AuthButtons.module.scss';

type AuthButtonsProps = {
  className?: string;
  onLogin: () => void;
  onSignUp: () => void;
};

export const AuthButtons = ({ className, onLogin, onSignUp }: AuthButtonsProps) => {
  return (
    <div className={clsx(styles.authButtons, className)}>
      <Button
        title="Log in"
        variant="buttonSecondary"
        onClick={onLogin}
      />

      <Button
        title="Sign up"
        variant="buttonPrimary"
        onClick={onSignUp}
      />
    </div>
  );
};