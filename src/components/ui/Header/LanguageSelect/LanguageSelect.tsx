import { clsx } from 'clsx';
import styles from './LanguageSelect.module.scss';

type LanguageSelectProps = {
  className?: string;
};

export const LanguageSelect = ({ className }: LanguageSelectProps) => {
  return (
    <div className={clsx(styles.languageSelect, className)}>
      <span className={styles.languageText}>English</span>
      <span className={styles.arrow}>▼</span>
    </div>
  )
}