'use client';

import { clsx } from 'clsx';
import styles from './BellIcon.module.scss';
import OutlineBellIcon from '@/src/shared/assets/icons/outline-bell.svg';

type BellIconProps = {
  notificationCount?: number;
  className?: string;
  onClearNotifications?: () => void;
};

export const BellIcon = ({
                           notificationCount = 0,
                           className = '',
                           onClearNotifications
                         }: BellIconProps) => {
  const handleClick = () => {
    if (notificationCount > 0 && onClearNotifications) {
      onClearNotifications();
    }
    console.log('Open notifications panel');
  };

  return (
    <button
      className={clsx(styles.bellButton, className)}
      onClick={handleClick}
    >
      <OutlineBellIcon className={styles.bellIcon} />

      {notificationCount > 0 && (
        <span className={styles.notificationBadge}>
          {notificationCount > 9 ? '9+' : notificationCount}
        </span>
      )}
    </button>
  );
};