import { clsx } from 'clsx';
import styles from './LanguageSelect.module.scss';
import FlagRussia from '@/src/shared/assets/icons/flag-russia.svg';
import FlagUK from '@/src/shared/assets/icons/flag-united-kingdom.svg';
import { CustomSelect } from '@/src/shared/ui/select/Select';

type LanguageSelectProps = {
  className?: string;
};

const LANGUAGE_OPTIONS = [
  { value: 'en', label: 'English', icon: FlagUK },
  { value: 'ru', label: 'Русский', icon: FlagRussia }
];

export const SELECT_SIZES = {
  width: 160,
  height: 36,
  fontSize: 16,
  arrowSize: 20
};

export const LanguageSelect = ({ className }: LanguageSelectProps) => {
  // ДЛЯ БУДУЩЕЙ ИНТЕГРАЦИИ:
  // Будем использовать библиотеку для i18n (например, i18next или next-i18next)
  //
  // Пример с next-i18next:
  // const { i18n } = useTranslation();
  // const currentLanguage = i18n.language;

  const handleLanguageChange = (value: string) => {
    console.log('Selected language:', value);
    // В будущем: i18n.changeLanguage(value);
  };

  return (
    <div className={clsx(styles.languageSelect, className)}>
      <CustomSelect
        options={LANGUAGE_OPTIONS}
        defaultValue="en"
        placeholder="Select language"
        onValueChange={handleLanguageChange}
        size={SELECT_SIZES}
      />
    </div>
  );
};
