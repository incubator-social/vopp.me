import { Fragment } from 'react';
import styles from './DigitDisplay.module.scss';

type Props = {
  usersCount: number;
};
export const DigitDisplay = ({ usersCount }: Props) => {
  const formatted = usersCount.toString().padStart(6, '0').split('');
  return (
    <div className={styles.counter}>
      {formatted.map((digit, index) => (
        <Fragment key={index}>
          <div className={styles.digit}>{digit}</div>
          {index < formatted.length - 1 && <div className={styles.separator} />}
        </Fragment>
      ))}
    </div>
  );
};
