'use client';

import Link from 'next/link';
import styles from './Header.module.scss';
import { LanguageSelect } from '@/src/widgets/Header/LanguageSelect/LanguageSelect';
import { BellIcon } from '@/src/widgets/Header/BellIcon/BellIcon';
import { AuthButtons } from '@/src/widgets/Header/AuthButtons/AuthButtons';
import { ROUTES } from '@/src/shared/config/routes';
import { useAuth } from '@/src/features/auth/lib';

export const Header = () => {
  const { user, isLoading } = useAuth();
  const notificationCount = 3;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href={ROUTES.HOME} className={styles.logo}>
          VOPP.ME
        </Link>

        <div className={styles.rightSection}>
          {!isLoading && user && <BellIcon notificationCount={notificationCount} />}
          <LanguageSelect />
          {!isLoading && !user && <AuthButtons />}
        </div>
      </div>
    </header>
  );
};
