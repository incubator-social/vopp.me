import Link from 'next/link';
import styles from './Header.module.scss';
import { useState } from 'react';
import { LanguageSelect } from '@/src/components/ui/Header/LanguageSelect/LanguageSelect';
import { BellIcon } from './BellIcon/BellIcon';
import { AuthButtons } from '@/src/components/ui/Header/AuthButtons/AuthButtons';

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);

  const toggleLogin = () => setIsLoggedIn(!isLoggedIn);
  const addNotification = () => setNotificationCount(prev => prev + 1);
  const clearNotifications = () => setNotificationCount(0);

  const handleLogin = () => {
    console.log('Open login modal');
    setIsLoggedIn(true);
  };

  const handleSignUp = () => {
    console.log('Open signup modal');
    setIsLoggedIn(true);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          {'sdsfdfdfdf'}
        </Link>
        {/* Правая часть хедера */}
        <div className={styles.rightSection}>
          {/* Заглушка для селекта языка */}
          <LanguageSelect className={styles.languageSelect} />

          {isLoggedIn ? (
            // Заглушка для уведомлений
            <BellIcon
              notificationCount={notificationCount}
              className={styles.bellIcon}
              onClearNotifications={clearNotifications}
            />
          ) : (
            /* Кнопки авторизации для неавторизованных */
            <AuthButtons
              onLogin={handleLogin}
              onSignUp={handleSignUp}
            />
          )}
          <div className={styles.debugControls}>
            <button onClick={toggleLogin} className={styles.debugButton}>
              {isLoggedIn ? 'Logout' : 'Login'}
            </button>
            {isLoggedIn && (
              <button onClick={addNotification} className={styles.debugButton}>
                +1 Notif
              </button>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
