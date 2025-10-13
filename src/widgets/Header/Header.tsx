'use client';

import Link from 'next/link';
import { LanguageSelect } from '@/src/widgets/Header/LanguageSelect/LanguageSelect';
import { BellIcon } from '@/src/widgets/Header/BellIcon/BellIcon';
import { AuthButtons } from '@/src/widgets/Header/AuthButtons/AuthButtons';
import styles from './Header.module.scss';
import { useAuth } from '@/src/features/auth/lib/useAuth';
import { useEffect, useState } from 'react';

export const Header = () => {
  const [boot, setBoot] = useState(true);
  useEffect(() => {
    setBoot(false);
  }, []);
  const { isAuth, isChecking } = useAuth();
  const ready = !isChecking && !boot;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          VOPP.ME
        </Link>

        <div className={styles.rightSection}>
          {isAuth && ready && <BellIcon notificationCount={3} />}
          <LanguageSelect />
          {!isAuth && ready && <AuthButtons />}
        </div>
      </div>
    </header>
  );
};
