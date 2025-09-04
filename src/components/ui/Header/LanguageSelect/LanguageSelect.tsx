import { clsx } from 'clsx';
import styles from './LanguageSelect.module.scss';

type LanguageSelectProps = {
  className?: string;
};

export const LanguageSelect = ({ className }: LanguageSelectProps) => {
  // ДЛЯ БУДУЩЕЙ ИНТЕГРАЦИИ:
  // Будем использовать библиотеку для i18n (например, i18next или next-i18next)
  //
  // Пример с next-i18next:
  // const { i18n } = useTranslation();
  // const currentLanguage = i18n.language;
  //
  // const handleLanguageChange = (language: string) => {
  //   i18n.changeLanguage(language);
  //   Также можно диспатчить в Redux, если нужно:
  //   dispatch(setLanguageAction(language));
  // };

  return (
    <div className={clsx(styles.languageSelect, className)}>
      <span className={styles.languageText}>English</span>
      <span className={styles.arrow}>▼</span>
    </div>
  );
};
