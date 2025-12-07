'use client';

import { useAppDispatch } from '@/app/providers/store/hooks';
import { setActiveButton, setPreviousActiveButton } from '@/src/features/sidebar-wrapper/store';
import Link from 'next/link';
import { LanguageSelect } from '@/src/widgets/Header/LanguageSelect/LanguageSelect';
import { BellIcon } from '@/src/widgets/Header/BellIcon/BellIcon';
import { AuthButtons } from '@/src/widgets/Header/AuthButtons/AuthButtons';
import styles from './Header.module.scss';
import { useAuth } from '@/src/features/auth/lib/useAuth';

export const Header = () => {
  const dispatch = useAppDispatch();

  const { isAuth, uiReady } = useAuth();

  const onClickVoppmeLink = () => {
    dispatch(setActiveButton(null));
    dispatch(setPreviousActiveButton(null));
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} onClick={onClickVoppmeLink}>
          VOPP.ME
        </Link>
        <div className={styles.rightSection}>
          {uiReady && isAuth && <BellIcon notificationCount={3} />}
          <LanguageSelect />
          {uiReady && !isAuth && <AuthButtons />}
        </div>
      </div>
    </header>
  );
};
