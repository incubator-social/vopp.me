import Link from 'next/link';
import styles from './Header.module.scss';
import { LinkButton } from '@/src/components/ui/Header/LinkButton';

type HeaderProps = {
  isLoggedIn?: boolean;
  notificationCount?: number;
};

export const Header = ({ isLoggedIn = true, notificationCount = 0 }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {'Bycnfuh'}
        <Link href="/" className={styles.logo}>
          Inctagram
        </Link>

        {/* Правая часть хедера */}
        <div className={styles.rightSection}>
          {/* Заглушка для селекта языка */}
          <div className={styles.languageSelect}>
            {/* Здесь будет готовый Select компонент */}
            <span>English</span>
          </div>

          {isLoggedIn ? (
            // Заглушка для уведомлений
            <button className={styles.notificationButton}>
              {/* Иконка колокольчика */}
              <span className={styles.bellIcon}>🔔</span>

              {/* Бейдж */}
              {notificationCount > 0 && (
                <span className={styles.notificationBadge}>{notificationCount > 9 ? '9+' : notificationCount}</span>
              )}
            </button>
          ) : (
            // Заглушка для кнопок авторизации
            <div className={styles.authButtons}>
              <LinkButton href="/login" title="Log in" variant="buttonSecondary" />

              <LinkButton href="/signup" title="Sign up" variant="buttonPrimary" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
