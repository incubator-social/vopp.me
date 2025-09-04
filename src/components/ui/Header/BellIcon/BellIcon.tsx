'use client';

import { clsx } from 'clsx';
import styles from './BellIcon.module.scss';
import OutlineBellIcon from '@/src/shared/assets/icons/outline-bell-without-count.svg';

type BellIconProps = {
  notificationCount?: number;
  className?: string;
};

export const BellIcon = ({ notificationCount = 0, className = '' }: BellIconProps) => {
  //  ДЛЯ БУДУЩЕЙ REDUX-ИНТЕГРАЦИИ БУДЕТ ПРИБЛИЗИТЕЛЬНО ЭТО
  // 1. Будем брать данные из Redux:
  // const notificationCount = useSelector(selectNotificationCount);
  // const isPanelOpen = useSelector(selectNotificationsPanelOpen);
  // const dispatch = useDispatch();
  //
  // 2. Будем использовать actions:
  // const handleClearNotifications = () => dispatch(clearNotificationsAction());
  // const handleOpenPanel = () => dispatch(openNotificationsPanelAction());
  // const handleClosePanel = () => dispatch(closeNotificationsPanelAction());
  //
  // 3. Полная логика клика:
  // const handleClick = () => {
  //   if (notificationCount > 0) {
  //     handleClearNotifications(); // очищаем бейдж
  //   }
  //   handleOpenPanel(); // открываем панель уведомлений
  // };

  //Заглушка
  const handleClick = () => {
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
