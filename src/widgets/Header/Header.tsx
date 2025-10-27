'use client';

import Link from 'next/link';
import styles from './Header.module.scss';
import { LanguageSelect } from '@/src/widgets/Header/LanguageSelect/LanguageSelect';
import { BellIcon } from '@/src/widgets/Header/BellIcon/BellIcon';
import { AuthButtons } from '@/src/widgets/Header/AuthButtons/AuthButtons';
import { usePathname } from 'next/navigation';

export type HeaderProps = {
  isLoggedIn?: boolean;
  notificationCount?: number;
};

//  ДЛЯ БУДУЩЕЙ REDUX-ИНТЕГРАЦИИ:
// Уберем пропсы и будем брать данные напрямую:
// const isLoggedIn = useSelector(selectIsLoggedIn);
// const notificationCount = useSelector(selectNotificationCount);

export const Header = ({ isLoggedIn = false, notificationCount = 0 }: HeaderProps) => {
  const pathname = usePathname();

  const isAuthPage = pathname ? pathname.startsWith('/auth/sign-in') || pathname.startsWith('/auth/sign-up') : false;

  const shouldShowAuthButtons = !isLoggedIn && !isAuthPage;
  const shouldShowBell = isLoggedIn && notificationCount > 0;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          VOPP.ME
        </Link>
        <div className={styles.rightSection}>
          {shouldShowBell && <BellIcon notificationCount={notificationCount} />}
          <LanguageSelect />
          {shouldShowAuthButtons && <AuthButtons />}
        </div>
      </div>
    </header>
  );
};
