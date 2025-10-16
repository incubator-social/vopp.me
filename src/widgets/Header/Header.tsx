'use client';

import Link from 'next/link';
import { LanguageSelect } from '@/src/widgets/Header/LanguageSelect/LanguageSelect';
import { BellIcon } from '@/src/widgets/Header/BellIcon/BellIcon';
import { AuthButtons } from '@/src/widgets/Header/AuthButtons/AuthButtons';
import styles from './Header.module.scss';
import { useAuth } from '@/src/features/auth/lib/useAuth';

export const Header = () => {
  const { isAuth, isReady } = useAuth();
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          VOPP.ME
        </Link>
        <div className={styles.rightSection}>
          {isReady && isAuth && <BellIcon notificationCount={3} />}
          <LanguageSelect />
          {isReady && !isAuth && <AuthButtons />}
        </div>
      </div>
    </header>
  );
};
