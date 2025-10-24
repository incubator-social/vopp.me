import { DigitDisplay } from '@/src/shared/ui/ DigitDisplay';
import styles from './HomeRegisteredUsers.module.scss';

type Props = {
  usersCount: number;
};

export const HomeRegisteredUsers = ({ usersCount }: Props) => {
  return (
    <div className={styles.container}>
      <h1>Registered users:</h1>
      <DigitDisplay usersCount={usersCount} />
    </div>
  );
};
