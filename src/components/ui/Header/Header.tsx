'use client';

import Link from 'next/link';
import styles from './Header.module.scss';
import { LanguageSelect } from '@/src/components/ui/Header/LanguageSelect/LanguageSelect';
import { BellIcon } from './BellIcon/BellIcon';
import { AuthButtons } from '@/src/components/ui/Header/AuthButtons/AuthButtons';
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

  const isAuthPage = pathname.startsWith('/auth/sign-in') || pathname.startsWith('/auth/sign-up');

  const shouldShowAuthButtons = !isLoggedIn && !isAuthPage;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          VOPP.ME
        </Link>
        <div className={styles.rightSection}>
          {isLoggedIn ? (
            notificationCount > 0 ? (
              <>
                <BellIcon notificationCount={notificationCount} />
                <LanguageSelect />
              </>
            ) : (
              <LanguageSelect />
            )
          ) : (
            <>
              <LanguageSelect />
              {shouldShowAuthButtons && <AuthButtons />}
            </>
          )}
        </div>
      </div>
    </header>
  );
};
