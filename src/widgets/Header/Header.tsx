'use client';

import Link from 'next/link';
import { useSelector } from 'react-redux';
import { LanguageSelect } from '@/src/widgets/Header/LanguageSelect/LanguageSelect';
import { BellIcon } from '@/src/widgets/Header/BellIcon/BellIcon';
import { AuthButtons } from '@/src/widgets/Header/AuthButtons/AuthButtons';
import styles from './Header.module.scss';
import { selectIsAuthenticated } from '@/app/appSlice';

export const Header = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          VOPP.ME
        </Link>

        <div className={styles.rightSection}>
          {isAuthenticated ? (
            <>
              <BellIcon notificationCount={3} />
              <LanguageSelect />
            </>
          ) : (
            <>
              <LanguageSelect />
              <AuthButtons />
            </>
          )}
        </div>
      </div>
    </header>
  );
};
