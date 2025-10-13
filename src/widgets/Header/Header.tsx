'use client';

import Link from 'next/link';
import { LanguageSelect } from '@/src/widgets/Header/LanguageSelect/LanguageSelect';
import { BellIcon } from '@/src/widgets/Header/BellIcon/BellIcon';
import { AuthButtons } from '@/src/widgets/Header/AuthButtons/AuthButtons';
import styles from './Header.module.scss';
import { useAuth } from '@/src/features/auth/lib/useAuth';
import { useMounted } from '@/src/shared/hooks/useMounted';

export const Header = () => {
  const mounted = useMounted();
  const { isAuth, isChecking } = useAuth();
  const ready = !isChecking && mounted;

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
