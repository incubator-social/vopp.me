'use client';

import { clsx } from 'clsx';
import styles from './BellIcon.module.scss';
import OutlineBellIcon from '@/src/shared/assets/icons/outline-bell-without-count.svg';

type BellIconProps = {
  notificationCount?: number;
  className?: string;
};

export const BellIcon = ({ notificationCount = 0, className = '' }: BellIconProps) => {
  // ДЛЯ БУДУЩЕЙ REDUX-ИНТЕГРАЦИИ:
  // 1. Будем брать данные из Redux:
  // const isLoggedIn = useSelector(selectIsLoggedIn);
  // const notificationCount = useSelector(selectNotificationCount);
  // const dispatch = useDispatch();

  // Временная заглушка - в будущем будет из Redux
  const isLoggedIn = true;

  const handleClick = () => {
    if (!isLoggedIn) return; //Не делать ничего если не авторизован
    console.log('Open notifications panel');
  };

  const hasNotifications = isLoggedIn && notificationCount > 0;
  const manyNotifications = notificationCount > 9;

  return (
    <button
      className={clsx(styles.bellButton, className)}
      onClick={handleClick}
      aria-label={hasNotifications ? `${notificationCount} уведомлений` : 'Нет уведомлений'}
      disabled={!isLoggedIn}
    >
      <OutlineBellIcon className={styles.bellIcon} />

      {hasNotifications && (
        <span className={clsx(styles.notificationBadge, { [styles.manyNotifications]: manyNotifications })}>
          {manyNotifications ? '9+' : notificationCount}
        </span>
      )}
    </button>
  );
};
