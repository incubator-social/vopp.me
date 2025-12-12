'use client';

import { HeaderSkeleton } from './HeaderSkeleton';
import Link from 'next/link';

import { useAppDispatch } from '@/app/lib/hooks';
import { setActiveButton, setPreviousActiveButton } from '@/src/widgets/sidebar-wrapper/model';

import { LanguageSelect } from '@/src/widgets/Header/LanguageSelect/LanguageSelect';
import { BellIcon } from '@/src/widgets/Header/BellIcon/BellIcon';
import { AuthButtons } from '@/src/widgets/Header/AuthButtons/AuthButtons';
import { useAuth } from '@/src/features/auth/lib/useAuth';

import styles from './Header.module.scss';

export const Header = () => {
  const dispatch = useAppDispatch();

  const { isAuth, uiReady } = useAuth();

  const onClickVoppmeLink = () => {
    dispatch(setActiveButton(undefined));
    dispatch(setPreviousActiveButton(undefined));
  };

  if (!uiReady) return <HeaderSkeleton />;

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
