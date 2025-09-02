'use client';

import { clsx } from 'clsx';
import styles from './BellIcon.module.scss';
import OutlineBellIcon from '@/src/shared/assets/icons/outline-bell-without-count.svg';

type BellIconProps = {
  notificationCount?: number;
  className?: string;
  onClearNotifications?: () => void;
};

export const BellIcon = ({ notificationCount = 0, className = '', onClearNotifications }: BellIconProps) => {
  const handleClick = () => {
    if (notificationCount > 0 && onClearNotifications) {
      onClearNotifications();
    }
    console.log('Open notifications panel');
  };

  const hasNotifications = notificationCount > 0;
  const manyNotifications = notificationCount > 9;

  return (
    <button
      className={clsx(styles.bellButton, className)}
      onClick={handleClick}
      aria-label={hasNotifications ? `${notificationCount} уведомлений` : 'Нет уведомлений'}
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
