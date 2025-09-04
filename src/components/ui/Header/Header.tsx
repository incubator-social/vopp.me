import Link from 'next/link';
import styles from './Header.module.scss';
import { LanguageSelect } from '@/src/components/ui/Header/LanguageSelect/LanguageSelect';
import { BellIcon } from './BellIcon/BellIcon';
import { AuthButtons } from '@/src/components/ui/Header/AuthButtons/AuthButtons';

export type HeaderProps = {
  isLoggedIn?: boolean;
  notificationCount?: number;
};

//  ДЛЯ БУДУЩЕЙ REDUX-ИНТЕГРАЦИИ:
// Уберем пропсы и будем брать данные напрямую:
// const isLoggedIn = useSelector(selectIsLoggedIn);
// const notificationCount = useSelector(selectNotificationCount);

export const Header = ({ isLoggedIn = false, notificationCount = 0 }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          {'VOPP.ME'}
        </Link>
        <div className={styles.rightSection}>
          {isLoggedIn ? (
            <>
              <LanguageSelect className={styles.languageSelect} />
              <BellIcon notificationCount={notificationCount} className={styles.bellIcon} />
            </>
          ) : (
            <>
              <LanguageSelect className={styles.languageSelect} />
              <AuthButtons />
            </>
          )}
        </div>
      </div>
    </header>
  );
};
