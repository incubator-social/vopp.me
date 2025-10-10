'use client';

import Link from 'next/link';
import { LanguageSelect } from '@/src/widgets/Header/LanguageSelect/LanguageSelect';
import { BellIcon } from '@/src/widgets/Header/BellIcon/BellIcon';
import { AuthButtons } from '@/src/widgets/Header/AuthButtons/AuthButtons';
import styles from './Header.module.scss';
import { useAppSelector } from '@/app/providers/store/hooks';
import { selectIsAuth } from '@/app/appSlice';

export const Header = () => {
  const isAuth = useAppSelector(selectIsAuth);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          VOPP.ME
        </Link>

        <div className={styles.rightSection}>
          {isAuth ? (
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
