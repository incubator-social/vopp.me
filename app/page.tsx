import styles from './page.module.css';
import { Checkbox } from '@/src/shared/ui/Checkbox/Checkbox';

export default function Home() {
  return (
    <div className={styles.page}>
      <div>VOPP.ME</div>
      <main className={styles.main}>
        <Checkbox />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
